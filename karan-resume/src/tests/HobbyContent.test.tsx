import { render, screen } from '@testing-library/react';
import HobbyContent from '../components/HobbyContent';

describe('HobbyContent', () => {
  it('renders sport section', () => {
    render(<HobbyContent />);
    expect(screen.getByText('sport')).toBeInTheDocument();
  });

  it('renders technology section', () => {
    render(<HobbyContent />);
    expect(screen.getByText('technology')).toBeInTheDocument();
  });

  it('renders music section', () => {
    render(<HobbyContent />);
    expect(screen.getByText('music')).toBeInTheDocument();
  });

  it('renders environmental activism section', () => {
    render(<HobbyContent />);
    expect(screen.getByText('environmental activism')).toBeInTheDocument();
  });
});
