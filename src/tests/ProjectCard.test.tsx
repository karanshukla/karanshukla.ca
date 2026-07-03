import { render, screen, waitFor } from '@testing-library/react';
import { RepoStats } from '../components/ProjectCard';
import ProjectCard from '../components/ProjectCard';

describe('RepoStats — fetch error', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('renders nothing when fetch fails', async () => {
    const { container } = render(
      <RepoStats owner="x" repo="y" url="https://github.com/x/y" />,
    );
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});

describe('ProjectCard', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            html_url: 'https://github.com/x/y',
            stargazers_count: 3,
            forks_count: 1,
            language: 'TypeScript',
            updated_at: '2026-01-01T00:00:00Z',
          }),
      }),
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('renders title, subtitle and description', () => {
    render(
      <ProjectCard
        owner="x"
        repo="y"
        title="my project"
        subtitle="a cool thing"
        description="does stuff"
        techStack={['React', 'TypeScript']}
      />,
    );
    expect(screen.getByText('my project')).toBeInTheDocument();
    expect(screen.getByText('a cool thing')).toBeInTheDocument();
    expect(screen.getByText('does stuff')).toBeInTheDocument();
  });

  it('renders tech stack chips', () => {
    render(
      <ProjectCard
        owner="x"
        repo="y"
        title="p"
        subtitle="s"
        description="d"
        techStack={['React', 'Go']}
      />,
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('renders live url when provided', () => {
    render(
      <ProjectCard
        owner="x"
        repo="y"
        title="p"
        subtitle="s"
        description="d"
        techStack={[]}
        liveUrl="https://example.com"
      />,
    );
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });
});
