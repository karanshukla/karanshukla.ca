import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import HomeContent from '../components/HomeContent';

const render = (ui: React.ReactElement) => rtlRender(<MemoryRouter>{ui}</MemoryRouter>);

const mockRepoData = {
  html_url: 'https://github.com/karanshukla/test',
  stargazers_count: 6,
  forks_count: 0,
  language: 'TypeScript',
  updated_at: '2026-01-01T00:00:00Z',
};

const mockNowPlayingFile = {
  title: 'so what',
  artist: 'miles davis',
  album: '',
  imageUrl: '',
  url: 'https://music.youtube.com/watch?v=abc',
  played: 'today',
  tags: [],
  firstSeenAt: new Date().toISOString(),
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('now-playing.json')) {
        return Promise.resolve({ json: () => Promise.resolve(mockNowPlayingFile) });
      }
      return Promise.resolve({ json: () => Promise.resolve(mockRepoData) });
    }),
  );
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
    expect(screen.getByText('openresto')).toBeInTheDocument();
    expect(screen.getByText('bluejays.space')).toBeInTheDocument();
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

  it('links to the vinopilot page instead of showing it inline', () => {
    render(<HomeContent />);
    expect(screen.getByText('side projects')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'vinopilot' })).toHaveAttribute('href', '/vinopilot');
    expect(screen.queryByRole('link', { name: /vinopilot\.ca/ })).not.toBeInTheDocument();
  });

  it('renders the github pulse section', () => {
    render(<HomeContent />);
    expect(screen.getByText('github pulse (llm summarised)')).toBeInTheDocument();
  });

  it('renders the youtube music widget', () => {
    render(<HomeContent />);
    expect(screen.getByText('youtube music')).toBeInTheDocument();
  });

  it('shows the latest track after the now-playing fetch', async () => {
    render(<HomeContent />);
    await waitFor(() => {
      expect(screen.getByText('so what')).toBeInTheDocument();
      expect(screen.getByText('just played')).toBeInTheDocument();
    });
  });

  it('renders the currently section divider', () => {
    render(<HomeContent />);
    expect(screen.getByText('currently')).toBeInTheDocument();
  });
});
