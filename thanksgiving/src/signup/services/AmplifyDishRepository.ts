import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import type { Dish, DishInput, DishPatch } from '../entities/menu';
import type { DishRepository } from './DishRepository';

/** AppSync-backed store (Amplify Data, public API key). Requires Amplify.configure() first. */
export class AmplifyDishRepository implements DishRepository {
  private client = generateClient<Schema>();

  subscribe(onChange: (d: Dish[]) => void, onError: (err: unknown) => void): () => void {
    const sub = this.client.models.Dish.observeQuery().subscribe({
      next: ({ items }) => onChange(items as Dish[]),
      error: onError,
    });
    return () => sub.unsubscribe();
  }

  async add(input: DishInput): Promise<Dish> {
    const { data, errors } = await this.client.models.Dish.create(input);
    if (errors?.length || !data) throw new Error(errors?.[0]?.message ?? 'create failed');
    return data as Dish;
  }

  async update(id: string, patch: DishPatch): Promise<void> {
    const { errors } = await this.client.models.Dish.update({ id, ...patch });
    if (errors?.length) throw new Error(errors[0].message);
  }

  async remove(id: string): Promise<void> {
    const { errors } = await this.client.models.Dish.delete({ id });
    if (errors?.length) throw new Error(errors[0].message);
  }
}
