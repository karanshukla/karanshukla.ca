import { render, screen, waitFor } from '@testing-library/react';
import NowPlayingWidget from '../components/NowPlayingWidget';

const listen = {
  track_metadata: {
    artist_name: 'miles davis',
    track_name: 'so what',
    release_name: 'kind of blue',
  },
};

const lookup = {
  recording_mbid: 'rec-1',
  metadata: {
    release: { caa_id: 42, caa_release_mbid: 'rel-1' },
    tag: {
      recording: [
        { tag: 'jazz', count: 10 },
        { tag: 'fusion', count: 5 },
      ],
    },
  },
};

const json = (body: unknown) => Promise.resolve({ json: () => Promise.resolve(body) });

const stubFetch = (playingNow: boolean) =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('/metadata/lookup')) return json(lookup);
      if (url.includes('/playing-now'))
        return json({ payload: { listens: playingNow ? [listen] : [] } });
      return json({ payload: { listens: [listen] } });
    }),
  );

afterEach(() => vi.unstubAllGlobals());

describe('NowPlayingWidget', () => {
  it('renders the listenbrainz label', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})),
    );
    render(<NowPlayingWidget />);
    expect(screen.getByText('listenbrainz (real time)')).toBeInTheDocument();
  });

  it('shows fallback text before fetch resolves', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})),
    );
    render(<NowPlayingWidget />);
    expect(screen.getByText('nothing playing right now')).toBeInTheDocument();
  });

  it('shows track name, artist and album when now playing', async () => {
    stubFetch(true);
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('so what')).toBeInTheDocument());
    expect(screen.getByText('miles davis')).toBeInTheDocument();
    expect(screen.getByText('kind of blue')).toBeInTheDocument();
    expect(screen.getByText('now playing')).toBeInTheDocument();
  });

  it('shows last played label when not live', async () => {
    stubFetch(false);
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('last played')).toBeInTheDocument());
  });

  it('renders genre tag chips', async () => {
    stubFetch(true);
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('jazz')).toBeInTheDocument());
    expect(screen.getByText('fusion')).toBeInTheDocument();
  });

  it('shows fallback when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('nothing playing right now')).toBeInTheDocument());
  });

  it('track name links to the musicbrainz recording', async () => {
    stubFetch(true);
    render(<NowPlayingWidget />);
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /so what by miles davis/i });
      expect(link).toHaveAttribute('href', 'https://musicbrainz.org/recording/rec-1');
    });
  });
});
