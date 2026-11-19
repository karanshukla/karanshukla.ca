import { renderHook, act, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import {
  useGitHubRepo,
  useAppTheme,
  useKeyboardShortcuts,
  useListenBrainz,
  navShortcuts,
} from '../hooks/CommonHooks';

// ── useGitHubRepo ────────────────────────────────────────────────────────────

describe('useGitHubRepo', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('starts in loading state', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({}) }));
    const { result } = renderHook(() => useGitHubRepo('o', 'r'));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('returns data after successful fetch', async () => {
    const mockData = { stargazers_count: 5, language: 'TypeScript' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) }));
    const { result } = renderHook(() => useGitHubRepo('o', 'r'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData);
  });

  it('returns null data and loading=false on fetch error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fail')));
    const { result } = renderHook(() => useGitHubRepo('o', 'r'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
  });
});

// ── useAppTheme ──────────────────────────────────────────────────────────────

describe('useAppTheme', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  const stubDeviceScheme = (light: boolean) => {
    let notify: (event: { matches: boolean }) => void = () => {};
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: light,
        addEventListener: (_type: string, listener: typeof notify) => (notify = listener),
        removeEventListener: vi.fn(),
      })),
    );
    return (matches: boolean) => act(() => notify({ matches }));
  };

  it('defaults to dark mode', () => {
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(true);
  });

  it('reads light mode from localStorage', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(false);
  });

  it('toggles from dark to light and persists to localStorage', () => {
    const { result } = renderHook(() => useAppTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.isDark).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('toggles from light to dark', () => {
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useAppTheme());
    act(() => result.current.toggleTheme());
    expect(result.current.isDark).toBe(true);
  });

  it('returns a theme object', () => {
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.theme).toBeDefined();
    expect(result.current.theme.palette).toBeDefined();
  });

  it('follows a light device preference when nothing is saved', () => {
    stubDeviceScheme(true);
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(false);
  });

  it('follows a dark device preference when nothing is saved', () => {
    stubDeviceScheme(false);
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(true);
  });

  it('prefers the saved choice over the device preference', () => {
    stubDeviceScheme(true);
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(true);
  });

  it('ignores an unrecognised saved value', () => {
    stubDeviceScheme(true);
    localStorage.setItem('theme', 'purple');
    const { result } = renderHook(() => useAppTheme());
    expect(result.current.isDark).toBe(false);
  });

  it('switches when the device preference changes and nothing is saved', () => {
    const changeDevice = stubDeviceScheme(false);
    const { result } = renderHook(() => useAppTheme());
    changeDevice(true);
    expect(result.current.isDark).toBe(false);
  });

  it('keeps the saved choice when the device preference changes', () => {
    const changeDevice = stubDeviceScheme(false);
    const { result } = renderHook(() => useAppTheme());
    act(() => result.current.toggleTheme());
    changeDevice(false);
    expect(result.current.isDark).toBe(false);
  });
});

// ── useKeyboardShortcuts ─────────────────────────────────────────────────────

describe('useKeyboardShortcuts', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  it('navigates when a shortcut key is pressed', () => {
    renderHook(() => useKeyboardShortcuts(), { wrapper });
    fireEvent.keyDown(window, { key: '1' });
  });

  it('does nothing when a modifier key is held', () => {
    renderHook(() => useKeyboardShortcuts(), { wrapper });
    fireEvent.keyDown(window, { key: '1', ctrlKey: true });
  });

  it('does nothing when key is not a shortcut', () => {
    renderHook(() => useKeyboardShortcuts(), { wrapper });
    fireEvent.keyDown(window, { key: 'z' });
  });

  it('does nothing when target is an input', () => {
    renderHook(() => useKeyboardShortcuts(), { wrapper });
    const input = document.createElement('input');
    document.body.appendChild(input);
    fireEvent.keyDown(input, { key: '1' });
    document.body.removeChild(input);
  });

  it('does nothing when target is a textarea', () => {
    renderHook(() => useKeyboardShortcuts(), { wrapper });
    const ta = document.createElement('textarea');
    document.body.appendChild(ta);
    fireEvent.keyDown(ta, { key: '1' });
    document.body.removeChild(ta);
  });

  it('removes event listener on unmount', () => {
    const { unmount } = renderHook(() => useKeyboardShortcuts(), { wrapper });
    unmount();
  });
});

