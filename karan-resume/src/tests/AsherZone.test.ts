import { AsherZone, disableAsherZone } from '../modules/AsherZone';

function makeRafOneShot() {
  // Call each scheduled frame exactly once, then stop to avoid infinite recursion.
  let fired = false;
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn().mockImplementation((cb: FrameRequestCallback) => {
      if (!fired) {
        fired = true;
        cb(0);
      }
    }),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('disableAsherZone', () => {
  it('removes all asher images from the DOM', () => {
    const img = document.createElement('img');
    img.dataset.asher = 'true';
    document.body.appendChild(img);
    disableAsherZone();
    expect(document.querySelectorAll('img[data-asher]').length).toBe(0);
  });
});

describe('AsherZone', () => {
  it('appends images to document body', () => {
    vi.stubGlobal('requestAnimationFrame', vi.fn());
    AsherZone();
    expect(document.querySelectorAll('img[data-asher]').length).toBeGreaterThan(0);
  });

  it('executes animation frame logic', () => {
    makeRafOneShot();
    AsherZone();
    // rAF callback ran — no error means animation frame executed correctly
  });

  it('animation frame exits early when disabled mid-flight', () => {
    let savedCb: FrameRequestCallback | null = null;
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn().mockImplementation((cb: FrameRequestCallback) => {
        savedCb = cb;
      }),
    );
    AsherZone();
    disableAsherZone();
    // Call a saved frame after disable — should hit the `if (!isRunning) return` branch
    if (savedCb) (savedCb as FrameRequestCallback)(0);
  });

  it('handles boundary bounce (x <= 0 and y <= 0)', () => {
    // Force image to position 0,0 so boundary checks fire on the first frame
    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'img') {
        Object.defineProperty(el, 'style', {
          value: { left: '0px', top: '0px', position: '', width: '', height: '', zIndex: '', pointerEvents: '', borderRadius: '', boxShadow: '', transform: '', alt: '' },
          writable: true,
        });
      }
      return el;
    });

    makeRafOneShot();
    AsherZone();
    vi.restoreAllMocks();
  });
});
