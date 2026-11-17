import type { Course, Dish, EventInfo } from '../entities/menu';
import { courseStatus, dishesForCourse, guestsAtTable, tiltFor } from '../use-cases/menu';

export const esc = (s: unknown): string =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const photoUrl = (c: Course) => `/img/${c.photo}.jpg`;
export const courseDomId = (id: string) => 'cat-' + id.replace(/[^A-Za-z0-9_-]/g, '_');

export interface ViewState {
  clientId: string;
  /** host mode: may edit/remove anyone's dish */
  host: boolean;
}

export function metaHtml(e: EventInfo): string {
  const when = [e.date, e.time].filter(Boolean) as string[];
  const whenHtml = when
    .map((t, k) => `<span class="m-item">${esc(t)}${k < when.length - 1 ? '<span class="m-dot" aria-hidden="true">·</span>' : ''}</span>`)
    .join(' ');
  return (whenHtml ? `<span class="m-line">${whenHtml}</span>` : '') + (e.place ? `<span class="m-line m-where">${esc(e.place)}</span>` : '');
}

const NIB = '<svg class="nib" viewBox="0 0 18 18"><path d="M2.5 15.5 5 8.5 11 2.5l4.5 4.5-6 6z"/><path d="M2.5 15.5 6.6 11.4"/><circle cx="7.4" cy="10.6" r="1.1" fill="none" stroke="var(--pen)" stroke-width="1.3"/><path d="M11 2.5 15.5 7"/></svg>';

function dishRow(d: Dish, v: ViewState): string {
  const mine = !!d.clientId && d.clientId === v.clientId;
  const ctl = mine || v.host
    ? `<span class="ctl"><button type="button" class="ed" data-act="edit" data-id="${esc(d.id)}" title="Edit" aria-label="Edit ${esc(d.dish)}">✎</button><button type="button" class="rm" data-act="rm" data-id="${esc(d.id)}" title="Remove" aria-label="Remove ${esc(d.dish)}">✕</button></span>`
    : '';
  return `<li class="item${mine ? ' mine' : ''}" data-iid="${esc(d.id)}"><span class="dish">${esc(d.dish)}</span><span class="sig"><span class="leader" aria-hidden="true"></span><span class="who">${esc(d.name)}</span>${mine ? '<span class="you-pill">You</span>' : ''}${ctl}</span>${d.note ? `<span class="note">${esc(d.note)}</span>` : ''}</li>`;
}

function signLine(c: Course, more: boolean): string {
  return `<li class="item open"><button type="button" class="open-btn" data-act="add" data-id="${esc(c.id)}" aria-label="${more ? 'Add another dish to' : 'Sign up for'} ${esc(c.name)}"><span class="open-line" aria-hidden="true">${NIB}<span class="ph">${more ? 'add another dish…' : 'your dish &amp; name…'}</span></span><span class="claim" aria-hidden="true">${more ? 'add yours' : 'sign here'}</span></button></li>`;
}

export function coursesHtml(courses: Course[], dishes: Dish[], v: ViewState): string {
  return courses.map((c) => {
    const list = dishesForCourse(dishes, c.id);
    return `<section class="course" id="${courseDomId(c.id)}">
      <div class="cat-head">
        <span class="cat-pol" aria-hidden="true"><span class="tape"></span><img class="cat-photo" src="${photoUrl(c)}" alt="" width="120" height="120" decoding="async"></span>
        <div class="cat-title"><h3${c.name.length > 22 ? ' class="long"' : ''}>${esc(c.name)}</h3><div class="cat-sub">${courseStatus(list.length)}</div></div>
      </div>
      <ul class="items">${list.map((d) => dishRow(d, v)).join('')}${signLine(c, list.length > 0)}</ul>
    </section>`;
  }).join('');
}

export function guestsHtml(dishes: Dish[]): string {
  const guests = guestsAtTable(dishes);
  if (!guests.length) return '';
  return `<h4 class="guests-h">At the table<span class="gd" aria-hidden="true">·</span>${guests.length} household${guests.length === 1 ? '' : 's'}</h4>`
    + `<ul class="place-cards">${guests.map((n) => `<li class="place-card" style="--tilt:${tiltFor(n)}deg"><span>${esc(n)}</span></li>`).join('')}</ul>`;
}

export function alreadyComingHtml(dishes: Dish[]): string {
  if (!dishes.length) return '';
  const shown = dishes.slice(0, 6).map((d) => `<span class="have-chip">${esc(d.dish)}</span>`).join('');
  const more = dishes.length > 6 ? `<span class="have-more">+${dishes.length - 6} more</span>` : '';
  return `Already coming: <span class="have-chips">${shown}${more}</span>`;
}
