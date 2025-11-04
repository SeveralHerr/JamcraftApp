import { BlogPost, BlogPostMetadata } from '../entities/BlogPost';
import {
  parseFrontmatter,
  stripFrontmatter,
  extractExcerpt,
  normalizeSlug
} from './markdown-parser';

const markdownFiles = import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default' });

function isReadmeFile(filename: string): boolean {
  return /README/i.test(filename);
}

function getFilename(path: string): string {
  return path.split('/').pop() || path;
}

async function loadBlogPost(path: string, resolver: () => Promise<string>): Promise<BlogPost | null> {
  const filename = getFilename(path);

  if (isReadmeFile(filename)) {
    return null;
  }

  const raw = await resolver();
  const frontmatter = parseFrontmatter(raw);
  const content = stripFrontmatter(raw);
  const slug = normalizeSlug(filename, frontmatter.slug);

  return {
    slug,
    title: frontmatter.title || slug,
    date: frontmatter.date || '',
    tags: frontmatter.tags || [],
    content,
    excerpt: extractExcerpt(content)
  };
}

export async function loadAllBlogPosts(): Promise<BlogPost[]> {
  const entries = Object.entries(markdownFiles) as [string, () => Promise<string>][];

  const posts = await Promise.all(
    entries.map(([path, resolver]) => loadBlogPost(path, resolver))
  );

  return posts.filter((post): post is BlogPost => post !== null);
}

export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = Object.entries(markdownFiles) as [string, () => Promise<string>][];

  for (const [path, resolver] of entries) {
    const post = await loadBlogPost(path, resolver);

    if (post && post.slug === slug) {
      return post;
    }
  }

  return null;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

export function convertToMetadata(posts: BlogPost[]): BlogPostMetadata[] {
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    excerpt: post.excerpt
  }));
}
