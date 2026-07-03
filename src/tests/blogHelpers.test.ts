import { blogPosts } from '../helpers/blogHelpers';

describe('blogHelpers', () => {
  it('loads at least one post', () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it('sorts posts by date descending', () => {
    for (let i = 0; i < blogPosts.length - 1; i++) {
      expect(blogPosts[i].date >= blogPosts[i + 1].date).toBe(true);
    }
  });

  it('every post has slug, title, and content', () => {
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.content).toBeTruthy();
    }
  });

  it('optimising-atproto post has correct metadata', () => {
    const post = blogPosts.find((p) => p.slug === 'optimising-atproto');
    expect(post).toBeDefined();
    expect(post?.title).toBe("optimising atproto applications is complicated (but that's okay)");
    expect(post?.date).toBe('2026-06-20');
    expect(post?.description).toBeTruthy();
  });
});
