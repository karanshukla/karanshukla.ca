import { render, screen, waitFor } from '@testing-library/react';
import ExperienceContent from '../components/ExperienceContent';

const mockRepoData = {
  html_url: 'https://github.com/karanshukla/test',
  stargazers_count: 1,
  forks_count: 0,
  language: 'TypeScript',
  updated_at: '2026-01-01T00:00:00Z',
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockRepoData) }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ExperienceContent', () => {
  it('renders the current role', () => {
    render(<ExperienceContent />);
    expect(
      screen.getByText(/software developer \/ technical support engineer/i),
    ).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<ExperienceContent />);
    expect(screen.getByText(/university of toronto/i)).toBeInTheDocument();
  });

  it('renders all four project cards', () => {
    render(<ExperienceContent />);
    expect(screen.getByText('navyfragen')).toBeInTheDocument();
    expect(screen.getByText('asher-cli')).toBeInTheDocument();
    expect(screen.getByText('twtournament')).toBeInTheDocument();
    expect(screen.getByText('vinowhisper')).toBeInTheDocument();
  });

  it('renders live urls for projects', () => {
    render(<ExperienceContent />);
    expect(screen.getByText('navyfragen.app')).toBeInTheDocument();
    expect(screen.getByText('twtournament.app')).toBeInTheDocument();
  });

  it('shows github links after fetch resolves', async () => {
    render(<ExperienceContent />);
    await waitFor(() => {
      expect(screen.getAllByText('view on github')).toHaveLength(4);
    });
  });
});
