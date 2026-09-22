import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { parseFrontmatter } from './src/helpers/frontmatter';

const SITE_URL = 'https://karanshukla.ca';
const SITE_NAME = 'karan shukla';
const POSTS_DIR = 'src/data/posts';
const STANDARD_SITE_RECORDS = 'src/data/standardSiteRecords.json';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  type: 'website' | 'article';
  publishedAt?: string;
  standardSiteDocumentUri?: string;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headTags(meta: PageMeta): string {
  const url = `${SITE_URL}${meta.path}`;
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (meta.publishedAt) {
    tags.push(`<meta property="article:published_time" content="${meta.publishedAt}" />`);
  }
  if (meta.standardSiteDocumentUri) {
    tags.push(`<link rel="site.standard.document" href="${meta.standardSiteDocumentUri}" />`);
  }
  return tags.map((tag) => `  ${tag}\n`).join('');
}

function renderPage(template: string, meta: PageMeta, documentTitle: string): string {
  return template
    .replace(/<title>.*<\/title>/, `<title>${escapeHtml(documentTitle)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace('</head>', `${headTags(meta)}</head>`);
}

function loadPostPages(): { slug: string; meta: PageMeta }[] {
  const records = JSON.parse(readFileSync(STANDARD_SITE_RECORDS, 'utf-8')) as {
    posts: Record<string, { uri: string }>;
  };
  return readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const { data } = parseFrontmatter(readFileSync(join(POSTS_DIR, file), 'utf-8'));
      return {
        slug,
        meta: {
          title: data['title'] ?? slug,
          description: data['description'] ?? '',
          path: `/blog/${slug}`,
          type: 'article',
          publishedAt: data['date'],
          standardSiteDocumentUri: records.posts[slug]?.uri,
        },
      };
    });
}

// GitHub Pages never sees the /#/ hash route, so each post gets a real
// /blog/<slug> HTML file whose <head> crawlers and standard.site can read
// without running JS. The SPA itself boots from the same HTML.
export function prerenderBlogPages(): Plugin {
  let outDir = 'build';
  return {
    name: 'prerender-blog-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle() {
      const indexPath = join(outDir, 'index.html');
      const template = readFileSync(indexPath, 'utf-8');
      const siteDescription =
        /<meta name="description" content="([^"]*)" \/>/.exec(template)?.[1] ?? '';
      const siteTitle = /<title>(.*)<\/title>/.exec(template)?.[1] ?? SITE_NAME;
      const sitePage = renderPage(
        template,
        { title: siteTitle, description: siteDescription, path: '/', type: 'website' },
        siteTitle,
      );
      writeFileSync(indexPath, sitePage);
      writeFileSync(join(outDir, '404.html'), sitePage);

      mkdirSync(join(outDir, 'blog'), { recursive: true });
      for (const { slug, meta } of loadPostPages()) {
        writeFileSync(
          join(outDir, 'blog', `${slug}.html`),
          renderPage(template, meta, `${meta.title} | ${SITE_NAME}`),
        );
      }
    },
  };
}
