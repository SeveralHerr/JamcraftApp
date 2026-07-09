import { useState, useEffect } from 'react';
import { Workshop } from '../../entities/Workshop';
import { GetWorkshops } from '../../use-cases/GetWorkshops';
import { WORKSHOPS_DATA } from '../../data/workshops-data';

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const useCase = new GetWorkshops(WORKSHOPS_DATA);
        setWorkshops(useCase.executeSortedByYear());
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return { workshops, loading };
}
