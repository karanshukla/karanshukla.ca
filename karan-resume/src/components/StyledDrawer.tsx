import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';
import { drawerWidth } from '../constants/CommonConstants.ts';

interface StyledDrawerProps {
  theme?: Theme;
  open?: boolean;
}

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop): prop is keyof StyledDrawerProps => prop !== 'open'
})<StyledDrawerProps>(
  ({ theme, open = false }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(open === false && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(8),
        },
        '& .MuiListItemButton-root': {
          justifyContent: 'center',
          margin: '2px 4px',
          width: 'calc(100% - 8px)',
          padding: '8px 0',
        },
        '& .MuiListItemIcon-root': {
          minWidth: 0,
          marginRight: 0,
          justifyContent: 'center',
        },
        '& .MuiListItemText-root': {
          display: 'none',
        },
        '& .MuiListItemButton-root > span': {
          display: 'none',
        },
      }),
    },
  }),
);