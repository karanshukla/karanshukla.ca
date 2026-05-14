import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ProjectCard from './ProjectCard';

const projects = [
  {
    owner: 'karanshukla',
    repo: 'navyfragen-app',
    title: 'navyfragen',
    subtitle: 'anonymous q&a platform on bluesky',
    description:
      'a q&a messaging system built on top of bluesky\'s AT Protocol, similar to ask.fm or curiouscat. users receive anonymous questions and post answers directly to their bluesky followers. includes a companion feed generator (navyfragen-feed) that surfaces answered questions across the network.',
    techStack: ['TypeScript', 'Node.js', 'React', 'Mantine UI', 'AT Protocol'],
    liveUrl: 'https://navyfragen.app',
  },
  {
    owner: 'karanshukla',
    repo: 'openresto',
    title: 'openresto',
    subtitle: 'open source restaurant booking system',
    description:
      'a self-hosted, cloudless table booking system for restaurants — no fees, no data collection, no vendor lock-in. supports multiple restaurant instances per deployment, customer-facing email confirmations via your own address, and a mobile-friendly booking UI. dockerized for easy self-deployment.',
    techStack: ['TypeScript', 'ASP.NET', 'React Native', 'Docker'],
    liveUrl: 'https://openres.to',
  },
  {
    owner: 'karanshukla',
    repo: 'totalwarhammer-tournament-app',
    title: 'twtournament',
    subtitle: 'tournament organizer for total war: warhammer',
    description:
      'a utility app for organizing and managing tournaments for the total war warhammer games. handles bracket generation, match tracking, and results. built for the community as a planning and coordination tool.',
    techStack: ['TypeScript', 'React'],
    liveUrl: 'https://twtournament.app',
  },
  {
    owner: 'karanshukla',
    repo: 'karanshukla.ca',
    title: 'karanshukla.ca',
    subtitle: 'this website',
    description:
      'personal portfolio and resume site built with react, typescript, and vite. deployed automatically to github pages via github actions on every push to main. features dark/light mode, responsive layout, and live github repo stats pulled from the public github api.',
    techStack: ['TypeScript', 'React', 'Vite', 'MUI', 'GitHub Actions'],
    liveUrl: 'https://karanshukla.ca',
  },
];

function ExperienceContent() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h5" gutterBottom>
              full stack software engineer
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>working with php/react to build saas products</ListItem>
                <ListItem>developing apis and integrations to connect to other saas apps</ListItem>
                <ListItem>internal tooling for BI and CX use cases</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h6" gutterBottom>
              prior experience
            </Typography>
            <Typography variant="body2" component="div">
              <List>
                <ListItem>technical lead (software support)</ListItem>
                <ListItem>cad software engineer/mechanical engineer</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>
              education
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>bachelor of applied science (university of toronto)</ListItem>
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
