import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';

function HomeContent() {
  return (
    <>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              sx={{
                p: 2,
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" gutterBottom>
                Karan Shukla
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Software Engineer • Mechanical Engineer
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">
                Use the drawer on the left for navigation
              </Typography>
            </Paper>
          </Slide>
        </Grid>
    </>
  );
}

export default HomeContent;
