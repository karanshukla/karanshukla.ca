import { isLandscape, moveUrlPathIntoHashRoute } from '../helpers/CommonHelpers';

describe('isLandscape', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns true when matchMedia matches landscape', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    expect(isLandscape()).toBe(true);
  });

  it('returns false when matchMedia does not match landscape', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    expect(isLandscape()).toBe(false);
  });
});

describe('moveUrlPathIntoHashRoute', () => {
  afterEach(() => window.history.replaceState(null, '', '/'));

  it('moves a hash-free path into the hash route', () => {
    window.history.replaceState(null, '', '/blog/some-post?ref=x');
    moveUrlPathIntoHashRoute();
    expect(window.location.pathname).toBe('/');
    expect(window.location.search).toBe('?ref=x');
    expect(window.location.hash).toBe('#/blog/some-post');
  });

  it('leaves an existing hash route alone', () => {
    window.history.replaceState(null, '', '/#/experience');
    moveUrlPathIntoHashRoute();
    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe('#/experience');
  });
});
