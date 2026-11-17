import { describe, expect, it } from 'vitest';
import { createLocalIdentity } from './localIdentity';

describe('createLocalIdentity', () => {
  it('creates a client id once and remembers the name', () => {
    localStorage.clear();
    const a = createLocalIdentity(localStorage);
    const b = createLocalIdentity(localStorage);
    expect(a.clientId).toBe(b.clientId);
    a.setName('Jo');
    expect(b.getName()).toBe('Jo');
  });

  it('works with no storage at all', () => {
    const id = createLocalIdentity(null);
    expect(id.clientId).toMatch(/[0-9a-f-]{36}/);
    expect(id.getName()).toBe('');
    id.setName('x');
  });

  it('survives a storage that throws', () => {
    const broken = { getItem() { throw new Error('nope'); }, setItem() { throw new Error('nope'); } } as unknown as Storage;
    const id = createLocalIdentity(broken);
    expect(id.getName()).toBe('');
    expect(() => id.setName('x')).not.toThrow();
  });
});
