import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import StarIcon from '@mui/icons-material/Star';
import { useGitHubRepo } from '../hooks/CommonHooks';

interface ProjectCardProps {
  owner: string;
  repo: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
}

export function RepoStats({ owner, repo, url }: { owner: string; repo: string; url: string }) {
  const { data, loading } = useGitHubRepo(owner, repo);

  if (loading) return <Skeleton variant="rectangular" height={24} sx={{ mt: 1, borderRadius: 1 }} />;
  if (!data) return null;

  const updatedAt = new Date(data.updated_at).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
      {data.language && <Chip label={data.language} size="small" variant="outlined" />}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <StarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">{data.stargazers_count}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ForkRightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary">{data.forks_count}</Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">updated {updatedAt}</Typography>
      <Link href={url} target="_blank" rel="noopener noreferrer" variant="caption">
        view on github
      </Link>
    </Box>
  );
}

export default function ProjectCard({
  owner,
  repo,
  title,
  subtitle,
  description,
  techStack,
  liveUrl,
}: ProjectCardProps) {
  const githubUrl = `https://github.com/${owner}/${repo}`;

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {liveUrl && (
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer" variant="caption">
            {liveUrl.replace(/^https?:\/\//, '')}
          </Link>
        )}
      </Box>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {subtitle}
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5, flexGrow: 1 }}>
        {description}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
        {techStack.map((t) => (
          <Chip key={t} label={t} size="small" color="primary" variant="outlined" />
        ))}
      </Box>

      <RepoStats owner={owner} repo={repo} url={githubUrl} />
    </Paper>
  );
}
