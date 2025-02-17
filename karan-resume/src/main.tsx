import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Helmet from './components/Helmet.tsx'
import Home from './components/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Helmet />
    <Home />
  </StrictMode>,
)
