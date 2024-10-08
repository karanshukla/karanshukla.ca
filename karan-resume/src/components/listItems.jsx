import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import PetsIcon from '@mui/icons-material/Pets';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import CodeIcon from '@mui/icons-material/Code';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { AsherZone } from '../modules/AsherZone.ts';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WorkHistoryIcon />
      </ListItemIcon>
      <ListItemText primary="Experience" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SportsRugbyIcon />
      </ListItemIcon>
      <ListItemText primary="Hobbies" />
    </ListItemButton>
    <ListItemButton onClick = {AsherZone}>
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Asher Zone"/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton href='https://github.com/karanshukla/karanshukla.ca'>
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Github" />
    </ListItemButton>
    <ListItemButton href='https://www.linkedin.com/in/shuklakaran/'>
      <ListItemIcon>
        <LinkedInIcon />
      </ListItemIcon>
      <ListItemText primary="Linkedin" />
    </ListItemButton>
    <ListItemButton href='mailto:karan@karanshukla.ca'>
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="Email Me" />
    </ListItemButton>
  </React.Fragment>
);
