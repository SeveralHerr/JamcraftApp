import { describe, expect, it } from 'vitest';
import type { Dish } from '../entities/menu';
import { COURSES } from '../data/menu-config';
import { alreadyComingHtml, coursesHtml, courseDomId, esc, guestsHtml, metaHtml } from './html';

const dish = (over: Partial<Dish>): Dish => ({ id: '1', courseId: 'sides', dish: 'Pie', name: 'Jo', createdAt: '1', ...over });
const guest = { clientId: 'me', host: false };

describe('esc', () => {
  it('escapes HTML-significant characters', () => {
    expect(esc(`<img src=x onerror="a('b')">&`)).toBe('&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;');
    expect(esc(null)).toBe('');
  });
});

describe('metaHtml', () => {
  it('puts date and time on one line and the place on its own', () => {
    const html = metaHtml({ title: 'T', date: 'Thu', time: '2 PM', place: '<Home>' });
    expect(html).toContain('m-dot');
    expect(html).toContain('m-where">&lt;Home&gt;');
  });
  it('omits empty parts', () => {
    expect(metaHtml({ title: 'T', date: 'Thu' })).not.toContain('m-dot');
    expect(metaHtml({ title: 'T', date: '' })).toBe('');
  });
});

describe('coursesHtml', () => {
  it('renders every course with a sign line, even when it has dishes', () => {
    const html = coursesHtml(COURSES, [dish({})], guest);
    expect(html.match(/class="course"/g)).toHaveLength(COURSES.length);
    expect(html.match(/data-act="add"/g)).toHaveLength(COURSES.length);
    expect(html).toContain('Add another dish to Sides');
    expect(html).toContain('1 dish so far');
    expect(html).toContain('Bring anything');
  });

  it('escapes guest text', () => {
    const html = coursesHtml(COURSES, [dish({ dish: '<b>x</b>', name: '"Jo"', note: '<i>' })], guest);
    expect(html).not.toContain('<b>x</b>');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).toContain('&lt;i&gt;');
  });

  it('shows You + controls only on your own dish unless in host mode', () => {
    const mine = dish({ id: 'a', clientId: 'me' });
    const theirs = dish({ id: 'b', clientId: 'other' });
    const html = coursesHtml(COURSES, [mine, theirs], guest);
    expect(html.match(/you-pill/g)).toHaveLength(1);
    expect(html.match(/data-act="rm"/g)).toHaveLength(1);
    expect(coursesHtml(COURSES, [mine, theirs], { clientId: 'me', host: true }).match(/data-act="rm"/g)).toHaveLength(2);
  });

  it('marks long course names', () => {
    expect(coursesHtml([{ id: 'x', name: 'A very long course name here', photo: 'pie', placeholder: '' }], [], guest)).toContain('class="long"');
  });
});

describe('courseDomId', () => {
  it('sanitizes ids', () => expect(courseDomId('a b&c')).toBe('cat-a_b_c'));
});

describe('guestsHtml', () => {
  it('is empty with no dishes and pluralizes households', () => {
    expect(guestsHtml([])).toBe('');
    expect(guestsHtml([dish({})])).toContain('1 household<');
    expect(guestsHtml([dish({}), dish({ id: '2', name: 'Mo' })])).toContain('2 households');
  });
});

describe('alreadyComingHtml', () => {
  it('lists up to six dishes then a count', () => {
    expect(alreadyComingHtml([])).toBe('');
    const many = Array.from({ length: 8 }, (_, i) => dish({ id: String(i), dish: `D${i}` }));
    const html = alreadyComingHtml(many);
    expect(html.match(/have-chip"/g)).toHaveLength(6);
    expect(html).toContain('+2 more');
  });
});
