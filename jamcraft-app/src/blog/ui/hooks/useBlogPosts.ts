import { useState, useEffect } from 'react';
import { BlogPostMetadata } from '../../entities/BlogPost';
import { GetBlogPosts } from '../../use-cases/GetBlogPosts';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const useCase = new GetBlogPosts();
      const result = await useCase.execute();
      setPosts(result);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return { posts, loading };
}
