import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { List, ListItem, Slide } from '@mui/material';

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
                sport
              </Typography>
              <Typography variant="body1">
                <List>
                  <ListItem>rugby</ListItem>
                  <ListItem>cricket</ListItem>
                  <ListItem>weightlifting</ListItem>
                  <ListItem>running</ListItem>
                </List>
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
                environmental activism
              </Typography>
              <Typography variant="body1">
                <List>
                  <ListItem>promoting the responsible use of generative AI</ListItem>
                  <ListItem>donation and advocacy for companies and groups to fight against climate change</ListItem>
                  <ListItem>supporting urbanist development of cities and towns</ListItem>
                </List>
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <Typography variant="h5" gutterBottom>
                technology
              </Typography>
              <Typography variant="body1">
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
        <Grid item xs={12} md={6} lg={6}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <Typography variant="h5" gutterBottom>
                music
              </Typography>
              <Typography variant="body1">
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
      </Grid>
    </>
  );
}

export default HobbyContent;