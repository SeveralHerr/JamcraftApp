import { useState, useEffect } from 'react';
import { GameJamSubmission } from '../../entities/GameJamSubmission';
import { GetGameJamSubmissions } from '../../use-cases/GetGameJamSubmissions';
import { GAME_JAM_SUBMISSIONS_DATA } from '../../data/game-jam-submissions-data';

export function useGameJamSubmissions() {
  const [submissions, setSubmissions] = useState<GameJamSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const useCase = new GetGameJamSubmissions(GAME_JAM_SUBMISSIONS_DATA);
        const data = useCase.executeSortedByYear();
        setSubmissions(data);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return { submissions, loading };
}
