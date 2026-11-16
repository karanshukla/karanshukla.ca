import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { usePageTitle } from '../hooks/CommonHooks';
import { huggingFaceLink } from '../constants/CommonConstants';
import {
  deepDives,
  modelFixes,
  suiteApps,
  testHardware,
  type DeepDive,
  type SuiteApp,
  type VinopilotLink,
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

function ProjectFooter({
  name,
  stack,
  links,
}: {
  name: string;
  stack: string;
  links: VinopilotLink[];
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {stack}
      </Typography>
      {links.map((link) => (
        <ExternalLink
          key={link.href}
          href={link.href}
          label={link.label}
          ariaLabel={`${name} ${link.label}`}
        />
      ))}
    </Box>
  );
}

function DeepDiveSection({ project }: { project: DeepDive }) {
  return (
    <Paper component="section" aria-labelledby={`${project.name}-heading`} sx={{ p: 3, mb: 3 }}>
      <Typography id={`${project.name}-heading`} component="h3" variant="h6">
        {project.name}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {project.summary}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
        {project.numbers.map((number) => (
          <Chip key={number} label={number} size="small" color="primary" variant="outlined" />
        ))}
      </Box>
      <Box component="dl" sx={{ mt: 2, mb: 0 }}>
        {project.workarounds.map((workaround) => (
          <Box key={workaround.problem} sx={{ mb: 2 }}>
            <Typography component="dt" variant="subtitle2">
              {workaround.problem}
            </Typography>
            <Typography component="dd" variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
              {workaround.detail}
            </Typography>
          </Box>
        ))}
      </Box>
      <ProjectFooter name={project.name} stack={project.stack} links={project.links} />
    </Paper>
  );
}

function SuiteAppCard({ app }: { app: SuiteApp }) {
  return (
    <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h3" variant="h6">
        {app.name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, flexGrow: 1 }}>
        {app.summary}
      </Typography>
      <ProjectFooter name={app.name} stack={app.stack} links={app.links} />
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
              local ai for linux on intel npus
            </Typography>
            <Typography variant="body1">
              nine open source linux projects that run ai models on the npu in intel laptops. most
              of the work was getting around what the npu can't do: it only runs fixed sizes,
              rejects some models outright, and resets if the driver and software versions don't
              match.
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
                ariaLabel="re-exported models on hugging face"
              />
            </Box>
          </Paper>

          <SectionDivider>the hard parts</SectionDivider>

          {deepDives.map((project) => (
            <DeepDiveSection key={project.name} project={project} />
          ))}

          <SectionDivider>fixing the models</SectionDivider>

          <Paper sx={{ p: 3 }}>
            <Box component="dl" sx={{ m: 0 }}>
              {modelFixes.map((model) => (
                <Box key={model.model} sx={{ mb: 2 }}>
                  <Typography component="dt" variant="subtitle2">
                    <Link
                      href={model.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${model.model} (opens in new tab)`}
                    >
                      {model.model}
                    </Link>{' '}
                    <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
                      · {model.usedBy}
                    </Typography>
                  </Typography>
                  <Typography component="dd" variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
                    {model.fix}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          <SectionDivider>the other apps</SectionDivider>

          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            {suiteApps.map((app) => (
              <Grid key={app.name} size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                <SuiteAppCard app={app} />
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="caption"
            component="p"
            sx={{ color: 'text.secondary', mt: 3, textAlign: 'center' }}
          >
            {testHardware}
          </Typography>
        </Box>
      </Slide>
    </Box>
  );
}

export default VinopilotContent;
