import React from 'react';
import { Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h1">Karan Shukla</Typography>
        <Typography variant="subtitle1">Software Engineer</Typography>
        <div style={{ flex: '1' }}>
          {/* Content */}
        </div>
      </div>
    </Container>
  );
}

export default App;