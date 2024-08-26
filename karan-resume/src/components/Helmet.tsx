import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

function Helmet(): JSX.Element {
  return (
    <><HelmetProvider>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </HelmetProvider></>
  );
}

export default Helmet;