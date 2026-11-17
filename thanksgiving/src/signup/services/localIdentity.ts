/** Per-browser memory: a random id (to mark "your" dishes) and the last name used. Never throws. */
export interface LocalIdentity {
  clientId: string;
  getName(): string;
  setName(name: string): void;
}

export function createLocalIdentity(storage: Storage | null = safeStorage()): LocalIdentity {
  const get = (k: string) => { try { return storage?.getItem(k) ?? null; } catch { return null; } };
  const set = (k: string, v: string) => { try { storage?.setItem(k, v); } catch { /* private mode */ } };
  let clientId = get('tg_client');
  if (!clientId) {
    clientId = crypto.randomUUID();
    set('tg_client', clientId);
  }
  return { clientId, getName: () => get('tg_name') ?? '', setName: (n) => set('tg_name', n) };
}

function safeStorage(): Storage | null {
  try { return window.localStorage; } catch { return null; }
}
