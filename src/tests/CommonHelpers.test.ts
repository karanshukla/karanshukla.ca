import { isLandscape } from '../helpers/CommonHelpers';

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
