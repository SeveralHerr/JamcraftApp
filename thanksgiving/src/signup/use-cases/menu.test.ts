import { describe, expect, it } from 'vitest';
import type { Dish } from '../entities/menu';
import { COURSES } from '../data/menu-config';
import {
  cleanDishInput, courseStatus, dishesForCourse, DishValidationError, guestsAtTable, LIMITS, menuSummary, tiltFor,
} from './menu';

const d = (id: string, courseId: string, name: string, createdAt: string): Dish =>
  ({ id, courseId, dish: `dish ${id}`, name, createdAt });

describe('dishesForCourse', () => {
  it('keeps one course, oldest first', () => {
    const list = [d('2', 'sides', 'B', '2026-11-02'), d('1', 'sides', 'A', '2026-11-01'), d('3', 'drinks', 'C', '2026-11-03')];
    expect(dishesForCourse(list, 'sides').map((x) => x.id)).toEqual(['1', '2']);
  });
});

describe('guestsAtTable', () => {
  it('dedupes names case-insensitively in signup order and skips blanks', () => {
    const list = [d('1', 'sides', 'Aunt Linda', '1'), d('2', 'drinks', ' aunt linda ', '2'), d('3', 'sides', 'Mike', '3'), d('4', 'sides', '  ', '4')];
    expect(guestsAtTable(list)).toEqual(['Aunt Linda', 'Mike']);
  });
});

describe('courseStatus', () => {
  it('invites anything when empty and counts otherwise', () => {
    expect(courseStatus(0)).toBe('Bring anything');
    expect(courseStatus(1)).toBe('1 dish so far');
    expect(courseStatus(3)).toBe('3 dishes so far');
  });
});

describe('menuSummary', () => {
  it('counts only dishes in known courses, with plural handling', () => {
    expect(menuSummary([], COURSES)).toBe('The menu is wide open');
    expect(menuSummary([d('1', 'sides', 'A', '1')], COURSES)).toBe('1 dish on the menu so far');
    expect(menuSummary([d('1', 'sides', 'A', '1'), d('2', 'gone', 'B', '2'), d('3', 'drinks', 'C', '3')], COURSES)).toBe('2 dishes on the menu so far');
  });
});

describe('cleanDishInput', () => {
  it('trims and turns an empty note into null', () => {
    expect(cleanDishInput({ dish: ' Pie ', name: ' Jo ', note: '  ' })).toEqual({ dish: 'Pie', name: 'Jo', note: null });
  });
  it.each([
    [{ dish: '', name: 'Jo' }, 'what you’re bringing'],
    [{ dish: 'Pie', name: '' }, 'your name'],
    [{ dish: 'x'.repeat(LIMITS.dish + 1), name: 'Jo' }, 'dish under'],
    [{ dish: 'Pie', name: 'x'.repeat(LIMITS.name + 1) }, 'name under'],
    [{ dish: 'Pie', name: 'Jo', note: 'x'.repeat(LIMITS.note + 1) }, 'note under'],
  ])('rejects %o', (input, msg) => {
    expect(() => cleanDishInput(input)).toThrow(DishValidationError);
    expect(() => cleanDishInput(input)).toThrow(msg);
  });
});

describe('tiltFor', () => {
  it('is stable, case-insensitive and within ±3°', () => {
    expect(tiltFor('Mike')).toBe(tiltFor('mike'));
    for (const n of ['A', 'Grandma Jo', 'Uncle Bartholomew Fitzgerald']) {
      expect(Math.abs(tiltFor(n))).toBeLessThanOrEqual(3);
    }
  });
});
