import type { Dish } from '../entities/menu';

/** Sample sign-ups for local design checks (`npm run dev`, then open /?demo). Never used in production. */
export const DEMO_DISHES: Dish[] = [
  { id: 'd1', courseId: 'sides', dish: 'Green bean casserole', name: 'Aunt Linda', note: 'Extra crispy onions', createdAt: '2026-11-17T10:00:00Z' },
  { id: 'd2', courseId: 'sides', dish: 'Mashed potatoes', name: 'Mike', createdAt: '2026-11-17T10:01:00Z' },
  { id: 'd3', courseId: 'desserts', dish: 'Pumpkin pie', name: 'Grandma Jo', note: 'Plus whipped cream', createdAt: '2026-11-17T10:02:00Z' },
  { id: 'd4', courseId: 'appetizers', dish: 'Deviled eggs', name: 'Sarah K.', createdAt: '2026-11-17T10:03:00Z' },
  { id: 'd5', courseId: 'drinks', dish: 'Apple cider', name: 'The Nguyens', createdAt: '2026-11-17T10:04:00Z' },
  { id: 'd6', courseId: 'bread', dish: 'Homemade dinner rolls (2 dozen)', name: 'Uncle Bartholomew Fitzgerald', createdAt: '2026-11-17T10:05:00Z' },
];
