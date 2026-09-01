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
      "a q&a messaging system built on top of bluesky's AT Protocol, similar to ask.fm or curiouscat. users receive anonymous questions and post answers directly to their bluesky followers. node.js backend, react/mantine ui frontend, waf-protected. includes a microservice for answer card image generation and cron jobs for notification processing, plus a companion feed generator for the network.",
    techStack: ['TypeScript', 'Node.js', 'React', 'Mantine UI', 'AT Protocol'],
    liveUrl: 'https://navyfragen.app',
  },
  {
    owner: 'karanshukla',
    repo: 'asher-cli',
    title: 'asher-cli',
    subtitle: 'cli application for managing litter robot products with real time monitoring',
    description:
      "a claude code style program that can monitor and manage the litter robot line of products, as well as gather cat data from the device in real time, including litter box cycles, waste levels, and pet weight trends. uses a reverse engineered python library to interact with whisker's cloud API, and is published as a pip package for easy installation and updates. Also bundles and exposes an MCP Connector that auto configures to Claude Desktop and other LLM harnesses.",
    techStack: ['Python'],
  },
  {
    owner: 'karanshukla',
    repo: 'totalwarhammer-tournament-app',
    title: 'twtournament',
    subtitle: 'tournament organizer for total war: warhammer',
    description:
      'a utility app for organizing and managing tournaments for the total war warhammer series. handles bracket generation, match tracking, and results with real-time updates via websockets. react frontend with chakra ui, mongodb for persistent tournament data, and redis for sessions and live statistics. built for the community as a free planning and coordination tool.',
    techStack: ['TypeScript', 'React', 'Chakra UI', 'MongoDB', 'Redis', 'WebSocket'],
    liveUrl: 'https://twtournament.app',
  },
  {
    owner: 'karanshukla',
    repo: 'vinoWhisper',
    title: 'vinowhisper',
    subtitle: 'npu-accelerated local live captioning for linux',
    description:
      'captions whatever is playing on the machine directly in the terminal, with nothing leaving the device. runs whisper on an intel npu through openvino genai, capturing system audio or the mic via pipewire, and commits words only once two overlapping cycles agree so the transcript stays stable. ships as a pip package with a guided setup that handles the npu driver, model export, and systemd units, plus doctor and replay tools for tuning offline.',
    techStack: ['Python', 'OpenVINO', 'Whisper', 'PipeWire'],
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
                <ListItem>
                  working with a php backend and react frontend to build and ship new features and
                  bug fixes
                </ListItem>
                <ListItem>
                  developing restful apis and integrations with other saas platforms to improve
                  customer workflows
                </ListItem>
                <ListItem>
                  reworked in-app user permission systems to improve access control
                </ListItem>
                <ListItem>
                  built internal tooling to improve efficiency across customer experience teams
                </ListItem>
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
                <ListItem>
                  technical lead and analyst (saas support, escalations, sql reporting)
                </ListItem>
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
              <Typography
                variant="overline"
                sx={{ textTransform: 'none', color: 'text.secondary' }}
              >
                open source projects
              </Typography>
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
