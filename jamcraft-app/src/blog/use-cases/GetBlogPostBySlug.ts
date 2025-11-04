import { BlogPost } from '../entities/BlogPost';
import { loadBlogPostBySlug } from '../data/blog-posts-loader';

export class GetBlogPostBySlug {
  async execute(slug: string): Promise<BlogPost | null> {
    return await loadBlogPostBySlug(slug);
  }
}
