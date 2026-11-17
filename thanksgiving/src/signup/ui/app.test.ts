import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { COURSES, EVENT } from '../data/menu-config';
import { InMemoryDishRepository } from '../services/InMemoryDishRepository';
import { createLocalIdentity } from '../services/localIdentity';
import { startApp } from './app';

const page = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
const body = page.slice(page.indexOf('<body>') + 6, page.indexOf('<script type="module"'));
const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));
const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T;

async function boot(host = false, repo = new InMemoryDishRepository()) {
  document.body.innerHTML = body;
  localStorage.clear();
  const identity = createLocalIdentity(localStorage);
  startApp({ repo, identity, event: EVENT, courses: COURSES, host });
  await tick();
  return { repo, identity };
}

async function signUp(courseIndex: number, dish: string, name?: string) {
  ($(`.course:nth-of-type(${courseIndex + 1}) [data-act="add"]`) as HTMLButtonElement).click();
  ($('#f_dish') as HTMLInputElement).value = dish;
  const nameInput = $('#f_name') as HTMLInputElement;
  if (name !== undefined) nameInput.value = name;
  $('#sheet').dispatchEvent(new Event('submit', { cancelable: true }));
  await tick();
}

describe('sign-up app', () => {
  beforeEach(() => { document.body.innerHTML = ''; });

  it('renders the event and every course with a sign line', async () => {
    await boot();
    expect($('#title').textContent).toBe(EVENT.title);
    expect(document.querySelectorAll('.course')).toHaveLength(COURSES.length);
    expect($('#sumText').textContent).toBe('The menu is wide open');
    expect($('#guests').hidden).toBe(true);
  });

  it('signs up, remembers the name, and lets you add a second dish to the same course', async () => {
    const { identity } = await boot();
    await signUp(1, 'Green beans', 'Aunt Linda');
    expect($('#scrim').classList.contains('show')).toBe(false);
    expect($('#list').textContent).toContain('Green beans');
    expect($('#toast').textContent).toContain('Thank you, Aunt Linda!');
    expect(identity.getName()).toBe('Aunt Linda');
    expect(document.querySelector('#cat-sides li.item-flash')?.textContent).toContain('Green beans');
    expect($('#sumText').textContent).toBe('1 dish on the menu so far');

    ($('#cat-sides [data-act="add"]') as HTMLButtonElement).click();
    expect($('#sheetSub').textContent).toContain('Green beans');
    expect($('.field.collapsed .as-line').textContent).toContain('Aunt Linda');
    ($('#f_dish') as HTMLInputElement).value = 'Stuffing';
    $('#sheet').dispatchEvent(new Event('submit', { cancelable: true }));
    await tick();
    expect(document.querySelectorAll('#cat-sides li.item.mine')).toHaveLength(2);
    expect($('#guests').textContent).toContain('1 household');
  });

  it('shows a friendly error and keeps the sheet open on bad input', async () => {
    await boot();
    await signUp(0, '   ', 'Jo');
    expect($('#scrim').classList.contains('show')).toBe(true);
    expect($('#sheetErr').textContent).toContain('what you’re bringing');
  });

  it('shows a generic error when saving fails', async () => {
    const repo = new InMemoryDishRepository();
    repo.add = async () => { throw new Error('network'); };
    await boot(false, repo);
    await signUp(0, 'Dip', 'Jo');
    expect($('#sheetErr').textContent).toContain('Couldn’t save');
  });

  it('edits and removes your own dish (two-tap remove)', async () => {
    await boot();
    await signUp(0, 'Dip', 'Jo');
    ($('[data-act="edit"]') as HTMLButtonElement).click();
    expect(($('#f_dish') as HTMLInputElement).value).toBe('Dip');
    ($('#f_dish') as HTMLInputElement).value = 'Spinach dip';
    $('#sheet').dispatchEvent(new Event('submit', { cancelable: true }));
    await tick();
    expect($('#list').textContent).toContain('Spinach dip');

    const rm = $('[data-act="rm"]') as HTMLButtonElement;
    rm.click();
    expect(rm.textContent).toBe('remove?');
    rm.click();
    await tick();
    expect($('#list').textContent).not.toContain('Spinach dip');
  });

  it('hides the toast when a sheet opens and keeps toast text short', async () => {
    await boot();
    await signUp(0, 'A very long dish name that goes on and on for a while', 'Jo');
    expect($('#toast').textContent!.length).toBeLessThan(60);
    expect($('#toast').classList.contains('show')).toBe(true);
    ($('#cat-sides [data-act="add"]') as HTMLButtonElement).click();
    expect($('#toast').classList.contains('show')).toBe(false);
  });

  it('hides controls on other people’s dishes unless in host mode', async () => {
    const repo = new InMemoryDishRepository([{ id: 'x', courseId: 'sides', dish: 'Pie', name: 'Mo', clientId: 'someone-else', createdAt: '1' }]);
    await boot(false, repo);
    expect(document.querySelectorAll('[data-act="rm"]')).toHaveLength(0);
    await boot(true, repo);
    expect(document.querySelectorAll('[data-act="rm"]')).toHaveLength(1);
    ($('[data-act="edit"]') as HTMLButtonElement).click();
    expect($('#sheetTitle').textContent).toBe('Edit Mo’s dish');
  });

  it('closes on Escape and on the ✕ button, and reveals the name field on change', async () => {
    await boot();
    await signUp(0, 'Dip', 'Jo');
    ($('#cat-sides [data-act="add"]') as HTMLButtonElement).click();
    ($('[data-reveal]') as HTMLButtonElement).click();
    expect($('.field.collapsed')).toBeNull();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect($('#scrim').classList.contains('show')).toBe(false);
    ($('#cat-sides [data-act="add"]') as HTMLButtonElement).click();
    $('#sheetX').click();
    expect($('#scrim').classList.contains('show')).toBe(false);
  });

  it('reports a load failure', async () => {
    const repo = new InMemoryDishRepository();
    repo.subscribe = (_ok, fail) => { fail(new Error('x')); return () => {}; };
    await boot(false, repo);
    expect($('#notice').textContent).toContain('Couldn’t load');
  });

  it('has link-preview metadata for texting the link', () => {
    expect(page).toMatch(/<meta property="og:title" content="[^"]+">/);
    expect(page).toMatch(/<meta property="og:image" content="https:\/\/[^"]+\.jpg">/);
    expect(page).toContain('name="twitter:card"');
    expect(page).toContain('rel="apple-touch-icon"');
  });

  it('asks search engines not to index the family page and explains itself without JavaScript', () => {
    expect(page).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(page).toContain('<noscript>');
  });

  it('has a main landmark around the menu', () => {
    expect(page).toMatch(/<main class="menu card"/);
  });
});
