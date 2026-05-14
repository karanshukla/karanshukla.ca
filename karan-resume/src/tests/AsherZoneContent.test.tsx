import { render } from '@testing-library/react';

vi.mock('../modules/AsherZone', () => ({
  AsherZone: vi.fn(),
  disableAsherZone: vi.fn(),
}));

import { AsherZone, disableAsherZone } from '../modules/AsherZone';
import AsherZoneContent from '../components/AsherZoneContent';

describe('AsherZoneContent', () => {
  afterEach(() => vi.clearAllMocks());

  it('calls AsherZone on mount', () => {
    render(<AsherZoneContent />);
    expect(AsherZone).toHaveBeenCalledTimes(1);
  });

  it('calls disableAsherZone on unmount', () => {
    const { unmount } = render(<AsherZoneContent />);
    unmount();
    expect(disableAsherZone).toHaveBeenCalled();
  });

  it('renders null', () => {
    const { container } = render(<AsherZoneContent />);
    expect(container.firstChild).toBeNull();
  });
});
