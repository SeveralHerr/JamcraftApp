import { useState } from 'react';
import { GetCommissions } from '../../use-cases/GetCommissions';
import { COMMISSIONS_DATA } from '../../data/commissions-data';

/** Static data, so it is computed once on the first render — no loading state. */
export function useCommissions() {
  const [commissions] = useState(() => new GetCommissions(COMMISSIONS_DATA).executeSortedByYear());

  return { commissions };
}
