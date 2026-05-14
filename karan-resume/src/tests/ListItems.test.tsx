import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MainListItems, SecondaryListItems } from '../components/ListItems';

describe('MainListItems', () => {
  it('renders all nav items', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainListItems />
      </MemoryRouter>,
    );
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('experience')).toBeInTheDocument();
    expect(screen.getByText('hobbies')).toBeInTheDocument();
    expect(screen.getByText('asher zone')).toBeInTheDocument();
  });

  it('shows exit button when on /asher-zone', () => {
    render(
      <MemoryRouter initialEntries={['/asher-zone']}>
        <MainListItems />
      </MemoryRouter>,
    );
    expect(screen.getByText('exit the asher zone')).toBeInTheDocument();
  });

  it('does not show exit button on other routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainListItems />
      </MemoryRouter>,
    );
    expect(screen.queryByText('exit the asher zone')).not.toBeInTheDocument();
  });
});

describe('SecondaryListItems', () => {
  it('renders all external links', () => {
    render(
      <MemoryRouter>
        <SecondaryListItems />
      </MemoryRouter>,
    );
    expect(screen.getByText('github')).toBeInTheDocument();
    expect(screen.getByText('linkedin')).toBeInTheDocument();
    expect(screen.getByText('bluesky')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
  });
});
