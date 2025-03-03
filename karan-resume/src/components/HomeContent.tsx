import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CardMedia, Slide } from '@mui/material';
import { getRawGithubImageUrl } from '../helpers/CommonHelpers';

function HomeContent() {
  return (
    <>
      <Grid item xs={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Paper
            sx={{
              p: 2,
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
            <CardMedia
              component="img"
              sx={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              objectFit: 'cover',
              mb: 2
              }}
              image={getRawGithubImageUrl("karanprofile.jpg")}
              alt="Karan Shukla"
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              software/mechanical engineer
            </Typography>
            </Paper>
        </Slide>
      </Grid>
    </>
  );
}

export default HomeContent;
