import { describe, expect, it, vi } from 'vitest';
import { InMemoryDishRepository } from './InMemoryDishRepository';

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('InMemoryDishRepository', () => {
  it('delivers the list on subscribe and after add/update/remove', async () => {
    const repo = new InMemoryDishRepository();
    const seen = vi.fn();
    const unsub = repo.subscribe(seen, () => {});
    await flush();
    expect(seen).toHaveBeenLastCalledWith([]);

    const a = await repo.add({ courseId: 'sides', dish: 'Pie', name: 'Jo', note: null, clientId: 'c1' });
    expect(a.id).toBeTruthy();
    expect(seen.mock.lastCall?.[0]).toHaveLength(1);

    await repo.update(a.id, { dish: 'Pecan pie', name: 'Jo', note: 'warm' });
    expect(seen.mock.lastCall?.[0][0]).toMatchObject({ dish: 'Pecan pie', note: 'warm' });

    await repo.remove(a.id);
    expect(seen).toHaveBeenLastCalledWith([]);

    unsub();
    await repo.add({ courseId: 'sides', dish: 'X', name: 'Y', note: null, clientId: null });
    expect(seen.mock.lastCall?.[0]).toEqual([]);
  });

  it('orders created timestamps even within the same millisecond', async () => {
    const repo = new InMemoryDishRepository();
    const a = await repo.add({ courseId: 's', dish: '1', name: 'A', note: null, clientId: null });
    const b = await repo.add({ courseId: 's', dish: '2', name: 'B', note: null, clientId: null });
    expect(String(a.createdAt) < String(b.createdAt)).toBe(true);
  });
});
