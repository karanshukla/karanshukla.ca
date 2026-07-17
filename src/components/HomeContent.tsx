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
                  openresto
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
                  open source restaurant booking system
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  a self-hosted, cloudless table booking system for restaurants - no fees, no data
                  collection, no vendor lock-in. asp.net backend with sqlite, a react native mobile
                  frontend, and full brand customisability, fully dockerised for quick
                  self-deployment
                </Typography>
                <RepoStats
                  owner="karanshukla"
                  repo="openresto"
                  url="https://github.com/karanshukla/openresto"
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  bluejays.space
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
                  parody blue jays headline site plus free bluesky custom domain handles
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  a monorepo of three services: an astro ssr site serving fax sports-style parody
                  headlines for blue jays fans, a go service issuing free @username.bluejays.space
                  bluesky handles, and a claude-powered cron job that classifies and safety-checks
                  draft headlines before a human publishes them.
                </Typography>
                <RepoStats
                  owner="karanshukla"
                  repo="bluejays-space"
                  url="https://github.com/karanshukla/bluejays-space"
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
