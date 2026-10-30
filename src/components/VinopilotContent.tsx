import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { usePageTitle } from '../hooks/CommonHooks';
import { huggingFaceLink } from '../constants/CommonConstants';
import {
  laptopRequirements,
  npuStats,
  vinopilotApps,
  type VinopilotApp,
} from '../constants/vinopilotApps';

function SectionDivider({ children }: { children: string }) {
  return (
    <Divider sx={{ mt: 4, mb: 3 }}>
      <Typography variant="overline" sx={{ textTransform: 'none', color: 'text.secondary' }}>
        {children}
      </Typography>
    </Divider>
  );
}

function ExternalLink({
  href,
  label,
  ariaLabel,
}: {
  href: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="caption"
      aria-label={`${ariaLabel} (opens in new tab)`}
    >
      {label}
    </Link>
  );
}

function VinopilotAppCard({ app }: { app: VinopilotApp }) {
  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h3" variant="h6">
        {app.name}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {app.tagline}
      </Typography>
      {app.replaces && (
        <Typography variant="caption" sx={{ color: 'primary.main' }}>
          replaces {app.replaces}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 1.5, flexGrow: 1 }}>
        {app.description}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
        {app.highlights.map((highlight) => (
          <Chip key={highlight} label={highlight} size="small" color="primary" variant="outlined" />
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {app.stack}
        </Typography>
        {app.links.map((link) => (
          <ExternalLink
            key={link.href}
            href={link.href}
            label={link.label}
            ariaLabel={`${app.name} ${link.label}`}
          />
        ))}
      </Box>
    </Paper>
  );
}

function VinopilotContent() {
  usePageTitle('vinopilot');
  return (
    <Box sx={{ width: '100%' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography component="h2" variant="h5" gutterBottom>
              vinopilot
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
              copilot+ pc features for linux, offline on intel npus
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              a suite of free, open source linux apps that put the npu in intel laptops to work:
              live captions and voice typing, face unlock, webcam effects, ai text actions,
              text-to-speech and smart file search. these are the features windows saves for
              copilot+ pcs, but the npu they need is already in most recent intel laptops.
            </Typography>
            <Typography variant="body1">
              everything runs locally on the npu, so there's no cloud, no account, no api key and no
              telemetry, and the cpu, gpu, fans and battery are left alone. every download is
              hash-checked, and each app has a doctor command that tells you exactly what to fix.
              the models didn't run on the npu as published, so i requantised them for intel npus
              and host them on hugging face.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
              <ExternalLink
                href="https://vinopilot.ca"
                label="vinopilot.ca"
                ariaLabel="vinopilot.ca"
              />
              <ExternalLink
                href={huggingFaceLink}
                label="models on hugging face"
                ariaLabel="requantised models on hugging face"
              />
            </Box>
          </Paper>

          <SectionDivider>why the npu</SectionDivider>

          <Grid container spacing={2}>
            {npuStats.map((stat) => (
              <Grid key={stat.value} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: 'flex' }}>
                <Paper sx={{ p: 2.5, width: '100%' }}>
                  <Typography variant="h4" component="p" sx={{ color: 'primary.main' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.caption}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="caption"
            component="p"
            sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}
          >
            measured on a dell xps 13
          </Typography>

          <SectionDivider>the apps</SectionDivider>

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {vinopilotApps.map((app) => (
              <Grid key={app.name} size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                <VinopilotAppCard app={app} />
              </Grid>
            ))}
          </Grid>

          <SectionDivider>will it run on my laptop?</SectionDivider>

          <Paper sx={{ p: 3 }}>
            <Typography variant="body1">
              if it has an intel core ultra chip (2023 or newer), yes. no copilot+ pc needed, and
              chips below its 40 tops bar work too. older intel laptops without an npu run most apps
              on the intel gpu or cpu; nvidia and amd graphics cards aren't used yet.
            </Typography>
            <List dense>
              {laptopRequirements.map((requirement) => (
                <ListItem key={requirement.label} disableGutters>
                  <ListItemText primary={requirement.label} secondary={requirement.detail} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              developed and tested on wildcat lake (core series 3). got a different intel laptop?
              run any app's doctor command and paste the output into a github issue, working or not.
              it's the fastest way to get your hardware supported.
            </Typography>
          </Paper>
        </Box>
      </Slide>
    </Box>
  );
}

export default VinopilotContent;
