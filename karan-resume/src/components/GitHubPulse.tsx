import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import pulseData from '../data/pulse.json';

function formatUTC(isoString: string): string {
  const d = new Date(isoString);
  const date = d.toLocaleDateString('en-CA', { timeZone: 'UTC' });
  const time = d.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${date} ${time} UTC`;
}

function GitHubPulse() {
  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <GitHubIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography
          variant="overline"
          sx={{ textTransform: 'none', lineHeight: 1, color: 'text.secondary' }}
        >
          github pulse (llm summarised)
        </Typography>
        <Chip
          label={`${pulseData.commitCount} commits`}
          size="small"
          variant="outlined"
          sx={{ ml: 'auto', fontSize: '0.7rem' }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontStyle: 'italic',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          color: 'text.primary',
        }}
      >
        "{pulseData.summary}"
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'text.secondary' }}>
        generated at {formatUTC(pulseData.generatedAt)}
      </Typography>
    </Paper>
  );
}

export default GitHubPulse;
