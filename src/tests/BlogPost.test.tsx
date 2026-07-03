import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const renderPost = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  );

describe('BlogPost', () => {
  it('renders the post title for a valid slug', () => {
    renderPost('optimising-atproto');
    expect(
      screen.getByRole('heading', { name: /optimising atproto applications/i }),
    ).toBeInTheDocument();
  });

  it('renders a date for the post', () => {
    renderPost('optimising-atproto');
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders post content', () => {
    renderPost('optimising-atproto');
    expect(screen.getByText(/decentralised platform/i)).toBeInTheDocument();
  });

  it('renders a back link to blog', () => {
    renderPost('optimising-atproto');
    const link = screen.getByRole('link', { name: /back to blog/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/blog');
  });

  it('shows not found message for unknown slug', () => {
    renderPost('does-not-exist');
    expect(screen.getByText('post not found.')).toBeInTheDocument();
  });

  it('shows back link on not-found page', () => {
    renderPost('does-not-exist');
    expect(screen.getByRole('link', { name: /back to blog/i })).toBeInTheDocument();
  });
});
