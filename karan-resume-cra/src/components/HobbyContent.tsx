import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';

function HobbyContent() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
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
                Fitness & Gym
              </Typography>
              <Typography variant="body1">
                Passionate about maintaining a healthy lifestyle through regular workouts and strength training.
                Focused on continuous improvement and achieving personal fitness goals.
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
                Mechanical Keyboards
              </Typography>
              <Typography variant="body1">
                Enthusiast in custom mechanical keyboards. Enjoy building, modding, and exploring different
                switch types and keycap designs.
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <Typography variant="h5" gutterBottom>
                Technology
              </Typography>
              <Typography variant="body1">
                Keep up with latest tech trends and innovations. Enjoy exploring new programming languages,
                frameworks, and tools in software development.
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <Typography variant="h5" gutterBottom>
                Music
              </Typography>
              <Typography variant="body1">
                Music enthusiast with diverse taste. Enjoy discovering new genres and artists,
                and creating playlists for different moods and occasions.
              </Typography>
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </>
  );
}

export default HobbyContent;