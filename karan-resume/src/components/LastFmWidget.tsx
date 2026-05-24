import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { keyframes } from '@mui/system';
import { useLastFm } from '../hooks/CommonHooks';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

function LastFmWidget() {
  const track = useLastFm();

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <MusicNoteIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ textTransform: 'none', lineHeight: 1 }}
        >
          last.fm (real time)
        </Typography>
        {track?.isNowPlaying && (
          <Chip
            label="now playing"
            size="small"
            color="primary"
            sx={{
              ml: 'auto',
              fontSize: '0.7rem',
              animation: `${blink} 2s ease-in-out infinite`,
            }}
          />
        )}
      </Box>

      {track ? (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              src={track.imageUrl || undefined}
              alt={track.album || track.name}
              variant="rounded"
              sx={{ width: 64, height: 64, flexShrink: 0, bgcolor: 'action.selected' }}
            >
              <MusicNoteIcon />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Link
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="text.primary"
              >
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {track.name}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" noWrap>
                {track.artist}
              </Typography>
              {track.album && (
                <Typography
                  variant="caption"
                  color="text.disabled"
                  noWrap
                  sx={{ display: 'block' }}
                >
                  {track.album}
                </Typography>
              )}
              {!track.isNowPlaying && (
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: 'block', mt: 0.25 }}
                >
                  last played
                </Typography>
              )}
            </Box>
          </Box>

          {track.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
              {track.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          nothing playing right now
        </Typography>
      )}
    </Paper>
  );
}

export default LastFmWidget;
