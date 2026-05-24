import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import asher1 from '../assets/asher1.jpg';
import asher3 from '../assets/asher3.jpg';
import asher5 from '../assets/asher5.jpg';
import asher7 from '../assets/asher7.jpg';

const currentlyLearning = [
  { label: 'jazz guitar' },
  { label: 'calisthenics' },
  { label: 'food science' },
];

const recentlyEnjoyed = [
  {
    title: 'jujutsu kaisen',
    subtitle: 'gege akutami',
    tags: ['manga', 'dark fantasy', 'action'],
    description:
      'follows yuji itadori, a high schooler who becomes host to a powerful curse after swallowing a cursed object. a dark and intense shonen with striking art and complex characters.',
  },
  {
    title: 'kind of blue',
    subtitle: 'miles davis',
    tags: ['album', 'jazz', '1959'],
    description:
      'the best-selling jazz album of all time. modal jazz at its finest, laid back, spacious, and endlessly listenable. features bill evans, john coltrane, and cannonball adderley.',
  },
];

const catPhotos = [asher1, asher3, asher5, asher7];

function HobbyContent() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h5" gutterBottom>
              sport
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>rugby</ListItem>
                <ListItem>baseball</ListItem>
                <ListItem>weightlifting</ListItem>
                <ListItem>running</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h5" gutterBottom>
              environmental activism
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>promoting the responsible use of generative ai</ListItem>
                <ListItem>
                  donating to and advocating for organizations fighting climate change
                </ListItem>
                <ListItem>supporting urbanist development of cities and towns</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h5" gutterBottom>
              technology
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>responsible, open source social media</ListItem>
                <ListItem>linux/android</ListItem>
                <ListItem>web development</ListItem>
                <ListItem>mechanical keyboards</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
            <Typography variant="h5" gutterBottom>
              music
            </Typography>
            <Typography variant="body1" component="div">
              <List>
                <ListItem>guitar</ListItem>
                <ListItem>drums</ListItem>
                <ListItem>music production</ListItem>
                <ListItem>concerts and shows</ListItem>
              </List>
            </Typography>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              currently learning
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {currentlyLearning.map((item) => (
                <Chip key={item.label} label={item.label} color="primary" variant="outlined" />
              ))}
            </Box>
          </Paper>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <Divider sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ textTransform: 'none' }}>
                recently enjoyed
              </Typography>
            </Divider>
            <Grid container spacing={3}>
              {recentlyEnjoyed.map((item) => (
                <Grid key={item.title} size={{ xs: 12, md: 6 }}>
                  <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {item.subtitle}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, flexGrow: 1 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
                      {item.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>
      </Grid>

      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <Divider sx={{ mb: 3 }}>
              <Typography variant="overline" color="text.secondary" sx={{ textTransform: 'none' }}>
                asher
              </Typography>
            </Divider>
            <Grid container spacing={2}>
              {catPhotos.map((src, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box
                    component="img"
                    src={src}
                    alt="asher the cat"
                    sx={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: 2,
                      display: 'block',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>
      </Grid>
    </Grid>
  );
}

export default HobbyContent;
