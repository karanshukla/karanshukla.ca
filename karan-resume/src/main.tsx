import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.tsx';
import HomeContent from './components/HomeContent.tsx';

const ExperienceContent = lazy(() => import('./components/ExperienceContent.tsx'));
const HobbyContent = lazy(() => import('./components/HobbyContent.tsx'));
const AsherZoneContent = lazy(() => import('./components/AsherZoneContent.tsx'));
const MusingsContent = lazy(() => import('./components/MusingsContent.tsx'));

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <HomeContent /> },
      { path: 'experience', element: <Suspense fallback={null}><ExperienceContent /></Suspense> },
      { path: 'hobbies', element: <Suspense fallback={null}><HobbyContent /></Suspense> },
      { path: 'asher-zone', element: <Suspense fallback={null}><AsherZoneContent /></Suspense> },
      { path: 'musings', element: <Suspense fallback={null}><MusingsContent /></Suspense> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
