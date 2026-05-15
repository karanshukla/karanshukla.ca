import { render, screen } from '@testing-library/react';
import GitHubPulse from '../components/GitHubPulse';
import pulseData from '../data/pulse.json';

describe('GitHubPulse', () => {
  it('renders the github pulse label', () => {
    render(<GitHubPulse />);
    expect(screen.getByText('github pulse (llm summarised)')).toBeInTheDocument();
  });

  it('renders the summary text from pulse.json', () => {
    render(<GitHubPulse />);
    expect(screen.getByText(`"${pulseData.summary}"`)).toBeInTheDocument();
  });

  it('renders the commit count chip', () => {
    render(<GitHubPulse />);
    expect(screen.getByText(/commits/i)).toBeInTheDocument();
  });

  it('renders a generated-at timestamp', () => {
    render(<GitHubPulse />);
    expect(screen.getByText(/generated/i)).toBeInTheDocument();
  });
});
