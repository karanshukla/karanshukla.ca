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

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  navyfragen
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  bluesky q&a messaging platform
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  anonymous q&a platform on bluesky's at protocol - users receive questions
                  and post answers to their followers. node.js/react (mantine ui), waf-protected,
                  with a microservice for answer card images and crons for notification processing
                </Typography>
                <RepoStats owner="karanshukla" repo="navyfragen-app" url="https://github.com/karanshukla/navyfragen-app" />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  sportsbook-meow
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  real-time sportsbook ad replacement with cats
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  detects and replaces sportsbook betting logos in sports broadcast video with
                  random cat photos in real time. uses a fine-tuned yolov8s model, a local
                  websocket inference server, and a browser extension for chrome, edge, and firefox
                </Typography>
                <RepoStats owner="karanshukla" repo="sportsbook-meow" url="https://github.com/karanshukla/sportsbook-meow" />
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }} />

          <Divider sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ textTransform: 'none' }}>
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
