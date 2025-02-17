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
import { AsherZone } from '../modules/AsherZone.ts';
import {
  emailLink,
  githubLink,
  linkedinLink,
  blueskyLink
} from '../constants/CommonConstants.ts';

export const MainListItems = () => {
  const { getLastClicked, handleClick } = useLastClicked();

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleClick('Home')} >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick('Experience')} >
        <ListItemIcon>
          <WorkHistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Experience" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick('Hobbies')} >
        <ListItemIcon>
          <SportsRugbyIcon />
        </ListItemIcon>
        <ListItemText primary="Hobbies" />
      </ListItemButton>
      <ListItemButton disabled={getLastClicked() === 'Asher Zone'} onClick={
        () => {
          handleClick('Asher Zone');
          AsherZone();
        }}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Asher Zone" />
      </ListItemButton>
      {
        getLastClicked() === 'Asher Zone' ?
          <ListItemButton onClick={(() => window.location.reload())} >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Exit the Asher Zone" />
          </ListItemButton>
          : null
      }
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton href={githubLink}>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItemButton>
    <ListItemButton href={linkedinLink}>
      <ListItemIcon>
        <LinkedInIcon />
      </ListItemIcon>
      <ListItemText primary="Linkedin" />
    </ListItemButton>
    <ListItemButton href={blueskyLink}>
      <ListItemIcon>
        <TwitterIcon />
      </ListItemIcon>
      <ListItemText primary="BlueSky" />
    </ListItemButton>
    <ListItemButton href={emailLink}>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="Email Me" />
    </ListItemButton>
  </React.Fragment>
);
