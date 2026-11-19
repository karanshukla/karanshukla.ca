import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LatestPostWidget from '../components/LatestPostWidget';
import type { BlogPost } from '../helpers/blogHelpers';

const mocks = vi.hoisted(() => ({ posts: [] as BlogPost[] }));

vi.mock('../helpers/blogHelpers', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../helpers/blogHelpers')>()),
  get blogPosts() {
    return mocks.posts;
  },
}));

const render = (ui: React.ReactElement) => rtlRender(<MemoryRouter>{ui}</MemoryRouter>);

const newest: BlogPost = {
  slug: 'newest-post',
  title: 'the newest post',
  date: '2026-11-01',
  description: 'what it is about',
  content: 'word '.repeat(1000),
};

const older: BlogPost = { ...newest, slug: 'older-post', title: 'an older post' };

describe('LatestPostWidget', () => {
  beforeEach(() => {
    mocks.posts = [newest, older];
  });

  it('shows the newest post with its date and description', () => {
    render(<LatestPostWidget />);
    expect(screen.getByText('latest post')).toBeInTheDocument();
    expect(screen.getByText('the newest post')).toBeInTheDocument();
    expect(screen.getByText('2026-11-01')).toBeInTheDocument();
    expect(screen.getByText('what it is about')).toBeInTheDocument();
    expect(screen.queryByText('an older post')).not.toBeInTheDocument();
  });

  it('links the title to the post and offers the full list', () => {
    render(<LatestPostWidget />);
    expect(screen.getByRole('link', { name: 'the newest post' })).toHaveAttribute(
      'href',
      '/blog/newest-post',
    );
    expect(screen.getByRole('link', { name: 'all posts →' })).toHaveAttribute('href', '/blog');
  });

  it('shows the reading time', () => {
    render(<LatestPostWidget />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('leaves out a missing date and description', () => {
    mocks.posts = [{ ...newest, date: '', description: '' }];
    render(<LatestPostWidget />);
    expect(screen.queryByText('2026-11-01')).not.toBeInTheDocument();
    expect(screen.queryByText('what it is about')).not.toBeInTheDocument();
  });

  it('says so when there are no posts', () => {
    mocks.posts = [];
    render(<LatestPostWidget />);
    expect(screen.getByText('no posts yet')).toBeInTheDocument();
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
  });
});
