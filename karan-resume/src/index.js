import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Helmet from './components/Helmet';
import Home from './components/Home.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet />
    <Home />
  </React.StrictMode>
);
