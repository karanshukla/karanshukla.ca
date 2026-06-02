import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ProjectCard from './ProjectCard';
import { usePageTitle } from '../hooks/CommonHooks';

const projects = [
  {
    owner: 'karanshukla',
    repo: 'navyfragen-app',
    title: 'navyfragen',
    subtitle: 'anonymous q&a platform on bluesky',
    description:
      'a q&a messaging system built on top of bluesky\'s AT Protocol, similar to ask.fm or curiouscat. users receive anonymous questions and post answers directly to their bluesky followers. node.js backend, react/mantine ui frontend, waf-protected. includes a microservice for answer card image generation, cron jobs for notification processing, and a companion feed generator (navyfragen-feed) that surfaces answered questions across the network.',
    techStack: ['TypeScript', 'Node.js', 'React', 'Mantine UI', 'AT Protocol'],
    liveUrl: 'https://navyfragen.app',
  },
  {
    owner: 'karanshukla',
    repo: 'openresto',
    title: 'openresto',
    subtitle: 'open source restaurant booking system',
    description:
      'a self-hosted, cloudless table booking system for restaurants - no fees, no data collection, no vendor lock-in. asp.net backend with sqlite, a react native mobile frontend, and full brand customisability built in. supports multiple restaurant instances per deployment with customer-facing email confirmations via your own smtp address. fully dockerised for quick self-deployment, with playwright covering e2e testing.',
    techStack: ['TypeScript', 'ASP.NET', 'React Native', 'SQLite', 'Docker', 'Playwright'],
    liveUrl: 'https://openres.to',
  },
  {
    owner: 'karanshukla',
    repo: 'totalwarhammer-tournament-app',
    title: 'twtournament',
    subtitle: 'tournament organizer for total war: warhammer',
    description:
      'a utility app for organizing and managing tournaments for the total war warhammer series. handles bracket generation, match tracking, and results with real-time updates via websockets. react frontend with chakra ui, mongodb for persistent tournament data, and redis for sessions and live statistics. built for the community as a planning and coordination tool.',
    techStack: ['TypeScript', 'React', 'Chakra UI', 'MongoDB', 'Redis', 'WebSocket'],
    liveUrl: 'https://twtournament.app',
  },
  {
    owner: 'karanshukla',
    repo: 'sportsbook-meow',
    title: 'sportsbook-meow',
    subtitle: 'real-time sportsbook ad replacement with cats',
    description:
      'detects and replaces sportsbook betting logos in sports broadcast video - local files and live streams - with random cat photos in real time. uses a fine-tuned yolov8s model (mAP50 0.94+), a local websocket inference server for streaming frame data to the browser, and an extension for chrome, edge, and firefox that handles the live replacement.',
    techStack: ['Python', 'YOLOv8', 'TypeScript', 'WebSocket'],
  },
];

function ExperienceContent() {
  usePageTitle('experience');
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography component="h2" variant="h5" gutterBottom>
              software developer / technical support engineer
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>working with a php backend and react frontend to build and ship new features and bug fixes</ListItem>
                <ListItem>developing restful apis and integrations with other saas platforms to improve customer workflows</ListItem>
                <ListItem>reworked in-app user permission systems to improve access control</ListItem>
                <ListItem>built internal tooling to improve efficiency across customer experience teams</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              prior experience
            </Typography>
            <Typography variant="body2" component="div">
              <List>
                <ListItem>technical lead and analyst (saas support, escalations, sql reporting)</ListItem>
                <ListItem>engineering intern (plm automation, .net/c++, cad workflows)</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h5" gutterBottom>
              education
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>b.a.sc in mechanical engineering (university of toronto)</ListItem>
                <ListItem>minor in sustainable energy engineering</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <Divider sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ textTransform: 'none' }}>open source projects</Typography>
            </Divider>
            <Grid container spacing={3}>
              {projects.map((p) => (
                <Grid key={p.repo} size={{ xs: 12, md: 6 }}>
                  <ProjectCard {...p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>
      </Grid>
    </Grid>
  );
}

export default ExperienceContent;
