import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { RepoStats } from './ProjectCard';
import GitHubPulse from './GitHubPulse';
import LastFmWidget from './LastFmWidget';
import { usePageTitle } from '../hooks/CommonHooks';

function HomeContent() {
  usePageTitle('');
  return (
    <Box sx={{ width: '100%' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <Paper
            sx={{ p: 3, mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Typography
              component="h2"
              variant="h3"
              gutterBottom
              align="center"
              sx={{
                typography: { xs: 'h5', sm: 'h4', md: 'h3' },
                wordBreak: 'break-word',
                color: 'text.primary',
              }}
            >
              software/mechanical engineer
            </Typography>
            <Typography
              component="p"
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                typography: { xs: 'h6', sm: 'h5', md: 'h4' },
                wordBreak: 'break-word',
                color: 'text.secondary',
              }}
            >
              karan@karanshukla.ca
            </Typography>
          </Paper>

          <Box sx={{ mt: 2 }} />

          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" align="center" sx={{ color: 'text.primary' }}>
              hello! if you've made it here, you're probably curious about my background. i'm a
              software developer with a mechanical engineering degree, working primarily in web
              development and saas. as this is a public website, i keep things intentionally vague,
              but feel free to reach out via linkedin or email if you'd like to connect! below are a
              couple of personal projects i'm particularly proud of.
            </Typography>
          </Paper>

          <Box sx={{ mt: 2 }} />

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  navyfragen
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
                  bluesky q&a messaging platform
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  anonymous q&a platform on bluesky's at protocol - users receive questions and post
                  answers to their followers. node.js/react (mantine ui), waf-protected, with a
                  microservice for answer card images and crons for notification processing
                </Typography>
                <RepoStats
                  owner="karanshukla"
                  repo="navyfragen-app"
                  url="https://github.com/karanshukla/navyfragen-app"
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  asher-cli
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
                  cli application for managing litter robot products with real time monitoring
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  a claude code style program that can monitor and manage the litter robot line of
                  products, as well as gather cat data from the device. uses a reverse engineered
                  python library to interact with whisker's cloud API, and is published as a pip
                  package
                </Typography>
                <RepoStats
                  owner="karanshukla"
                  repo="asher-cli"
                  url="https://github.com/karanshukla/asher-cli"
                />
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }} />

          <Divider sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ textTransform: 'none', color: 'text.secondary' }}>
              currently
            </Typography>
          </Divider>

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <GitHubPulse />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <LastFmWidget />
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Box>
  );
}

export default HomeContent;
