import { render, screen, waitFor } from '@testing-library/react';
import LastFmWidget from '../components/LastFmWidget';

const mockTags = { toptags: { tag: [{ name: 'jazz', count: 100 }, { name: 'fusion', count: 50 }] } };

const makeResponse = (nowPlaying: boolean) => ({
  recenttracks: {
    track: [
      {
        name: 'so what',
        artist: { '#text': 'miles davis' },
        album: { '#text': 'kind of blue' },
        image: [{ '#text': 'https://example.com/art.jpg', size: 'large' }],
        url: 'https://www.last.fm/music/miles+davis/_/so+what',
        ...(nowPlaying
          ? { '@attr': { nowplaying: 'true' } }
          : { date: { uts: '1234567890', '#text': '14 May 2026, 12:00' } }),
      },
    ],
  },
});

const stubFetch = (nowPlaying: boolean) =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('getTopTags')) {
        return Promise.resolve({ json: () => Promise.resolve(mockTags) });
      }
      return Promise.resolve({ json: () => Promise.resolve(makeResponse(nowPlaying)) });
    }),
  );

afterEach(() => vi.unstubAllGlobals());

describe('LastFmWidget', () => {
  it('renders the last.fm label', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
    render(<LastFmWidget />);
    expect(screen.getByText('last.fm')).toBeInTheDocument();
  });

  it('shows fallback text before fetch resolves', () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(() => {})));
    render(<LastFmWidget />);
    expect(screen.getByText('nothing playing right now')).toBeInTheDocument();
  });

  it('shows track name and artist when now playing', async () => {
    stubFetch(true);
    render(<LastFmWidget />);
    await waitFor(() => expect(screen.getByText('so what')).toBeInTheDocument());
    expect(screen.getByText('miles davis')).toBeInTheDocument();
    expect(screen.getByText('kind of blue')).toBeInTheDocument();
  });

  it('shows the now playing chip when live', async () => {
    stubFetch(true);
    render(<LastFmWidget />);
    await waitFor(() => expect(screen.getByText('now playing')).toBeInTheDocument());
  });

  it('shows last played label when not live', async () => {
    stubFetch(false);
    render(<LastFmWidget />);
    await waitFor(() => expect(screen.getByText('last played')).toBeInTheDocument());
  });

  it('renders genre tag chips', async () => {
    stubFetch(true);
    render(<LastFmWidget />);
    await waitFor(() => expect(screen.getByText('jazz')).toBeInTheDocument());
    expect(screen.getByText('fusion')).toBeInTheDocument();
  });

  it('shows fallback when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<LastFmWidget />);
    await waitFor(() =>
      expect(screen.getByText('nothing playing right now')).toBeInTheDocument(),
    );
  });

  it('track name is a link to last.fm', async () => {
    stubFetch(true);
    render(<LastFmWidget />);
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /so what/i });
      expect(link).toHaveAttribute('href', 'https://www.last.fm/music/miles+davis/_/so+what');
    });
  });
});
