import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';

function ExperienceContent() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                minHeight: 240,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Software Developer - Loopio
              </Typography>
              <Typography variant="body1">
                • Cats are great
                • Dogs are also great
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                minHeight: 240,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Skills Highlights
              </Typography>
              <Typography variant="body2">
                • React/TypeScript
                • Node.js
                • Cloud Technologies
                • CI/CD
                • Agile Methodologies
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>
                Previous Experience
              </Typography>
              <Typography variant="body1">
                Software Developer - Loopio
              </Typography>
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </>
  );
}

export default ExperienceContent