import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import pulseData from '../data/pulse.json';

function timeAgo(isoString: string): string {
  const days = Math.floor((Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function GitHubPulse() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <GitHubIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ textTransform: 'none', lineHeight: 1 }}
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
      <Typography variant="body1" color="text.primary" sx={{ fontStyle: 'italic' }}>
        "{pulseData.summary}"
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
        generated {timeAgo(pulseData.generatedAt)}
      </Typography>
    </Paper>
  );
}

export default GitHubPulse;
