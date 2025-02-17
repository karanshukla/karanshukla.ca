import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { drawerWidth } from '../constants/CommonConstants.ts';

interface StyledDrawerProps {
  theme?: Theme;
  open?: boolean;
}

export const StyledDrawer = styled(MuiDrawer, { 
  shouldForwardProp: (prop): boolean => prop !== 'open' 
})<StyledDrawerProps>(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);