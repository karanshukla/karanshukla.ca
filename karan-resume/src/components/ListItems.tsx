import * as React from 'react';
import { useLastClicked } from '../hooks/CommonHooks';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Home as HomeIcon,
  Pets as PetsIcon,
  WorkHistory as WorkHistoryIcon,
  SportsRugby as SportsRugbyIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { AsherZone } from '../modules/AsherZone';
import {
  emailLink,
  githubLink,
  linkedinLink,
  blueskyLink
} from '../constants/CommonConstants';

export const MainListItems: React.FC = () => {
  const { getLastClicked, handleClick } = useLastClicked();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleClick('Home')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="home" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick('Experience')}>
        <ListItemIcon>
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="experience" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick('Hobbies')}>
        <ListItemIcon>
          <SportsRugbyIcon />
        </ListItemIcon>
        <ListItemText primary="hobbies" />
      </ListItemButton>
      <ListItemButton 
        disabled={getLastClicked() === 'Asher Zone'} 
        onClick={() => {
          handleClick('Asher Zone');
          AsherZone();
        }}
      >
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="asher zone" />
      </ListItemButton>
      {getLastClicked() === 'Asher Zone' ? (
        <ListItemButton onClick={() => window.location.reload()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="exit the asher zone" />
        </ListItemButton>
      ) : null}
    </React.Fragment>
  );
};

export const secondaryListItems: React.ReactElement = (
  <React.Fragment>
    <ListItemButton href={githubLink}>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="github" />
    </ListItemButton>
    <ListItemButton href={linkedinLink}>
      <ListItemIcon>
        <LinkedInIcon />
      </ListItemIcon>
      <ListItemText primary="linkedin" />
    </ListItemButton>
    <ListItemButton href={blueskyLink}>
      <ListItemIcon>
        <TwitterIcon />
      </ListItemIcon>
      <ListItemText primary="bluesky" />
    </ListItemButton>
    <ListItemButton href={emailLink}>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="email Me" />
    </ListItemButton>
  </React.Fragment>
);
