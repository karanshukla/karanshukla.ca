import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import BlogContent from '../components/BlogContent';

describe('BlogContent', () => {
  it('renders the post title', () => {
    render(
      <MemoryRouter>
        <BlogContent />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/optimising atproto applications is complicated/i),
    ).toBeInTheDocument();
  });

  it('renders the post description', () => {
    render(
      <MemoryRouter>
        <BlogContent />
      </MemoryRouter>,
    );
    expect(screen.getByText(/infrastructure challenges/i)).toBeInTheDocument();
  });

  it('renders a link to the individual post', () => {
    render(
      <MemoryRouter>
        <BlogContent />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole('link');
    expect(links.some((l) => l.getAttribute('href')?.includes('/blog/optimising-atproto'))).toBe(
      true,
    );
  });
});
