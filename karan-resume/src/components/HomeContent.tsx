import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide  from '@mui/material/Slide';

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
            <Typography variant="h5" color="text.primary" gutterBottom align='center'>
              software/mechanical engineer
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              karan@karanshukla.ca
            </Typography>
            </Paper>
        </Slide>
      </Grid>
    </>
  );
}

export default HomeContent;
