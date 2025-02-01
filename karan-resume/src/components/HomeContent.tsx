import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';

function HomeContent() {
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
                height: 240,
              }}
            >
              <Typography variant="h2" gutterBottom>
                Karan Shukla
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
                height: 240,
              }}
            >
              This is some filler 2 text for the second paper component.
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              This is some filler 3 text for the third paper component.
            </Paper>
          </Slide>
        </Grid>
      </Grid></>
  );
}

export default HomeContent;