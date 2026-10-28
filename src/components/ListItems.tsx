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
const HuggingFaceIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24">
    <path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624" />
  </SvgIcon>
);

import {
  emailLink,
  githubLink,
  linkedinLink,
  blueskyLink,
  mastodonLink,
  huggingFaceLink,
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
      href={huggingFaceLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="hugging face (opens in new tab)"
    >
      <ListItemIcon aria-hidden="true">
        <HuggingFaceIcon />
      </ListItemIcon>
      <ListItemText primary="hugging face" />
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
