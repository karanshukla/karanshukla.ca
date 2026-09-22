import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { createTheme, Theme } from '@mui/material/styles';
import { materialSchemes } from '../constants/materialSchemes';

// --- GitHub API ---

interface GitHubRepo {
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export const useGitHubRepo = (owner: string, repo: string) => {
  const [data, setData] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [owner, repo]);

  return { data, loading };
};

// --- Keyboard shortcuts ---

export const navShortcuts: Record<string, string> = {
  '1': '/',
  '2': '/experience',
  '3': '/hobbies',
  '4': '/blog',
  '5': '/asher-zone',
};

export const useKeyboardShortcuts = (): void => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

      const route = navShortcuts[e.key];
      if (route !== undefined) {
        e.preventDefault();
        navigate(route);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);
};

// --- Page title ---

export const usePageTitle = (title: string): void => {
  useEffect(() => {
    const base = 'karan shukla';
    document.title = title ? `${title} | ${base}` : base;
    return () => {
      document.title = base;
    };
  }, [title]);
};

// --- Theme ---

export const useAppTheme = (): { theme: Theme; toggleTheme: () => void; isDark: boolean } => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
  );

  const toggleTheme = (): void => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem('theme', next);
  };

  const theme = useMemo(() => {
    const colors = materialSchemes[mode];
    return createTheme({
      palette: {
        mode,
        primary: { main: colors.primary, contrastText: colors.onPrimary },
        secondary: { main: colors.secondary },
        error: { main: colors.error },
        background: { default: colors.surface, paper: colors.surfaceContainer },
        text: { primary: colors.onSurface, secondary: colors.onSurfaceVariant },
        divider: colors.outlineVariant,
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h3: { fontWeight: 400 },
        h4: { fontWeight: 400 },
        h5: { fontWeight: 400 },
        h6: { fontWeight: 500 },
        button: { textTransform: 'none', fontWeight: 500 },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiPaper: {
          defaultProps: { elevation: 0 },
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
        MuiAppBar: {
          defaultProps: { elevation: 0 },
          styleOverrides: {
            root: {
              backgroundColor: colors.surface,
              color: colors.onSurface,
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: colors.surfaceContainerLow,
              borderRight: 'none',
            },
            modal: {
              '& .MuiDrawer-paper': { borderRadius: '0 16px 16px 0' },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            sizeMedium: { padding: 12 },
          },
        },
        MuiListItemButton: {
          styleOverrides: {
            root: {
              borderRadius: 28,
              margin: '2px 12px',
              width: 'calc(100% - 24px)',
              '&.active, &[aria-current="page"]': {
                backgroundColor: colors.secondaryContainer,
                color: colors.onSecondaryContainer,
                '& .MuiListItemIcon-root': { color: colors.onSecondaryContainer },
              },
              '&.active:hover, &[aria-current="page"]:hover': {
                backgroundColor: colors.secondaryContainer,
              },
            },
          },
        },
        MuiListItemIcon: {
          styleOverrides: {
            root: { minWidth: 40, color: colors.onSurfaceVariant },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: { borderColor: colors.outlineVariant },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: { borderRadius: 8, fontWeight: 500 },
            outlined: { borderColor: colors.outline },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: { borderRadius: 20 },
          },
        },
        MuiFab: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              backgroundColor: colors.primaryContainer,
              color: colors.onPrimaryContainer,
              boxShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)',
              '&:hover': { backgroundColor: colors.primaryContainer },
            },
          },
        },
      },
    });
  }, [mode]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.palette.background.default);
  }, [theme]);

  return { theme, toggleTheme, isDark: mode === 'dark' };
};

// --- Last.fm ---

const LASTFM_USER = 'nightrunner_ks';
const LASTFM_API_KEY = '4f3d78ce29dde05263e60e9e32a20eff';
const LASTFM_POLL_MS = 30_000;

export interface LastFmTrack {
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  isNowPlaying: boolean;
  url: string;
  tags: string[];
}

type RawTrack = {
  name: string;
  artist: { '#text': string };
  album: { '#text': string };
  image: Array<{ '#text': string; size: string }>;
  url: string;
  '@attr'?: { nowplaying: string };
  date?: { uts: string };
};

export const useLastFm = (): LastFmTrack | null => {
  const [track, setTrack] = useState<LastFmTrack | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
        );
        const data = (await res.json()) as {
          recenttracks?: { track: RawTrack[] | RawTrack };
        };

        const tracks = data.recenttracks?.track;
        if (!tracks) return;

        const t = Array.isArray(tracks) ? tracks[0] : tracks;
        const imageUrl =
          t.image.find((i) => i.size === 'extralarge')?.['#text'] ||
          t.image.find((i) => i.size === 'large')?.['#text'] ||
          t.image.find((i) => i.size === 'medium')?.['#text'] ||
          '';

        // Fetch top tags: try track first, fall back to artist (artist tags are more populated)
        let tags: string[] = [];
        try {
          const artistEncoded = encodeURIComponent(t.artist['#text']);
          const trackEncoded = encodeURIComponent(t.name);
          const base = `https://ws.audioscrobbler.com/2.0/?api_key=${LASTFM_API_KEY}&format=json&autocorrect=1`;

          const tagRes = await fetch(
            `${base}&method=track.getTopTags&artist=${artistEncoded}&track=${trackEncoded}`,
          );
          const tagData = (await tagRes.json()) as {
            toptags?: { tag: Array<{ name: string; count: number }> };
          };
          tags = (tagData.toptags?.tag ?? [])
            .slice(0, 3)
            .map((tag) => tag.name.toLowerCase())
            .filter((name) => name.length > 0);

          if (tags.length === 0) {
            const artistTagRes = await fetch(
              `${base}&method=artist.getTopTags&artist=${artistEncoded}`,
            );
            const artistTagData = (await artistTagRes.json()) as {
              toptags?: { tag: Array<{ name: string; count: number }> };
            };
            tags = (artistTagData.toptags?.tag ?? [])
              .slice(0, 3)
              .map((tag) => tag.name.toLowerCase())
              .filter((name) => name.length > 0);
          }
        } catch {
          // tags are non-critical
        }

        setTrack({
          name: t.name,
          artist: t.artist['#text'],
          album: t.album['#text'],
          imageUrl,
          isNowPlaying: t['@attr']?.nowplaying === 'true',
          url: t.url,
          tags,
        });
      } catch {
        // silently fail — Last.fm is non-critical
      }
    };

    void fetchTrack();
    const interval = setInterval(() => void fetchTrack(), LASTFM_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  return track;
};
