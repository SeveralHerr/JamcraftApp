import { useState, useEffect } from 'react';
import { SpeakingEngagement } from '../../entities/SpeakingEngagement';
import { GetSpeakingEngagements } from '../../use-cases/GetSpeakingEngagements';
import { SPEAKING_ENGAGEMENTS_DATA } from '../../data/speaking-engagements-data';

export function useSpeakingEngagements() {
  const [engagements, setEngagements] = useState<SpeakingEngagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEngagements = async () => {
      setLoading(true);
      try {
        const useCase = new GetSpeakingEngagements(SPEAKING_ENGAGEMENTS_DATA);
        setEngagements(useCase.executeSortedByYear());
      } finally {
        setLoading(false);
      }
    };

    fetchEngagements();
  }, []);

  return { engagements, loading };
}
