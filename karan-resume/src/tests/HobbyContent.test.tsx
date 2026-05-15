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

  it('renders currently learning chips', () => {
    render(<HobbyContent />);
    expect(screen.getByText('jazz guitar')).toBeInTheDocument();
    expect(screen.getByText('calisthenics')).toBeInTheDocument();
    expect(screen.getByText('food science')).toBeInTheDocument();
  });

  it('renders recently enjoyed section header', () => {
    render(<HobbyContent />);
    expect(screen.getByText('recently enjoyed')).toBeInTheDocument();
  });

  it('renders jujutsu kaisen card', () => {
    render(<HobbyContent />);
    expect(screen.getByText('jujutsu kaisen')).toBeInTheDocument();
    expect(screen.getByText('gege akutami')).toBeInTheDocument();
    expect(screen.getByText('manga')).toBeInTheDocument();
  });

  it('renders kind of blue card', () => {
    render(<HobbyContent />);
    expect(screen.getByText('kind of blue')).toBeInTheDocument();
    expect(screen.getByText('miles davis')).toBeInTheDocument();
    expect(screen.getByText('jazz')).toBeInTheDocument();
  });

  it('renders four asher cat photos', () => {
    render(<HobbyContent />);
    const photos = screen.getAllByAltText('asher the cat');
    expect(photos).toHaveLength(4);
  });

  it('renders the asher section header', () => {
    render(<HobbyContent />);
    expect(screen.getByText('asher')).toBeInTheDocument();
  });
});