// ── useListenBrainz ──────────────────────────────────────────────────────────

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
        { tag: 'Fusion', count: 5 },
        { tag: 'Jazz', count: 10 },
      ],
      artist: [{ tag: 'bebop', count: 99 }],
    },
  },
};

const json = (body: unknown) => Promise.resolve({ json: () => Promise.resolve(body) });

const stubListenBrainz = ({
  playingNow,
  recent = [listen],
  lookupBody = lookup,
}: {
  playingNow: boolean;
  recent?: unknown[];
  lookupBody?: unknown;
}) => {
  const fetchMock = vi.fn().mockImplementation((url: string) => {
    if (url.includes('/playing-now')) {
      return json({ payload: { listens: playingNow ? [listen] : [] } });
    }
    if (url.includes('/listens')) return json({ payload: { listens: recent } });
    if (url.includes('/metadata/lookup')) return json(lookupBody);
    return json({});
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

describe('useListenBrainz', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns null initially', () => {
    stubListenBrainz({ playingNow: true });
    const { result } = renderHook(() => useListenBrainz());
    expect(result.current).toBeNull();
  });

  it('returns the playing-now track with cover art, link and top tags', async () => {
    stubListenBrainz({ playingNow: true });
    const { result } = renderHook(() => useListenBrainz());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current).toEqual({
      name: 'so what',
      artist: 'miles davis',
      album: 'kind of blue',
      isNowPlaying: true,
      imageUrl: 'https://coverartarchive.org/release/rel-1/42-250.jpg',
      url: 'https://musicbrainz.org/recording/rec-1',
      tags: ['jazz', 'fusion'],
    });
  });

  it('falls back to the most recent listen when nothing is playing', async () => {
    const fetchMock = stubListenBrainz({ playingNow: false });
    const { result } = renderHook(() => useListenBrainz());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current?.isNowPlaying).toBe(false);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/listens?count=1'));
  });

  it('uses artist tags when the recording has none', async () => {
    stubListenBrainz({
      playingNow: true,
      lookupBody: { metadata: { tag: { recording: [], artist: [{ tag: 'Bebop', count: 3 }] } } },
    });
    const { result } = renderHook(() => useListenBrainz());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current?.tags).toEqual(['bebop']);
  });

  it('keeps the track when the metadata lookup fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockImplementation((url: string) =>
          url.includes('/metadata/lookup')
            ? Promise.reject(new Error('down'))
            : json({ payload: { listens: [listen] } }),
        ),
    );
    const { result } = renderHook(() => useListenBrainz());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current?.imageUrl).toBe('');
    expect(result.current?.tags).toEqual([]);
    expect(result.current?.url).toBe('https://listenbrainz.org/user/nightrunner_ks/');
  });

  it('stays null when there are no listens', async () => {
    stubListenBrainz({ playingNow: false, recent: [] });
    const { result } = renderHook(() => useListenBrainz());
    await new Promise((r) => setTimeout(r, 50));
    expect(result.current).toBeNull();
  });

  it('stays null when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const { result } = renderHook(() => useListenBrainz());
    await new Promise((r) => setTimeout(r, 50));
    expect(result.current).toBeNull();
  });

  it('looks up metadata once per track across polls', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const fetchMock = stubListenBrainz({ playingNow: true });
    const { result } = renderHook(() => useListenBrainz());
    await waitFor(() => expect(result.current).not.toBeNull());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });
    const lookups = fetchMock.mock.calls.filter(([url]) =>
      (url as string).includes('/metadata/lookup'),
    );
    expect(lookups).toHaveLength(1);
    vi.useRealTimers();
  });

  it('clears the polling interval on unmount', () => {
    stubListenBrainz({ playingNow: true });
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useListenBrainz());
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});

// ── navShortcuts export ──────────────────────────────────────────────────────

describe('navShortcuts', () => {
  it('maps numeric keys to routes', () => {
    expect(navShortcuts['1']).toBe('/');
    expect(navShortcuts['2']).toBe('/experience');
    expect(navShortcuts['3']).toBe('/hobbies');
    expect(navShortcuts['4']).toBe('/blog');
    expect(navShortcuts['5']).toBe('/vinopilot');
    expect(navShortcuts['6']).toBe('/asher-zone');
  });
});
