import React from 'react';
import { Container , Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 20%', marginRight: '1rem' }}>
          <Typography variant="h1">Karan Shukla</Typography>
          <Typography variant="subtitle1">Software Engineer</Typography>
        </div>
        <div style={{ flex: '1' }}>
          {/* Content */}
        </div>
      </div>
    </Container>
  );
}

export default App;