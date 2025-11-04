import { BlogPostMetadata } from '../entities/BlogPost';
import {
  loadAllBlogPosts,
  sortPostsByDate,
  convertToMetadata
} from '../data/blog-posts-loader';

export class GetBlogPosts {
  async execute(): Promise<BlogPostMetadata[]> {
    const posts = await loadAllBlogPosts();
    const sorted = sortPostsByDate(posts);
    return convertToMetadata(sorted);
  }
}
