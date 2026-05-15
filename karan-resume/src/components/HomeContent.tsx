import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { RepoStats } from './ProjectCard';
import GitHubPulse from './GitHubPulse';
import LastFmWidget from './LastFmWidget';

function HomeContent() {
  return (
    <Box sx={{ width: '100%' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <Paper sx={{ p: 3, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
              variant="h3"
              color="text.primary"
              gutterBottom
              align="center"
              sx={{ typography: { xs: 'h5', sm: 'h4', md: 'h3' }, wordBreak: 'break-word' }}
            >
              software/mechanical engineer
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              gutterBottom
              align="center"
              sx={{ typography: { xs: 'h6', sm: 'h5', md: 'h4' }, wordBreak: 'break-word' }}
            >
              karan@karanshukla.ca
            </Typography>
          </Paper>

          <Box sx={{ mt: 2 }} />

          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" color="text.primary" align="center">
              hello! if you've made it here, it means you're interested in learning more about my
              experience and career! as this is a public website, my experience is kept vague
              intentionally, however, please feel free to reach out to me on linkedin or email!
              below are two of my personal projects that i'm most proud of. cheers!
            </Typography>
          </Paper>

          <Box sx={{ mt: 2 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  navyfragen
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  bluesky q&a messaging platform
                </Typography>
                <Typography variant="body1">
                  similar to ask.fm, curiouscat, or formspring, navyfragen is a q&a messaging
                  system built on top of bluesky's decentralized social graph. built upon node js
                  and react (mantine ui)
                </Typography>
                <RepoStats owner="karanshukla" repo="navyfragen-app" url="https://github.com/karanshukla/navyfragen-app" />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  openresto - table booking system for restaurants
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  foss booking system for restaurants as an alternative to cloud solutions
                </Typography>
                <Typography variant="body1">
                  a cloudless table booking system built with asp.net for speed and reliability,
                  with a react native frontend. dockerized for easy deployment. no cloud, no vendor
                  lock-in, just a simple solution for restaurants
                </Typography>
                <RepoStats owner="karanshukla" repo="openresto" url="https://github.com/karanshukla/openresto" />
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }} />

          <Divider sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ textTransform: 'none' }}>
              currently
            </Typography>
          </Divider>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <GitHubPulse />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <LastFmWidget />
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Box>
  );
}

export default HomeContent;
