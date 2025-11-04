import { useState, useEffect } from 'react';
import { Profile } from '../../entities/Profile';
import { GetProfile } from '../../use-cases/GetProfile';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = new GetProfile();
    const result = useCase.execute();
    setProfile(result);
    setLoading(false);
  }, []);

  return { profile, loading };
}
