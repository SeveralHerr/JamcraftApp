import { useState } from 'react';
import { GetWorkshops } from '../../use-cases/GetWorkshops';
import { WORKSHOPS_DATA } from '../../data/workshops-data';

/** Static data, so it is computed once on the first render — no loading state. */
export function useWorkshops() {
  const [workshops] = useState(() => new GetWorkshops(WORKSHOPS_DATA).executeSortedByYear());

  return { workshops };
}
