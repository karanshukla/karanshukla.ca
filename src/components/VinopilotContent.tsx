import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { usePageTitle } from '../hooks/CommonHooks';
import { huggingFaceLink } from '../constants/CommonConstants';

function VinopilotContent() {
  usePageTitle('vinopilot');
  return (
    <Box sx={{ width: '100%' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography component="h2" variant="h5" gutterBottom>
            vinopilot
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
            copilot+ pc features for linux, offline on intel npus
          </Typography>
          <Typography variant="body1">
            a suite of free, open source linux apps that put the npu in intel laptops to work: live
            captions and voice typing, face unlock, webcam effects, ai text actions, text-to-speech
            and smart file search. everything runs locally on the npu, so there's no cloud, no
            account, and the cpu, gpu and battery are left alone. the models didn't run on the npu
            as published, so i requantised them for intel npus and host them on hugging face.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
            <Link
              href="https://vinopilot.ca"
              target="_blank"
              rel="noopener noreferrer"
              variant="caption"
              aria-label="vinopilot.ca (opens in new tab)"
            >
              vinopilot.ca
            </Link>
            <Link
              href={huggingFaceLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="caption"
              aria-label="requantised models on hugging face (opens in new tab)"
            >
              models on hugging face
            </Link>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
}

export default VinopilotContent;
