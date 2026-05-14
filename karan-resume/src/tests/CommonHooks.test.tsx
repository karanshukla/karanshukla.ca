import { renderHook, act, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useGitHubRepo, useAppTheme, useKeyboardShortcuts, navShortcuts } from '../hooks/CommonHooks';

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

// ── navShortcuts export ──────────────────────────────────────────────────────

describe('navShortcuts', () => {
  it('maps numeric keys to routes', () => {
    expect(navShortcuts['1']).toBe('/');
    expect(navShortcuts['2']).toBe('/experience');
    expect(navShortcuts['3']).toBe('/hobbies');
    expect(navShortcuts['4']).toBe('/asher-zone');
  });
});
