import * as React from 'react';
import { NavLink, useLocation } from 'react-router';
import { useHaptic } from 'use-haptic';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import ArticleIcon from '@mui/icons-material/Article';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const BlueskyIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 600 530">
    <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.449-163.25-81.433C20.15 217.613 10 86.535 10 68.825c0-88.687 77.742-60.816 125.72-24.795z" />
  </SvgIcon>
);
import { emailLink, githubLink, linkedinLink, blueskyLink } from '../constants/CommonConstants';

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
  const { triggerHaptic } = useHaptic(1);

  return (
    <React.Fragment>
      <ListItemButton
        component={NavLink}
        to="/"
        end
        aria-label="home, press 1"
        onClick={triggerHaptic}
      >
        <ListItemIcon aria-hidden="true">
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="home" />
        <KeyHint>1</KeyHint>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/experience"
        aria-label="experience, press 2"
        onClick={triggerHaptic}
      >
        <ListItemIcon aria-hidden="true">
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="experience" />
        <KeyHint>2</KeyHint>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/hobbies"
        aria-label="hobbies, press 3"
        onClick={triggerHaptic}
      >
        <ListItemIcon aria-hidden="true">
          <SportsRugbyIcon />
        </ListItemIcon>
        <ListItemText primary="hobbies" />
        <KeyHint>3</KeyHint>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/blog"
        aria-label="blog, press 4"
        onClick={triggerHaptic}
      >
        <ListItemIcon aria-hidden="true">
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="blog" />
        <KeyHint>4</KeyHint>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/asher-zone"
        disabled={isAsherZone}
        aria-label="asher zone, press 5"
        onClick={triggerHaptic}
      >
        <ListItemIcon aria-hidden="true">
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="asher zone" />
        <KeyHint>5</KeyHint>
      </ListItemButton>

      {isAsherZone && (
        <ListItemButton
          component={NavLink}
          to="/"
          aria-label="exit the asher zone"
          onClick={triggerHaptic}
        >
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
        <BlueskyIcon />
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
