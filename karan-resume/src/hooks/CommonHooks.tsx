import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, Theme, alpha } from '@mui/material/styles';

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
  '4': '/musings',
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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#5c8ee8' : '#1565c0',
            light: mode === 'dark' ? '#82aaff' : '#5e92f3',
            dark: mode === 'dark' ? '#3a6bc7' : '#003c8f',
            contrastText: '#ffffff',
          },
          secondary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          background: {
            default: mode === 'dark' ? '#0d1117' : '#f0f4f8',
            paper: mode === 'dark' ? '#161b22' : '#ffffff',
          },
          text: {
            primary: mode === 'dark' ? '#e6edf3' : '#1a1a2e',
            secondary: mode === 'dark' ? '#8b949e' : '#4a5568',
            disabled: mode === 'dark' ? '#6e7681' : '#9ca3af',
          },
          divider: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 10,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundImage: 'none',
                ...(theme.palette.mode === 'light' && {
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.07)',
                }),
              }),
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: ({ theme }) => ({
                backgroundImage: 'none',
                ...(theme.palette.mode === 'light'
                  ? {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      boxShadow: '0 1px 8px rgba(0,0,0,0.15)',
                    }
                  : {
                      backgroundColor: '#161b22',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: 'none',
                    }),
              }),
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: ({ theme }) => ({
                backgroundImage: 'none',
                ...(theme.palette.mode === 'light'
                  ? {
                      backgroundColor: '#ffffff',
                      borderRight: '1px solid rgba(0,0,0,0.1)',
                    }
                  : {
                      backgroundColor: '#161b22',
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                    }),
              }),
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: ({ theme }) => ({
                borderRadius: 8,
                margin: '2px 8px',
                width: 'calc(100% - 16px)',
                '&.active, &[aria-current="page"]': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? alpha(theme.palette.primary.main, 0.12)
                      : alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.primary.main,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                },
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? alpha(theme.palette.primary.main, 0.08)
                      : alpha(theme.palette.primary.main, 0.12),
                },
              }),
            },
          },
          MuiListItemIcon: {
            styleOverrides: {
              root: {
                minWidth: 40,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
            },
          },
          MuiFab: {
            styleOverrides: {
              root: ({ theme }) => ({
                ...(theme.palette.mode === 'light' && {
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                }),
              }),
            },
          },
        },
      }),
    [mode],
  );

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
