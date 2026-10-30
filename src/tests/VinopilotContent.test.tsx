import { render, screen, within } from '@testing-library/react';
import VinopilotContent from '../components/VinopilotContent';
import { laptopRequirements, npuStats, vinopilotApps } from '../constants/vinopilotApps';

describe('VinopilotContent', () => {
  it('renders the vinopilot heading', () => {
    render(<VinopilotContent />);
    expect(screen.getByRole('heading', { level: 2, name: 'vinopilot' })).toBeInTheDocument();
  });

  it('links to vinopilot.ca and the hugging face models', () => {
    render(<VinopilotContent />);
    expect(screen.getByRole('link', { name: /^vinopilot\.ca/ })).toHaveAttribute(
      'href',
      'https://vinopilot.ca',
    );
    expect(screen.getByRole('link', { name: /hugging face/ })).toHaveAttribute(
      'href',
      'https://huggingface.co/arankays',
    );
  });

  it('renders a card for every app with what it replaces', () => {
    render(<VinopilotContent />);
    for (const app of vinopilotApps) {
      expect(screen.getByRole('heading', { level: 3, name: app.name })).toBeInTheDocument();
      if (app.replaces) {
        expect(screen.getByText(`replaces ${app.replaces}`)).toBeInTheDocument();
      }
    }
  });

  it('opens every app link in a new tab', () => {
    render(<VinopilotContent />);
    for (const app of vinopilotApps) {
      for (const link of app.links) {
        const anchor = screen.getByRole('link', {
          name: `${app.name} ${link.label} (opens in new tab)`,
        });
        expect(anchor).toHaveAttribute('href', link.href);
        expect(anchor).toHaveAttribute('target', '_blank');
      }
    }
  });

  it('renders the npu stats', () => {
    render(<VinopilotContent />);
    for (const stat of npuStats) {
      expect(screen.getByText(stat.caption)).toBeInTheDocument();
    }
  });

  it('lists the laptop requirements', () => {
    render(<VinopilotContent />);
    const list = screen.getByRole('list');
    for (const requirement of laptopRequirements) {
      expect(within(list).getByText(requirement.label)).toBeInTheDocument();
    }
  });

  it('sets the page title', () => {
    render(<VinopilotContent />);
    expect(document.title).toBe('vinopilot | karan shukla');
  });
});
