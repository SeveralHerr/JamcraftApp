import { useState } from 'react';
import { GetPortfolioProjects } from '../../use-cases/GetPortfolioProjects';

/** Static data, so it is computed once on the first render — no loading state. */
export function usePortfolioProjects() {
  const [projects] = useState(() => new GetPortfolioProjects().execute());

  return { projects };
}
