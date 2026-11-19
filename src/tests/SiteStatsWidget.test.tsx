import { render, screen } from '@testing-library/react';
import SiteStatsWidget from '../components/SiteStatsWidget';

vi.mock('../data/stats.json', () => ({
  default: {
    generatedAt: '2026-01-01T00:00:00.000Z',
    coverage: { lines: 50, statements: 50, branches: 50, functions: 50 },
    lighthouse: { accessibility: 80, performance: 40, lcp: 5000, cls: 0.3 },
  },
}));

describe('SiteStatsWidget with poor scores', () => {
  it('colours low scores as errors and middling scores as warnings', () => {
    render(<SiteStatsWidget open />);
    const [coverage, accessibility, performance] = screen.getAllByRole('progressbar');
    expect(coverage).toHaveClass('MuiLinearProgress-colorError');
    expect(accessibility).toHaveClass('MuiLinearProgress-colorWarning');
    expect(performance).toHaveClass('MuiLinearProgress-colorError');
  });

  it('shows slow paint and layout shift values', () => {
    render(<SiteStatsWidget open />);
    expect(screen.getByText('5.0s')).toBeInTheDocument();
    expect(screen.getByText('0.300')).toBeInTheDocument();
  });
});
