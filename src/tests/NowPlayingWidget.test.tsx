import { render, screen, waitFor } from '@testing-library/react';
import NowPlayingWidget from '../components/NowPlayingWidget';

const nowPlayingFile = {
  videoId: 'abc',
  title: 'so what',
  artist: 'miles davis',
  album: 'kind of blue',
  imageUrl: '',
  url: 'https://music.youtube.com/watch?v=abc',
  played: 'yesterday',
  tags: ['jazz', 'fusion'],
  firstSeenAt: '2026-01-01T00:00:00Z',
};

const stubFile = (file: Partial<typeof nowPlayingFile>) =>
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ...nowPlayingFile, ...file }) }),
  );

afterEach(() => vi.unstubAllGlobals());

describe('NowPlayingWidget', () => {
  it('renders the youtube music label', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})),
    );
    render(<NowPlayingWidget />);
    expect(screen.getByText('youtube music')).toBeInTheDocument();
  });

  it('shows fallback text before fetch resolves', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})),
    );
    render(<NowPlayingWidget />);
    expect(screen.getByText('nothing played recently')).toBeInTheDocument();
  });

  it('shows track name, artist and album', async () => {
    stubFile({});
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('so what')).toBeInTheDocument());
    expect(screen.getByText('miles davis')).toBeInTheDocument();
    expect(screen.getByText('kind of blue')).toBeInTheDocument();
  });

  it('shows when it was last played for an older track', async () => {
    stubFile({});
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('last played yesterday')).toBeInTheDocument());
    expect(screen.queryByText('just played')).not.toBeInTheDocument();
  });

  it('shows the just played chip for a track seen in the last few minutes', async () => {
    stubFile({ firstSeenAt: new Date().toISOString() });
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('just played')).toBeInTheDocument());
    expect(screen.queryByText(/last played/)).not.toBeInTheDocument();
  });

  it('renders genre tag chips', async () => {
    stubFile({});
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('jazz')).toBeInTheDocument());
    expect(screen.getByText('fusion')).toBeInTheDocument();
  });

  it('shows fallback when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<NowPlayingWidget />);
    await waitFor(() => expect(screen.getByText('nothing played recently')).toBeInTheDocument());
  });

  it('track name links to the song on youtube music', async () => {
    stubFile({});
    render(<NowPlayingWidget />);
    await waitFor(() => {
      const link = screen.getByRole('link', { name: /so what by miles davis on youtube music/i });
      expect(link).toHaveAttribute('href', 'https://music.youtube.com/watch?v=abc');
    });
  });
});
