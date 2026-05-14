import { render, screen, waitFor } from '@testing-library/react';
import HomeContent from '../components/HomeContent';

const mockRepoData = {
  html_url: 'https://github.com/karanshukla/test',
  stargazers_count: 6,
  forks_count: 0,
  language: 'TypeScript',
  updated_at: '2026-01-01T00:00:00Z',
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockRepoData) }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('HomeContent', () => {
  it('renders the page heading', () => {
    render(<HomeContent />);
    expect(screen.getByText(/software\/mechanical engineer/i)).toBeInTheDocument();
  });

  it('renders both project card titles', () => {
    render(<HomeContent />);
    expect(screen.getByText('navyfragen')).toBeInTheDocument();
    expect(screen.getByText(/openresto/i)).toBeInTheDocument();
  });

  it('renders github links after fetch resolves', async () => {
    render(<HomeContent />);
    await waitFor(() => {
      expect(screen.getAllByText('view on github')).toHaveLength(2);
    });
  });

  it('shows the language chip after fetch resolves', async () => {
    render(<HomeContent />);
    await waitFor(() => {
      expect(screen.getAllByText('TypeScript')).toHaveLength(2);
    });
  });
});
