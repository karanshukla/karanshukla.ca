import asher1 from '../assets/asher1.jpg';
import asher2 from '../assets/asher2.jpg';
import asher3 from '../assets/asher3.jpg';
import asher4 from '../assets/asher4.jpg';
import asher5 from '../assets/asher5.jpg';
import asher6 from '../assets/asher6.jpg';
import asher7 from '../assets/asher7.jpg';
import asher8 from '../assets/asher8.jpg';

const asherImages: string[] = [asher1, asher2, asher3, asher4, asher5, asher6, asher7, asher8];

let isRunning = false;

function createAndPlaceImage(): HTMLImageElement {
    const image = new Image();
    image.src = asherImages[Math.floor(Math.random() * asherImages.length)];
    image.dataset.asher = 'true';
    image.style.position = 'fixed';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.style.width = '240px';
    image.style.height = 'auto';
    image.style.left = `${Math.random() * Math.max(0, window.innerWidth - 280)}px`;
    image.style.top = `${Math.random() * Math.max(0, window.innerHeight - 280)}px`;
    image.style.zIndex = '9999';
    image.style.pointerEvents = 'none';
    image.style.borderRadius = '12px';
    image.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    document.body.appendChild(image);
    return image;
}

function animateImage(image: HTMLImageElement): void {
    let x = parseFloat(image.style.left);
    let y = parseFloat(image.style.top);
    // Guarantee non-trivial velocity in both axes
    let dx = (Math.random() - 0.5) * 3 + (Math.random() > 0.5 ? 1.5 : -1.5);
    let dy = (Math.random() - 0.5) * 3 + (Math.random() > 0.5 ? 1.5 : -1.5);
    const spinSpeed = (Math.random() * 1.2 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
    let rotation = 0;

    function frame() {
        if (!isRunning) return;

        const w = image.offsetWidth || 240;
        const h = image.offsetHeight || 240;

        if (x + w >= window.innerWidth || x <= 0) dx = -dx;
        if (y + h >= window.innerHeight || y <= 0) dy = -dy;

        x += dx;
        y += dy;
        rotation += spinSpeed;

        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.style.transform = `rotate(${rotation}deg)`;

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

export function AsherZone(): void {
    disableAsherZone();
    isRunning = true;
    const count = Math.floor(Math.random() * 50) + 30;
    for (let i = 0; i < count; i++) {
        animateImage(createAndPlaceImage());
    }
}

export function disableAsherZone(): void {
    isRunning = false;
    document.querySelectorAll<HTMLImageElement>('img[data-asher]').forEach(img => img.remove());
}
