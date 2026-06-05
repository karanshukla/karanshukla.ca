import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  emailLink,
  githubLink,
  linkedinLink,
  blueskyLink,
} from '../constants/CommonConstants';

interface KeyHintProps {
  children: string;
}

const KeyHint: React.FC<KeyHintProps> = ({ children }) => (
  <Typography
    component="span"
    variant="caption"
    aria-label={`keyboard shortcut: press ${children}`}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 20,
      height: 20,
      px: 0.75,
      ml: 'auto',
      flexShrink: 0,
      fontFamily: 'monospace',
      fontSize: '0.65rem',
      fontWeight: 600,
      lineHeight: 1,
      bgcolor: 'action.selected',
      color: 'text.secondary',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: '4px',
    }}
  >
    {children}
  </Typography>
);

export const MainListItems: React.FC = () => {
  const { pathname } = useLocation();
  const isAsherZone = pathname === '/asher-zone';

  return (
    <React.Fragment>
      <ListItemButton component={NavLink} to="/" end aria-label="home, press 1">
        <ListItemIcon aria-hidden="true">
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="home" />
        <KeyHint>1</KeyHint>
      </ListItemButton>

      <ListItemButton component={NavLink} to="/experience" aria-label="experience, press 2">
        <ListItemIcon aria-hidden="true">
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="experience" />
        <KeyHint>2</KeyHint>
      </ListItemButton>

      <ListItemButton component={NavLink} to="/hobbies" aria-label="hobbies, press 3">
        <ListItemIcon aria-hidden="true">
          <SportsRugbyIcon />
        </ListItemIcon>
        <ListItemText primary="hobbies" />
        <KeyHint>3</KeyHint>
      </ListItemButton>

      <ListItemButton component={NavLink} to="/musings" aria-label="musings, press 5">
        <ListItemIcon aria-hidden="true">
          <EditNoteIcon />
        </ListItemIcon>
        <ListItemText primary="musings" />
        <KeyHint>5</KeyHint>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/asher-zone"
        disabled={isAsherZone}
        aria-label="asher zone, press 4"
      >
        <ListItemIcon aria-hidden="true">
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="asher zone" />
        <KeyHint>4</KeyHint>
      </ListItemButton>

      {isAsherZone && (
        <ListItemButton component={NavLink} to="/" aria-label="exit the asher zone">
          <ListItemIcon aria-hidden="true">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="exit the asher zone" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export const SecondaryListItems: React.FC = () => (
  <React.Fragment>
    <ListItemButton
      href={githubLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="github (opens in new tab)"
    >
      <ListItemIcon aria-hidden="true">
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="github" />
    </ListItemButton>

    <ListItemButton
      href={linkedinLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="linkedin (opens in new tab)"
    >
      <ListItemIcon aria-hidden="true">
        <LinkedInIcon />
      </ListItemIcon>
      <ListItemText primary="linkedin" />
    </ListItemButton>

    <ListItemButton
      href={blueskyLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="bluesky (opens in new tab)"
    >
      <ListItemIcon aria-hidden="true">
        <TwitterIcon />
      </ListItemIcon>
      <ListItemText primary="bluesky" />
    </ListItemButton>

    <ListItemButton href={emailLink} aria-label="send email to karan">
      <ListItemIcon aria-hidden="true">
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="email" />
    </ListItemButton>
  </React.Fragment>
);
