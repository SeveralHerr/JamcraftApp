import { useState, useEffect } from 'react';
import { CommunityChannel } from '../../entities/CommunityChannel';
import { GetCommunityChannels } from '../../use-cases/GetCommunityChannels';

export function useCommunityChannels() {
  const [channels, setChannels] = useState<CommunityChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = new GetCommunityChannels();
    const result = useCase.execute();
    setChannels(result);
    setLoading(false);
  }, []);

  return { channels, loading };
}
