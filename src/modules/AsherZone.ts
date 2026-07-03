import asher1 from '../assets/asher1.jpg';
import asher2 from '../assets/asher2.jpg';
import asher3 from '../assets/asher3.jpg';
import asher4 from '../assets/asher4.jpg';
import asher5 from '../assets/asher5.jpg';
import asher6 from '../assets/asher6.jpg';
import asher7 from '../assets/asher7.jpg';
import asher8 from '../assets/asher8.jpg';

const asherImages: string[] = [asher1, asher2, asher3, asher4, asher5, asher6, asher7, asher8];

const floatingEmojis = [
  '🐱',
  '🐈',
  '🐈‍⬛',
  '🐾',
  '😸',
  '😺',
  '🙀',
  '🌿',
  '🌱',
  '🌵',
  '🪴',
  '🌸',
  '🌺',
  '🌻',
  '💐',
  '🍃',
  '🌾',
  '🍀',
  '🪷',
  '🌼',
  '🍄',
  '🐟',
  '🦋',
  '🐝',
  '🦎',
  '🐸',
  '🦔',
  '✨',
  '💫',
  '⭐',
  '🌙',
  '☀️',
  '🌈',
  '🍵',
  '🧃',
  '🫖',
];

const codeSnippets = [
  'isRunning = true;',
  'requestAnimationFrame(frame);',
  'image.style.transform =\n  `rotate(${rotation}deg)`;',
  'disableAsherZone();',
  'setDrawerOpen((prev) => !prev);',
  'useKeyboardShortcuts();',
  'const count = Math.floor(\n  Math.random() * 2) + 6;',
  '<Outlet />',
  "navigate('/');",
  "el.style.pointerEvents\n  = 'none';",
  'flexGrow: 1,',
  "height: '100vh',",
  'dx = -dx;',
  'dy = -dy;',
  'ΣF = ma',
  'PV = nRT',
  'τ = r × F',
  'σ = Eε',
  'Re = (ρvD)/μ',
  'ΔS ≥ 0',
  'E = mc²',
  '∇ × B = μ₀J',
  'cat.isBunting = true;',
  'while(cat.seesLaser) { run(); }',
  'if (isSleeping) { doNotDisturb(); }',
  'cat.purrLevel = 9000;',
  'feedMeNow();',
  'res.status(200).json(data);',
  'docker-compose up -d',
  'git commit -am "fixed it"',
  'const [data, setData] = useState(null);',
  'await pgClient.query("SELECT...");',
  'chmod +x ./deploy.sh',
  'socket.emit("heartbeat", { id });',
  'process.env.NODE_ENV === "prod"',
  'new Promise((resolve) =>\n  setTimeout(resolve, 1000));',
  'return <Component {...props} />',
  'npm install --save-dev chaos',
  'git push --force 😈',
  '// TODO: fix this later',
  '// this works, not sure why',
  'catch (e) { /* pray */ }',
  'export default function App() {',
  'z-index: 9999;',
  'console.log("here");',
  'console.log("here2");',
  'border: 1px solid red;',
  'yarn why lodash',
  'rm -rf node_modules',
  '!!undefined === false',
  'NaN !== NaN',
  '[] + [] === ""',
  'docker system prune -af',
  'git push --force-with-lease',
  'chmod 600 ~/.ssh/id_rsa',
  'HEALTHCHECK --interval=30s',
  'failover: "active-passive"',
  'Caddy-Trace-ID: 7f8a3c9b',
  'process.env.NODE_ENV === "prod"',
  'await pgClient.connect();',
  'proxy_set_header X-Real-IP',
  'ttl: 3600, // cache hit',
];

interface ElementState {
  el: HTMLElement;
  x: number;
  y: number;
  dx: number;
  dy: number;
  spinSpeed: number;
  rotation: number;
  w: number;
  h: number;
}

interface BurstParticle {
  el: HTMLElement;
  x: number;
  y: number;
  dx: number;
  dy: number;
  spinSpeed: number;
  rotation: number;
  w: number;
  h: number;
  framesLeft: number;
}

let states: ElementState[] = [];
let burstParticles: BurstParticle[] = [];
let isRunning = false;
let rafId: number | null = null;
let clickHandler: ((e: MouseEvent) => void) | null = null;

function getContentBounds(): { left: number; top: number; width: number; height: number } {
  const el = document.getElementById('main-content');
  if (el) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }
  return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
}

function randomVelocity(): number {
  return (Math.random() - 0.5) * 1 + (Math.random() > 0.5 ? 0.5 : -0.5);
}

