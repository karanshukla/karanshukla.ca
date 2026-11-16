import { render, screen, within } from '@testing-library/react';
import VinopilotContent from '../components/VinopilotContent';
import { deepDives, modelFixes, suiteApps } from '../constants/vinopilotApps';

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

  it('renders each deep dive with every workaround in its own section', () => {
    render(<VinopilotContent />);
    for (const project of deepDives) {
      const section = screen.getByRole('region', { name: project.name });
      for (const workaround of project.workarounds) {
        expect(within(section).getByText(workaround.problem)).toBeInTheDocument();
      }
      for (const number of project.numbers) {
        expect(within(section).getByText(number)).toBeInTheDocument();
      }
    }
  });

  it('links every model fix to its hugging face repo', () => {
    render(<VinopilotContent />);
    for (const model of modelFixes) {
      expect(
        screen.getByRole('link', { name: `${model.model} (opens in new tab)` }),
      ).toHaveAttribute('href', `https://huggingface.co/arankays/${model.model}`);
    }
  });

  it('renders a card for every other app in the suite', () => {
    render(<VinopilotContent />);
    for (const app of suiteApps) {
      expect(screen.getByRole('heading', { level: 3, name: app.name })).toBeInTheDocument();
    }
  });

  it('opens every project link in a new tab', () => {
    render(<VinopilotContent />);
    for (const project of [...deepDives, ...suiteApps]) {
      for (const link of project.links) {
        const anchor = screen.getByRole('link', {
          name: `${project.name} ${link.label} (opens in new tab)`,
        });
        expect(anchor).toHaveAttribute('href', link.href);
        expect(anchor).toHaveAttribute('target', '_blank');
      }
    }
  });

  it('credits the upstream projects of the forks', () => {
    render(<VinopilotContent />);
    expect(
      screen.getByRole('link', { name: 'vinoauthface upstream (opens in new tab)' }),
    ).toHaveAttribute('href', 'https://github.com/pfalkingham/authFace');
    expect(
      screen.getByRole('link', { name: 'vinoopeneffects upstream (opens in new tab)' }),
    ).toHaveAttribute('href', 'https://github.com/funinkina/openeffects');
    expect(
      screen.getByRole('link', { name: 'vinopop upstream (opens in new tab)' }),
    ).toHaveAttribute('href', 'https://github.com/GaimsDevSoftware/linuxpop');
  });

  it('sets the page title', () => {
    render(<VinopilotContent />);
    expect(document.title).toBe('vinopilot | karan shukla');
  });
});
