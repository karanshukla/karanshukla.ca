import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Home from './components/Home.tsx';
import HomeContent from './components/HomeContent.tsx';
import ExperienceContent from './components/ExperienceContent.tsx';
import HobbyContent from './components/HobbyContent.tsx';
import AsherZoneContent from './components/AsherZoneContent.tsx';
import BlogContent from './components/BlogContent.tsx';
import BlogPost from './components/BlogPost.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <HomeContent /> },
      { path: 'experience', element: <ExperienceContent /> },
      { path: 'hobbies', element: <HobbyContent /> },
      { path: 'blog', element: <BlogContent /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'asher-zone', element: <AsherZoneContent /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
