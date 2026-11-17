import type { Dish, DishInput, DishPatch } from '../entities/menu';
import type { DishRepository } from './DishRepository';

/** Local-only store: used by tests and the `npm run dev` preview when no backend is configured. */
export class InMemoryDishRepository implements DishRepository {
  private dishes: Dish[];
  private listeners = new Set<(d: Dish[]) => void>();
  private seq = 0;

  constructor(seed: Dish[] = []) {
    this.dishes = [...seed];
  }

  subscribe(onChange: (d: Dish[]) => void, _onError?: (err: unknown) => void): () => void {
    this.listeners.add(onChange);
    queueMicrotask(() => onChange([...this.dishes]));
    return () => this.listeners.delete(onChange);
  }

  async add(input: DishInput): Promise<Dish> {
    const dish: Dish = { ...input, id: `local-${++this.seq}`, createdAt: new Date(Date.now() + this.seq).toISOString() };
    this.dishes.push(dish);
    this.emit();
    return dish;
  }

  async update(id: string, patch: DishPatch): Promise<void> {
    this.dishes = this.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d));
    this.emit();
  }

  async remove(id: string): Promise<void> {
    this.dishes = this.dishes.filter((d) => d.id !== id);
    this.emit();
  }

  private emit() {
    for (const l of this.listeners) l([...this.dishes]);
  }
}
