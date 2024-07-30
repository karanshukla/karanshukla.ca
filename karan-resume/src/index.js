import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from './components/Helmet';
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Helmet />
    <Home />
  </React.StrictMode>
);
