import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function ExperienceContent() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
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
        <Grid item xs={12} md={4} lg={3}>
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
              <Typography variant="h6" gutterBottom>
                prior experience
              </Typography>
              <Typography variant="body2">
                <List>
                    <ListItem>technical lead (software support)</ListItem>
                    <ListItem>cad software engineer/mechanical engineer</ListItem>
                </List>
              </Typography>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12}>
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" gutterBottom>
                education
                </Typography>
                <Typography variant="body1">
                <List>
                  <ListItem>bachelor of applied science (university of toronto)</ListItem>
                  <ListItem>minor in sustainable energy engineering</ListItem>
                </List>
              </Typography>
            </Paper>
          </Slide>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ExperienceContent;