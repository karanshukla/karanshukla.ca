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
