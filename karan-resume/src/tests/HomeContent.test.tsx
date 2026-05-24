import { render, screen, waitFor } from '@testing-library/react';
import HomeContent from '../components/HomeContent';

const mockRepoData = {
  html_url: 'https://github.com/karanshukla/test',
  stargazers_count: 6,
  forks_count: 0,
  language: 'TypeScript',
  updated_at: '2026-01-01T00:00:00Z',
};

const mockLastFmResponse = {
  recenttracks: {
    track: [
      {
        name: 'so what',
        artist: { '#text': 'miles davis' },
        album: { '#text': 'kind of blue' },
        image: [{ '#text': '', size: 'large' }],
        url: 'https://last.fm/track',
        '@attr': { nowplaying: 'true' },
      },
    ],
  },
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('audioscrobbler')) {
        return Promise.resolve({ json: () => Promise.resolve(mockLastFmResponse) });
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
    expect(screen.getByText('navyfragen')).toBeInTheDocument();
    expect(screen.getByText('sportsbook-meow')).toBeInTheDocument();
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

  it('renders the github pulse section', () => {
    render(<HomeContent />);
    expect(screen.getByText('github pulse (llm summarised)')).toBeInTheDocument();
  });

  it('renders the last.fm widget', () => {
    render(<HomeContent />);
    expect(screen.getByText('last.fm (real time)')).toBeInTheDocument();
  });

  it('shows now playing track after last.fm fetch', async () => {
    render(<HomeContent />);
    await waitFor(() => {
      expect(screen.getByText('so what')).toBeInTheDocument();
      expect(screen.getByText('now playing')).toBeInTheDocument();
    });
  });

  it('renders the currently section divider', () => {
    render(<HomeContent />);
    expect(screen.getByText('currently')).toBeInTheDocument();
  });
});
