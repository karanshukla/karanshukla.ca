import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/CommonHooks';
import { blogPosts } from '../helpers/blogHelpers';

function BlogContent() {
  usePageTitle('blog');
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <div>
            {blogPosts.length === 0 ? (
              <Typography color="text.secondary">no posts yet.</Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {blogPosts.map((post) => (
                  <Grid key={post.slug} size={12}>
                    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <Paper
                        sx={{
                          p: 3,
                          transition: 'opacity 0.15s',
                          '&:hover': { opacity: 0.8 },
                        }}
                      >
                        <Typography variant="h6">{post.title}</Typography>
                        {post.date && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block' }}
                          >
                            {post.date}
                          </Typography>
                        )}
                        {post.description && (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {post.description}
                          </Typography>
                        )}
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </Slide>
      </Grid>
    </Grid>
  );
}

export default BlogContent;
