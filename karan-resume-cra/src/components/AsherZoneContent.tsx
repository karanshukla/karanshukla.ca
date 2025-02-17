import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Slide } from '@mui/material';

function AsherZoneContent() {
  return (
    <>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper
          sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#c0c0c0',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        boxShadow: '2px 2px 0px #000000',
        borderRadius: 0,
        margin: 0,
          }}
        >
          <Typography
        variant="h1"
        gutterBottom
        sx={{
          fontFamily: '"MS Sans Serif", Arial, sans-serif',
          color: '#000080',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '4rem',
          fontWeight: 'bold'
        }}
          >
        Welcome to the Asher Zone
          </Typography>
        </Paper>
      </Slide>
    </>
  );
}

export default AsherZoneContent;