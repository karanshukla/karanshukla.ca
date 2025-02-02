import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';
import { getRawGithubImageUrl } from '../helpers/CommonHelpers';

function HomeContent() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              sx={{
              p: 2,
              height: 250,
              position: 'relative',
              backgroundColor: '#0A192F',
              }}
            >
              <img
              src={getRawGithubImageUrl('karancover.jpg')}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              />
              <Paper
              sx={{
              position: 'absolute',
              bottom: -50,
              left: 24,
              width: 168,
              height: 168,
              borderRadius: '50%',
              border: '4px solid #0A192F  ',
              overflow: 'hidden',
              }}
              >
              <img
              src={getRawGithubImageUrl('karanprofile.jpg')}
              alt="Profile"
              style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
              }}
              />
              </Paper>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
              sx={{
                p: 2,
                pl: '200px',
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
      </Grid>
    </>
  );
}

export default HomeContent;