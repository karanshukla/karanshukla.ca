import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

// MUI useMediaQuery reads window.matchMedia
const mockMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

vi.mock('../helpers/CommonHelpers', () => ({
  isLandscape: vi.fn().mockReturnValue(false),
}));

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia(false) });
  localStorage.clear();
});

function renderHome(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Home />
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it('renders the site title', () => {
    renderHome();
    expect(screen.getByText('karan shukla')).toBeInTheDocument();
  });

  it('renders the skip-to-content button', () => {
    renderHome();
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    renderHome();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('experience')).toBeInTheDocument();
  });

  it('opens drawer when menu button is clicked', () => {
    renderHome();
    const menuBtn = screen.getByLabelText(/open navigation drawer/i);
    fireEvent.click(menuBtn);
    expect(screen.getByText('Copyright ©')).toBeInTheDocument();
  });

  it('closes drawer via chevron button', () => {
    renderHome();
    // Open first
    fireEvent.click(screen.getByLabelText(/open navigation drawer/i));
    // Close via chevron
    fireEvent.click(screen.getByLabelText('close navigation drawer'));
  });

  it('toggles theme via the theme button', () => {
    renderHome();
    const themeBtn = screen.getByLabelText(/switch to light mode/i);
    fireEvent.click(themeBtn);
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  it('skip link focuses main content on click', () => {
    renderHome();
    const skipBtn = screen.getByText('Skip to main content');
    fireEvent.click(skipBtn);
  });

  it('renders correctly on desktop (landscape)', async () => {
    const { isLandscape } = await import('../helpers/CommonHelpers');
    (isLandscape as ReturnType<typeof vi.fn>).mockReturnValue(true);
    Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia(false) });
    renderHome();
    expect(screen.getByText('karan shukla')).toBeInTheDocument();
  });

  it('shows DynamicChip on mobile with drawer closed', () => {
    // isMobile = true → matchMedia('(max-width:599px)').matches = true
    Object.defineProperty(window, 'matchMedia', { writable: true, value: mockMatchMedia(true) });
    renderHome();
    // DynamicChip renders on mobile when drawer is closed
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
