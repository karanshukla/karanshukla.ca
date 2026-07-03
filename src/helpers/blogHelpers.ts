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

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const data = Object.fromEntries(
    match[1]
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const colon = line.indexOf(':');
        return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
      }),
  );
  return { data, content: match[2] };
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
