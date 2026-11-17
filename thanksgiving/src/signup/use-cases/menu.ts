import type { Course, Dish, DishPatch } from '../entities/menu';

export const LIMITS = { dish: 80, name: 60, note: 120 } as const;

const byCreated = (a: Dish, b: Dish) => String(a.createdAt ?? '').localeCompare(String(b.createdAt ?? ''));

/** Dishes for one course, oldest first. Dishes for unknown courses are ignored. */
export function dishesForCourse(dishes: Dish[], courseId: string): Dish[] {
  return dishes.filter((d) => d.courseId === courseId).sort(byCreated);
}

/** Distinct guest names (case-insensitive), in first-signup order. */
export function guestsAtTable(dishes: Dish[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const d of [...dishes].sort(byCreated)) {
    const n = d.name.trim();
    const k = n.toLowerCase();
    if (n && !seen.has(k)) {
      seen.add(k);
      out.push(n);
    }
  }
  return out;
}

export function courseStatus(count: number): string {
  return count ? `${count} dish${count === 1 ? '' : 'es'} so far` : 'Bring anything';
}

export function menuSummary(dishes: Dish[], courses: Course[]): string {
  const ids = new Set(courses.map((c) => c.id));
  const n = dishes.filter((d) => ids.has(d.courseId)).length;
  return n ? `${n} dish${n === 1 ? '' : 'es'} on the menu so far` : 'The menu is wide open';
}

export class DishValidationError extends Error {}

/** Trims and validates what a guest typed. Throws DishValidationError with a friendly message. */
export function cleanDishInput(raw: { dish?: string; name?: string; note?: string }): DishPatch {
  const dish = (raw.dish ?? '').trim();
  const name = (raw.name ?? '').trim();
  const note = (raw.note ?? '').trim();
  if (!dish) throw new DishValidationError('Please write what you’re bringing.');
  if (!name) throw new DishValidationError('Please add your name.');
  if (dish.length > LIMITS.dish) throw new DishValidationError(`Keep the dish under ${LIMITS.dish} characters.`);
  if (name.length > LIMITS.name) throw new DishValidationError(`Keep your name under ${LIMITS.name} characters.`);
  if (note.length > LIMITS.note) throw new DishValidationError(`Keep the note under ${LIMITS.note} characters.`);
  return { dish, name, note: note || null };
}

/** Stable small tilt (degrees, -3..3) for a place card, derived from the name. */
export function tiltFor(name: string): number {
  let h = 0;
  for (const ch of name.toLowerCase()) h = (h * 31 + (ch.codePointAt(0) ?? 0)) | 0;
  return ((Math.abs(h) % 61) - 30) / 10;
}
