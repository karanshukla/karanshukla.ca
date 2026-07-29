import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { usePageTitle } from '../hooks/CommonHooks';
import { blogPosts } from '../helpers/blogHelpers';

const BackLink = () => (
  <Link to="/blog" style={{ textDecoration: 'none', color: 'inherit' }} aria-label="back to blog">
    <ArrowBackIcon
      sx={{
        color: 'text.secondary',
        fontSize: '1.25rem',
        display: 'block',
        transition: 'color 0.15s',
        '&:hover': { color: 'text.primary' },
      }}
    />
  </Link>
);

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);

  usePageTitle(post?.title ?? 'not found');

  if (!post) {
    return (
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography color="text.secondary">post not found.</Typography>
          <Box sx={{ mt: 2 }}>
            <BackLink />
          </Box>
        </Grid>
      </Grid>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
              <Box sx={{ pt: '5px', flexShrink: 0 }}>
                <BackLink />
              </Box>
              <Box>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {post.title}
                </Typography>
                {post.date && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {formattedDate}
                  </Typography>
                )}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                '& h1': { typography: 'h4', mt: 4, mb: 1 },
                '& h2': { typography: 'h5', mt: 3, mb: 1 },
                '& h3': { typography: 'h6', mt: 3, mb: 1 },
                '& p': { mb: 2, lineHeight: 1.75 },
                '& a': { color: 'primary.main' },
                '& code': {
                  fontFamily: 'monospace',
                  bgcolor: 'action.hover',
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: '0.875em',
                },
                '& pre': {
                  bgcolor: 'action.hover',
                  p: 2,
                  borderRadius: 1,
                  overflowX: 'auto',
                  mb: 2,
                  '& code': { bgcolor: 'transparent', p: 0 },
                },
                '& blockquote': {
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  pl: 2,
                  ml: 0,
                  my: 2,
                  color: 'text.secondary',
                },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { mb: 0.5 },
                '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, my: 2 },
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  display: 'block',
                  overflowX: 'auto',
                  mb: 2,
                },
                '& th, & td': {
                  border: '1px solid',
                  borderColor: 'divider',
                  px: 1.5,
                  py: 1,
                  textAlign: 'left',
                },
                '& th': { fontWeight: 600, bgcolor: 'action.hover' },
              }}
            >
              <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
            </Box>
          </Paper>
        </Slide>
      </Grid>
    </Grid>
  );
}

export default BlogPost;
