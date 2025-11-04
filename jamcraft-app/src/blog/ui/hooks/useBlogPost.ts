import { useState, useEffect } from 'react';
import { BlogPost } from '../../entities/BlogPost';
import { GetBlogPostBySlug } from '../../use-cases/GetBlogPostBySlug';

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      const useCase = new GetBlogPostBySlug();
      const result = await useCase.execute(slug);

      if (result) {
        setPost(result);
        setNotFound(false);
      } else {
        setPost(null);
        setNotFound(true);
      }

      setLoading(false);
    };

    loadPost();
  }, [slug]);

  return { post, loading, notFound };
}
