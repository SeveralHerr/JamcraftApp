import { useState } from 'react';
import { GetGameJamSubmissions } from '../../use-cases/GetGameJamSubmissions';
import { GAME_JAM_SUBMISSIONS_DATA } from '../../data/game-jam-submissions-data';

/** Static data, so it is computed once on the first render — no loading state. */
export function useGameJamSubmissions() {
  const [submissions] = useState(() => new GetGameJamSubmissions(GAME_JAM_SUBMISSIONS_DATA).executeSortedByYear());

  return { submissions };
}
