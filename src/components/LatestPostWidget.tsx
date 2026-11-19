import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import { Link as RouterLink } from 'react-router';
import { blogPosts, readingMinutes } from '../helpers/blogHelpers';

function LatestPostWidget() {
  const [post] = blogPosts;

  return (
    <Paper sx={{ p: 3, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <ArticleIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <Typography
          variant="overline"
          sx={{ textTransform: 'none', lineHeight: 1, color: 'text.secondary' }}
        >
          latest post
        </Typography>
        {post && (
          <Chip
            label={`${readingMinutes(post.content)} min read`}
            size="small"
            variant="outlined"
            sx={{ ml: 'auto', fontSize: '0.7rem' }}
          />
        )}
      </Box>

      {post ? (
        <>
          <Link
            component={RouterLink}
            to={`/blog/${post.slug}`}
            underline="hover"
            sx={{ color: 'text.primary' }}
          >
            <Typography variant="h6">{post.title}</Typography>
          </Link>
          {post.date && (
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              {post.date}
            </Typography>
          )}
          {post.description && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {post.description}
            </Typography>
          )}
          <Link
            component={RouterLink}
            to="/blog"
            underline="hover"
            variant="body2"
            sx={{ mt: 'auto', pt: 1.5 }}
          >
            all posts →
          </Link>
        </>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          no posts yet
        </Typography>
      )}
    </Paper>
  );
}

export default LatestPostWidget;
