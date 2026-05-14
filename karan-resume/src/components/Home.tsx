import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppBar } from './StyledAppBar.tsx';
import { StyledDrawer } from './StyledDrawer.tsx';
import DynamicChip from './DynamicChip.tsx';
import { MainListItems, SecondaryListItems } from './ListItems.tsx';
import { isLandscape } from '../helpers/CommonHelpers.ts';
import { useAppTheme, useKeyboardShortcuts } from '../hooks/CommonHooks.tsx';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4, pb: 2 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://karanshukla.ca/">
        Karan Shukla
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

function SkipLink() {
  const handleClick = () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        top: -64,
        left: 16,
        zIndex: 10000,
        px: 2,
        py: 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 1,
        fontFamily: 'inherit',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'top 0.15s ease',
        '&:focus': {
          top: 16,
          outline: '3px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      Skip to main content
    </Box>
  );
}

export default function Home() {
  const isMobile = useMediaQuery('(max-width:599px)', { noSsr: true });
  const [drawerOpen, setDrawerOpen] = React.useState(!isMobile && isLandscape());
  const location = useLocation();

  // On mobile, close drawer when the route changes (nav tap)
  React.useEffect(() => {
    if (isMobile) setDrawerOpen(false);
  }, [location.pathname, isMobile]);

  // Re-sync when breakpoint flips (e.g. device rotation)
  React.useEffect(() => {
    setDrawerOpen(!isMobile && isLandscape());
  }, [isMobile]);

  const { theme, toggleTheme, isDark } = useAppTheme();
  useKeyboardShortcuts();

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SkipLink />

        <StyledAppBar position="fixed" open={drawerOpen}>
          <Toolbar
            sx={{
              pr: { xs: '8px', sm: '24px' },
            }}
          >
            <IconButton
              color="inherit"
              aria-label={drawerOpen ? 'close navigation drawer' : 'open navigation drawer'}
              aria-expanded={drawerOpen}
              aria-controls="nav-drawer"
              onClick={toggleDrawer}
              sx={{
                mr: { xs: 1, sm: '36px' },
                ...(!isMobile && drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              karan shukla
            </Typography>

            {/* Show the current section chip only on mobile when drawer is collapsed */}
            {isMobile && !drawerOpen && <DynamicChip />}

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label={isDark ? 'switch to light mode' : 'switch to dark mode'}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </StyledAppBar>

        {/* Permanent collapsible drawer on all breakpoints */}
        <StyledDrawer
          id="nav-drawer"
          variant="permanent"
          open={drawerOpen}
          aria-label="site navigation"
        >
          <Toolbar
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }}
          >
            <IconButton
              onClick={closeDrawer}
              aria-label="close navigation drawer"
              aria-controls="nav-drawer"
              sx={{ visibility: drawerOpen ? 'visible' : 'hidden' }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" aria-label="main navigation">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
          </List>
          <Divider />
          {drawerOpen && <Copyright />}
        </StyledDrawer>

        <Box
          id="main-content"
          component="main"
          tabIndex={-1}
          aria-label="main content"
          sx={{
            backgroundColor: 'background.default',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            outline: 'none',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>

        <Fab
          color="primary"
          aria-label={drawerOpen ? 'close navigation drawer' : 'open navigation drawer'}
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </Fab>
      </Box>
    </ThemeProvider>
  );
}
