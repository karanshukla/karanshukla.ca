import { renderHook, act, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import {
  useGitHubRepo,
  useAppTheme,
  useKeyboardShortcuts,
  useYouTubeMusic,
  toNowPlayingTrack,
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

// ── useYouTubeMusic ──────────────────────────────────────────────────────────

const nowPlayingFile = {
  videoId: 'abc',
  title: 'so what',
  artist: 'miles davis',
  album: 'kind of blue',
  imageUrl: 'https://lh3.googleusercontent.com/art=w240-h240',
  url: 'https://music.youtube.com/watch?v=abc',
  played: 'today',
  tags: ['jazz'],
  firstSeenAt: '2026-11-19T10:00:00Z',
};

const firstSeen = Date.parse(nowPlayingFile.firstSeenAt);

describe('toNowPlayingTrack', () => {
  it('maps the published file onto the widget track', () => {
    expect(toNowPlayingTrack(nowPlayingFile, firstSeen)).toEqual({
      name: 'so what',
      artist: 'miles davis',
      album: 'kind of blue',
      imageUrl: 'https://lh3.googleusercontent.com/art=w240-h240',
      url: 'https://music.youtube.com/watch?v=abc',
      tags: ['jazz'],
      playedLabel: 'today',
      isJustPlayed: true,
    });
  });

  it('counts a track as just played for an hour after it was first seen', () => {
    expect(toNowPlayingTrack(nowPlayingFile, firstSeen + 59 * 60_000).isJustPlayed).toBe(true);
    expect(toNowPlayingTrack(nowPlayingFile, firstSeen + 60 * 60_000).isJustPlayed).toBe(false);
  });
});

describe('useYouTubeMusic', () => {
  afterEach(() => vi.unstubAllGlobals());

  const stubFile = (body: unknown) => {
    const fetchMock = vi.fn().mockResolvedValue({ json: () => Promise.resolve(body) });
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  };

  it('returns null initially', () => {
    stubFile(nowPlayingFile);
    const { result } = renderHook(() => useYouTubeMusic());
    expect(result.current).toBeNull();
  });

  it('returns the published track from the now-playing branch', async () => {
    const fetchMock = stubFile(nowPlayingFile);
    const { result } = renderHook(() => useYouTubeMusic());
    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current?.name).toBe('so what');
    expect(result.current?.playedLabel).toBe('today');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/now-playing/now-playing.json',
      { cache: 'no-cache' },
    );
  });

  it('stays null when the file has no track', async () => {
    stubFile({});
    const { result } = renderHook(() => useYouTubeMusic());
    await new Promise((r) => setTimeout(r, 50));
    expect(result.current).toBeNull();
  });

  it('stays null when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const { result } = renderHook(() => useYouTubeMusic());
    await new Promise((r) => setTimeout(r, 50));
    expect(result.current).toBeNull();
  });

  it('clears the polling interval on unmount', () => {
    stubFile(nowPlayingFile);
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useYouTubeMusic());
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
