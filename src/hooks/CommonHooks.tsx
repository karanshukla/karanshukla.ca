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
  '5': '/vinopilot',
  '6': '/asher-zone',
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

type ThemeMode = 'light' | 'dark';

const LIGHT_SCHEME_QUERY = '(prefers-color-scheme: light)';

const savedThemeMode = (): ThemeMode | null => {
  const saved = localStorage.getItem('theme');
  return saved === 'light' || saved === 'dark' ? saved : null;
};

const useDeviceThemeMode = (): ThemeMode => {
  const [mode, setMode] = useState<ThemeMode>(() =>
    window.matchMedia?.(LIGHT_SCHEME_QUERY).matches ? 'light' : 'dark',
  );

  useEffect(() => {
    const query = window.matchMedia?.(LIGHT_SCHEME_QUERY);
    if (!query) return;
    const onChange = (event: MediaQueryListEvent): void =>
      setMode(event.matches ? 'light' : 'dark');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return mode;
};

export const useAppTheme = (): { theme: Theme; toggleTheme: () => void; isDark: boolean } => {
  const deviceMode = useDeviceThemeMode();
  const [savedMode, setSavedMode] = useState<ThemeMode | null>(savedThemeMode);
  const mode = savedMode ?? deviceMode;

  const toggleTheme = (): void => {
    const next = mode === 'dark' ? 'light' : 'dark';
    setSavedMode(next);
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

// --- ListenBrainz ---

const LISTENBRAINZ_USER = 'nightrunner_ks';
const LISTENBRAINZ_API = 'https://api.listenbrainz.org/1';
const LISTENBRAINZ_POLL_MS = 30_000;
const MAX_TAGS = 3;

export interface NowPlayingTrack {
  name: string;
  artist: string;
  album: string;
  imageUrl: string;
  isNowPlaying: boolean;
  url: string;
  tags: string[];
}

interface Listen {
  track_metadata: {
    artist_name: string;
    track_name: string;
    release_name?: string;
    additional_info?: { origin_url?: string };
  };
}

interface ListensResponse {
  payload?: { listens?: Listen[] };
}

interface WeightedTag {
  tag: string;
  count: number;
}

interface TrackLookup {
  recording_mbid?: string;
  release_name?: string;
  metadata?: {
    release?: { caa_id?: number | null; caa_release_mbid?: string | null };
    tag?: { recording?: WeightedTag[]; artist?: WeightedTag[]; release_group?: WeightedTag[] };
  };
}

interface TrackDetails {
  imageUrl: string;
  url: string;
  album: string;
  tags: string[];
}

const fetchFirstListen = async (path: string): Promise<Listen | undefined> => {
  const res = await fetch(`${LISTENBRAINZ_API}/user/${LISTENBRAINZ_USER}/${path}`);
  const data = (await res.json()) as ListensResponse;
  return data.payload?.listens?.[0];
};

const topTags = (metadata: TrackLookup['metadata']): string[] => {
  const tag = metadata?.tag;
  const candidates = [tag?.recording, tag?.artist, tag?.release_group];
  const best = candidates.find((group) => group && group.length > 0) ?? [];
  return [...best]
    .sort((a, b) => b.count - a.count)
    .map((t) => t.tag.toLowerCase())
    .filter((name, i, all) => name.length > 0 && all.indexOf(name) === i)
    .slice(0, MAX_TAGS);
};

const coverArtUrl = (lookup: TrackLookup): string => {
  const release = lookup.metadata?.release;
  if (!release?.caa_id || !release.caa_release_mbid) return '';
  return `https://coverartarchive.org/release/${release.caa_release_mbid}/${release.caa_id}-250.jpg`;
};

const profileUrl = `https://listenbrainz.org/user/${LISTENBRAINZ_USER}/`;

const lookUpTrackDetails = async (listen: Listen): Promise<TrackDetails> => {
  const { artist_name, track_name, release_name, additional_info } = listen.track_metadata;
  const fallback: TrackDetails = {
    imageUrl: '',
    url: additional_info?.origin_url ?? profileUrl,
    album: release_name ?? '',
    tags: [],
  };
  try {
    const params = new URLSearchParams({
      artist_name,
      recording_name: track_name,
      metadata: 'true',
      inc: 'tag release',
    });
    if (release_name) params.set('release_name', release_name);
    const res = await fetch(`${LISTENBRAINZ_API}/metadata/lookup/?${params.toString()}`);
    const lookup = (await res.json()) as TrackLookup;
    return {
      imageUrl: coverArtUrl(lookup),
      url: lookup.recording_mbid
        ? `https://musicbrainz.org/recording/${lookup.recording_mbid}`
        : fallback.url,
      album: fallback.album || (lookup.release_name ?? ''),
      tags: topTags(lookup.metadata),
    };
  } catch {
    return fallback;
  }
};

export const useListenBrainz = (): NowPlayingTrack | null => {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);

  useEffect(() => {
    const detailsByTrack = new Map<string, TrackDetails>();

    const fetchTrack = async () => {
      try {
        const playing = await fetchFirstListen('playing-now');
        const listen = playing ?? (await fetchFirstListen('listens?count=1'));
        if (!listen) return;

        const { artist_name, track_name } = listen.track_metadata;
        const key = `${artist_name}\u0000${track_name}`;
        let details = detailsByTrack.get(key);
        if (!details) {
          details = await lookUpTrackDetails(listen);
          detailsByTrack.set(key, details);
        }

        setTrack({
          name: track_name,
          artist: artist_name,
          isNowPlaying: Boolean(playing),
          ...details,
        });
      } catch {
        // non-critical display widget
      }
    };

    void fetchTrack();
    const interval = setInterval(() => void fetchTrack(), LISTENBRAINZ_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  return track;
};
