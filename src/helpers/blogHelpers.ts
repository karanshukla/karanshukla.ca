import { parseFrontmatter } from './frontmatter';

const postModules = import.meta.glob<string>('../data/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export const blogPosts: BlogPost[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const slug = path.replace(/^.*\//, '').replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data['title'] ?? slug,
      date: data['date'] ?? '',
      description: data['description'] ?? '',
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

const WORDS_PER_MINUTE = 200;

export const readingMinutes = (content: string): number =>
  Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));
