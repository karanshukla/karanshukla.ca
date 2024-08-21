import React from 'react';
import { createRoot } from 'react-dom/client';
import Helmet from './components/Helmet';
import Home from './components/Home';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet />
    <Home />
  </React.StrictMode>
);
