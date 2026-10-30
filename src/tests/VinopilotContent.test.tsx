import { render, screen } from '@testing-library/react';
import VinopilotContent from '../components/VinopilotContent';

describe('VinopilotContent', () => {
  it('renders the vinopilot heading', () => {
    render(<VinopilotContent />);
    expect(screen.getByRole('heading', { name: 'vinopilot' })).toBeInTheDocument();
  });

  it('links to vinopilot.ca and the hugging face models', () => {
    render(<VinopilotContent />);
    expect(screen.getByRole('link', { name: /vinopilot\.ca/ })).toHaveAttribute(
      'href',
      'https://vinopilot.ca',
    );
    expect(screen.getByRole('link', { name: /hugging face/ })).toHaveAttribute(
      'href',
      'https://huggingface.co/arankays',
    );
  });

  it('sets the page title', () => {
    render(<VinopilotContent />);
    expect(document.title).toBe('vinopilot | karan shukla');
  });
});
