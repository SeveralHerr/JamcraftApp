import { useState } from 'react';
import { GetSocialLinks } from '../../use-cases/GetSocialLinks';

/** Static data, so it is computed once on the first render — no loading state. */
export function useSocialLinks() {
  const [socialLinks] = useState(() => new GetSocialLinks().execute());

  return { socialLinks };
}
