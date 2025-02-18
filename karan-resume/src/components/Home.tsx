import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledAppBar } from './StyledAppBar.tsx';
import { StyledDrawer } from './StyledDrawer.tsx';
import DynamicChip from './DynamicChip.tsx';
import { MainListItems, secondaryListItems } from './ListItems.tsx';
import HomeContent from './HomeContent.tsx';
import ExperienceContent from './ExperienceContent.tsx';
import HobbyContent from './HobbyContent.tsx';
import AsherZoneContent from './AsherZoneContent.tsx';
import { isLandscape } from '../helpers/CommonHelpers.ts';
import { useLastClicked, useTheme } from '../hooks/CommonHooks.js';
import { disableAsherZone } from '../modules/AsherZone.ts';

interface CopyrightInterface {
  (props: {
    sx: {
      pt: number;
    };
  }): JSX.Element;
}

const Copyright: CopyrightInterface = (props) => {
  if (isLandscape()) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://karanshukla.ca/">
          Karan Shukla
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  } else {
    return (
      <></>
    );
  }
}


export default function Home() {
  const [drawerOpen, setDrawerOpen] = React.useState(isLandscape());

  React.useEffect(() => {
    if (!isLandscape()) {
      setDrawerOpen(false);
    }
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { theme, toggleTheme } = useTheme();

  const { getLastClicked } = useLastClicked();
  if (getLastClicked() !== 'Asher Zone') {
    disableAsherZone();
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StyledAppBar position="absolute" open={drawerOpen}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Karan Shukla
            </Typography>
            {!isLandscape() && (
              <DynamicChip initialLabel={getLastClicked()} />
            )}
            <IconButton color="inherit" onClick={toggleTheme}>
              <DarkModeIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent" open={drawerOpen}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
          <Divider />
          {drawerOpen && (<Copyright sx={{ pt: 4 }} />)}
        </StyledDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {getLastClicked() === 'Home' && <HomeContent />}
            {getLastClicked() === 'Experience' && <ExperienceContent />}
            {getLastClicked() === 'Hobbies' && <HobbyContent />}
            {getLastClicked() === 'Asher Zone' && <AsherZoneContent />}
          </Container>
        </Box>
        <Fab
          color="primary"
          aria-label="menu"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={toggleDrawer}>
          <MenuIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
}
