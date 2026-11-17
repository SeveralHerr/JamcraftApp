import type { Dish, DishInput, DishPatch } from '../entities/menu';

export interface DishRepository {
  /** Calls `onChange` with the full list now and on every change (any visitor's). Returns unsubscribe. */
  subscribe(onChange: (dishes: Dish[]) => void, onError: (err: unknown) => void): () => void;
  add(input: DishInput): Promise<Dish>;
  update(id: string, patch: DishPatch): Promise<void>;
  remove(id: string): Promise<void>;
}
