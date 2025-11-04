import { useState, useEffect } from 'react';
import { SocialLink } from '../../entities/SocialLink';
import { GetSocialLinks } from '../../use-cases/GetSocialLinks';

export function useSocialLinks() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = new GetSocialLinks();
    const result = useCase.execute();
    setSocialLinks(result);
    setLoading(false);
  }, []);

  return { socialLinks, loading };
}
