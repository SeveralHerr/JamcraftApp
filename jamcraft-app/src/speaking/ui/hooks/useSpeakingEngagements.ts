import { useState } from 'react';
import { GetSpeakingEngagements } from '../../use-cases/GetSpeakingEngagements';
import { SPEAKING_ENGAGEMENTS_DATA } from '../../data/speaking-engagements-data';

/** Static data, so it is computed once on the first render — no loading state. */
export function useSpeakingEngagements() {
  const [engagements] = useState(() => new GetSpeakingEngagements(SPEAKING_ENGAGEMENTS_DATA).executeSortedByYear());

  return { engagements };
}
