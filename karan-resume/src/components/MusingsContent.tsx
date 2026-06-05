import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import { usePageTitle } from '../hooks/CommonHooks';
import musings from '../data/musings';

function MusingsContent() {
  usePageTitle('musings');
  return (
    <Grid container spacing={3}>
      {musings.map((musing) => (
        <Grid key={musing.id} size={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 3 }}>
              <Typography component="h2" variant="h6" gutterBottom>
                {musing.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                {musing.date}
              </Typography>
              <Typography variant="body2">{musing.body}</Typography>
            </Paper>
          </Slide>
        </Grid>
      ))}
    </Grid>
  );
}

export default MusingsContent;
