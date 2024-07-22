import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './App';
import Helmet from './Helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet />
    <Header />
  </React.StrictMode>
);
