import { useState } from 'react';
import { GetProfile } from '../../use-cases/GetProfile';

/** Static data, so it is computed once on the first render — no loading state. */
export function useProfile() {
  const [profile] = useState(() => new GetProfile().execute());

  return { profile };
}