function placeElement(el: HTMLElement, w: number, h: number): ElementState {
  el.dataset.asher = 'true';
  el.style.position = 'fixed';
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.willChange = 'transform';
  el.style.zIndex = '9999';
  el.style.pointerEvents = 'none';
  el.setAttribute('aria-hidden', 'true');

  const bounds = getContentBounds();
  const x = bounds.left + Math.random() * Math.max(0, bounds.width - w);
  const y = bounds.top + Math.random() * Math.max(0, bounds.height - h);
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  document.body.appendChild(el);

  return {
    el,
    x,
    y,
    dx: randomVelocity(),
    dy: randomVelocity(),
    spinSpeed: (Math.random() * 0.15 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    rotation: 0,
    w,
    h,
  };
}

function createImage(): ElementState {
  const image = new Image();
  image.src = asherImages[Math.floor(Math.random() * asherImages.length)];
  image.alt = '';
  image.style.width = '260px';
  image.style.height = 'auto';
  image.style.borderRadius = '12px';
  image.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  return placeElement(image, 260, 220);
}

function createEmoji(): ElementState {
  const el = document.createElement('div');
  el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
  el.style.fontSize = '3rem';
  el.style.lineHeight = '1';
  el.style.userSelect = 'none';
  return placeElement(el, 60, 60);
}

function createCodeSnippet(): ElementState {
  const el = document.createElement('pre');
  el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  el.style.fontFamily = "'Fira Code', 'Cascadia Code', monospace";
  el.style.fontSize = '0.95rem';
  el.style.lineHeight = '1.5';
  el.style.padding = '8px 12px';
  el.style.margin = '0';
  el.style.background = 'rgba(20, 20, 30, 0.92)';
  el.style.color = '#a6e22e';
  el.style.border = '1px solid rgba(166, 226, 46, 0.3)';
  el.style.borderRadius = '6px';
  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
  el.style.whiteSpace = 'pre';
  el.style.userSelect = 'none';
  return placeElement(el, 260, 50);
}

function createBurstElement(): { el: HTMLElement; w: number; h: number } {
  const type = Math.floor(Math.random() * 3);
  if (type === 0) {
    const el = document.createElement('div');
    el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    el.style.fontSize = '2.5rem';
    el.style.lineHeight = '1';
    el.style.userSelect = 'none';
    return { el, w: 50, h: 50 };
  } else if (type === 1) {
    const img = new Image();
    img.src = asherImages[Math.floor(Math.random() * asherImages.length)];
    img.alt = '';
    img.style.width = '140px';
    img.style.height = 'auto';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
    return { el: img, w: 140, h: 110 };
  } else {
    const pre = document.createElement('pre');
    pre.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    pre.style.fontFamily = "'Fira Code', 'Cascadia Code', monospace";
    pre.style.fontSize = '0.85rem';
    pre.style.lineHeight = '1.5';
    pre.style.padding = '6px 10px';
    pre.style.margin = '0';
    pre.style.background = 'rgba(20, 20, 30, 0.92)';
    pre.style.color = '#a6e22e';
    pre.style.border = '1px solid rgba(166, 226, 46, 0.3)';
    pre.style.borderRadius = '6px';
    pre.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
    pre.style.whiteSpace = 'pre';
    pre.style.userSelect = 'none';
    return { el: pre, w: 220, h: 50 };
  }
}

function spawnBurst(clientX: number, clientY: number): void {
  const count = Math.floor(Math.random() * 4) + 6;
  for (let i = 0; i < count; i++) {
    const { el, w, h } = createBurstElement();
    el.style.position = 'fixed';
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '10000';
    el.style.willChange = 'transform, opacity';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = Math.random() * 4 + 2;
    burstParticles.push({
      el,
      x: clientX,
      y: clientY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      spinSpeed: (Math.random() * 0.15 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      rotation: 0,
      w,
      h,
      framesLeft: 600,
    });
  }
}

// Single shared loop — one getBoundingClientRect call per frame regardless of element count
function tick(): void {
  if (!isRunning) return;

  const bounds = getContentBounds();
  const maxX = bounds.left + bounds.width;
  const maxY = bounds.top + bounds.height;

  for (const s of states) {
    if (s.x + s.w >= maxX || s.x <= bounds.left) s.dx = -s.dx;
    if (s.y + s.h >= maxY || s.y <= bounds.top) s.dy = -s.dy;

    s.x = Math.max(bounds.left, Math.min(s.x + s.dx, maxX - s.w));
    s.y = Math.max(bounds.top, Math.min(s.y + s.dy, maxY - s.h));
    s.rotation += s.spinSpeed;

    s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotation}deg)`;
  }

  for (let i = burstParticles.length - 1; i >= 0; i--) {
    const p = burstParticles[i];
    p.framesLeft--;

    if (p.x + p.w >= maxX || p.x <= bounds.left) p.dx = -p.dx;
    if (p.y + p.h >= maxY || p.y <= bounds.top) p.dy = -p.dy;

    p.x = Math.max(bounds.left, Math.min(p.x + p.dx, maxX - p.w));
    p.y = Math.max(bounds.top, Math.min(p.y + p.dy, maxY - p.h));
    p.rotation += p.spinSpeed;

    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;

    if (p.framesLeft <= 60) {
      p.el.style.opacity = String(Math.max(0, p.framesLeft / 60));
    }

    if (p.framesLeft <= 0) {
      p.el.remove();
      burstParticles.splice(i, 1);
    }
  }

  rafId = requestAnimationFrame(tick);
}

export function AsherZone(): void {
  disableAsherZone();
  isRunning = true;

  const imageCount = Math.floor(Math.random() * 2) + 8;
  const emojiCount = Math.floor(Math.random() * 4) + 11;
  const snippetCount = Math.floor(Math.random() * 3) + 7;

  for (let i = 0; i < imageCount; i++) states.push(createImage());
  for (let i = 0; i < emojiCount; i++) states.push(createEmoji());
  for (let i = 0; i < snippetCount; i++) states.push(createCodeSnippet());

  clickHandler = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY);
  document.getElementById('main-content')?.addEventListener('click', clickHandler);

  rafId = requestAnimationFrame(tick);
}

export function disableAsherZone(): void {
  isRunning = false;
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (clickHandler) {
    document.getElementById('main-content')?.removeEventListener('click', clickHandler);
    clickHandler = null;
  }
  burstParticles.forEach((p) => p.el.remove());
  burstParticles = [];
  document.querySelectorAll<HTMLElement>('[data-asher]').forEach((el) => el.remove());
  states = [];
}
