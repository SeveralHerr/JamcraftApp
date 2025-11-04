import { useState, useEffect } from 'react';
import { PortfolioProject } from '../../entities/PortfolioProject';
import { GetPortfolioProjects } from '../../use-cases/GetPortfolioProjects';

export function usePortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = new GetPortfolioProjects();
    const result = useCase.execute();
    setProjects(result);
    setLoading(false);
  }, []);

  return { projects, loading };
}
