import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DynamicChip from '../components/DynamicChip';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <DynamicChip />
    </MemoryRouter>,
  );
}

describe('DynamicChip', () => {
  it('shows "home" at /', () => {
    renderAt('/');
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  it('shows "experience" at /experience', () => {
    renderAt('/experience');
    expect(screen.getByText('experience')).toBeInTheDocument();
  });

  it('shows "hobbies" at /hobbies', () => {
    renderAt('/hobbies');
    expect(screen.getByText('hobbies')).toBeInTheDocument();
  });

  it('shows "asher zone" at /asher-zone', () => {
    renderAt('/asher-zone');
    expect(screen.getByText('asher zone')).toBeInTheDocument();
  });

  it('falls back to stripped pathname for unknown routes', () => {
    renderAt('/unknown-page');
    expect(screen.getByText('unknown-page')).toBeInTheDocument();
  });
});
