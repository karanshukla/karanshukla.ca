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

const MastodonIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
  </SvgIcon>
);
import {
  emailLink,
  githubLink,
  linkedinLink,
  blueskyLink,
  mastodonLink,
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

    <ListItemButton
      href={mastodonLink}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="mastodon (opens in new tab)"
    >
      <ListItemIcon aria-hidden="true">
        <MastodonIcon />
      </ListItemIcon>
      <ListItemText primary="mastodon" />
    </ListItemButton>

    <ListItemButton href={emailLink} aria-label="send email to karan">
      <ListItemIcon aria-hidden="true">
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="email" />
    </ListItemButton>
  </React.Fragment>
);
