import type { Course, Dish, EventInfo } from '../entities/menu';
import type { DishRepository } from '../services/DishRepository';
import type { LocalIdentity } from '../services/localIdentity';
import { cleanDishInput, DishValidationError, dishesForCourse, LIMITS, menuSummary } from '../use-cases/menu';
import { alreadyComingHtml, coursesHtml, guestsHtml, metaHtml, photoUrl } from './html';
import { Sheet } from './sheet';

export interface AppDeps { repo: DishRepository; identity: LocalIdentity; event: EventInfo; courses: Course[]; host: boolean; preview?: boolean }

const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T;

export function startApp({ repo, identity, event, courses, host, preview = false }: AppDeps) {
  let dishes: Dish[] = [];
  let loaded = false;
  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  let flashId: string | null = null;
  const sheet = new Sheet((err) => (err instanceof DishValidationError ? err.message : 'Couldn’t save. Check your connection and try again.'));

  $('#title').textContent = event.title;
  $('#meta').innerHTML = metaHtml(event);

  const toast = (msg: string) => {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  };

  const render = () => {
    if (!loaded) return;
    $('#list').innerHTML = coursesHtml(courses, dishes, { clientId: identity.clientId, host });
    $('#summary').hidden = false;
    $('#sumText').textContent = menuSummary(dishes, courses);
    $('#sumNeed').innerHTML = dishes.length ? '' : '<span class="need-label">Nobody’s signed yet — be the first.</span>';
    $('#sumNeed').hidden = !!dishes.length;
    const g = guestsHtml(dishes);
    $('#guests').innerHTML = g;
    $('#guestsSide').innerHTML = g && `<span class="tape" aria-hidden="true"></span>${g}`;
    $('#guests').hidden = $('#guestsSide').hidden = !g;
    if (flashId) flash(flashId);
  };

  const flash = (id: string) => {
    const li = [...document.querySelectorAll<HTMLElement>('#list li[data-iid]')].find((el) => el.dataset.iid === id);
    if (!li) return;
    flashId = null;
    li.classList.add('item-flash');
    li.scrollIntoView?.({ block: 'nearest', behavior: matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    setTimeout(() => li.classList.remove('item-flash'), 1600);
  };

  const loadTimer = setTimeout(() => notice('Still setting the table… check your connection.'), 10000);
  repo.subscribe(
    (list) => { clearTimeout(loadTimer); notice(preview ? 'Preview mode: sign-ups here aren’t saved.' : ''); dishes = list; loaded = true; render(); },
    () => { clearTimeout(loadTimer); notice('Couldn’t load the menu right now. Try refreshing.', true); },
  );

  const fields = (d?: Partial<Dish>, course?: Course) => [
    { key: 'dish', label: 'Dish', value: d?.dish ?? '', placeholder: course?.placeholder, required: true, max: LIMITS.dish },
    { key: 'name', label: 'From the kitchen of', value: d?.name ?? identity.getName(), placeholder: 'e.g. Aunt Linda', required: true, max: LIMITS.name, collapse: !d },
    { key: 'note', label: 'Notes (optional)', value: d?.note ?? '', placeholder: 'serves 10, nut-free…', max: LIMITS.note },
  ];

  const openAdd = (course: Course) => sheet.open({
    title: course.name, kicker: 'Recipe card · sign-up', photo: photoUrl(course), saveLabel: 'Sign the menu',
    subHtml: alreadyComingHtml(dishesForCourse(dishes, course.id)), fields: fields(undefined, course),
    onSave: async (v) => {
      const clean = cleanDishInput(v);
      identity.setName(clean.name);
      const added = await repo.add({ ...clean, courseId: course.id, clientId: identity.clientId });
      flashId = added.id;
      flash(added.id);
      toast(`Thank you, ${clean.name}! ${clean.dish} is on the menu.`);
    },
  });

  const openEdit = (d: Dish) => {
    const course = courses.find((c) => c.id === d.courseId);
    sheet.open({
      title: d.clientId === identity.clientId ? 'Edit your dish' : `Edit ${d.name}’s dish`, kicker: 'Recipe card · edit', photo: course && photoUrl(course), saveLabel: 'Save', fields: fields(d, course),
      onSave: async (v) => { const clean = cleanDishInput(v); await repo.update(d.id, clean); toast('Updated.'); },
    });
  };

  document.addEventListener('click', async (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-act]');
    if (!b) return;
    const { act, id = '' } = b.dataset;
    if (act === 'add') { const c = courses.find((x) => x.id === id); if (c) openAdd(c); }
    else if (act === 'edit') { const d = dishes.find((x) => x.id === id); if (d) openEdit(d); }
    else if (act === 'rm') {
      if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.textContent = 'remove?'; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ''; b.textContent = '✕'; } }, 3000); return; }
      try { await repo.remove(id); toast('Removed from the menu.'); } catch { notice('Couldn’t remove that. Try again.', true); }
    }
  });
}

function notice(text: string, err = false) {
  $('#notice').innerHTML = '';
  if (!text) return;
  const div = document.createElement('div');
  div.className = `notice${err ? ' err' : ''}`;
  div.textContent = text;
  $('#notice').append(div);
}
