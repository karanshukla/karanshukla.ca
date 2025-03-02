import { getRawGithubImageUrl } from "../helpers/CommonHelpers";

const asherImageUrls: Array<string> = [
    getRawGithubImageUrl('asher1.jpg'),
    getRawGithubImageUrl('asher2.jpg'),
    getRawGithubImageUrl('asher3.jpg'),
    getRawGithubImageUrl('asher4.jpg'),
    getRawGithubImageUrl('asher5.jpg'),
    getRawGithubImageUrl('asher6.jpg'),
    getRawGithubImageUrl('asher7.jpg'),
    getRawGithubImageUrl('asher8.jpg'),
];

function createAndPlaceImage(imageUrls: Array<string>): HTMLImageElement {
    const image: HTMLImageElement = new Image();
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    const rootContainer: HTMLElement = document.getElementById('root')!;

    image.src = randomImageUrl;
    image.style.position = 'absolute';
    image.style.width = '200px';
    image.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
    image.style.top = `${Math.random() * (window.innerHeight - 300)}px`;
    if (rootContainer) {
        rootContainer.appendChild(image);
    } else {
        document.body.appendChild(image);
    }
    return image;
}

function recursiveAnimate(image: HTMLImageElement, x: number, y: number, dx: number, dy: number, rotation: number = 0, rotationFactor: number): void {
    const padding = 100;
    if (x + image.width + padding >= window.innerWidth || x <= padding) {
        dx = -dx;
    }

    if (y + image.height + padding >= window.innerHeight || y <= padding) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    // Slower and randomized rotation per image
    const rotationSpeed = Math.sin(Date.now() / 2000) * 180 * rotationFactor;
    rotation += rotationSpeed;

    image.style.left = `${x}px`;
    image.style.top = `${y}px`;
    image.style.transform = `rotate(${rotation}deg)`;
    image.style.transition = `transform ${1 + Math.random()}s ease-in-out`;

    requestAnimationFrame(() => recursiveAnimate(image, x, y, dx, dy, rotation, rotationFactor));
}

function animateImage(image: HTMLImageElement): void {
    let x = Math.random() * (window.innerWidth - 400);
    let y = Math.random() * (window.innerHeight - 400);
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    let rotationFactor = Math.random() * 0.5; // Random rotation speed factor per image

    recursiveAnimate(image, x, y, dx, dy, 0, rotationFactor);
}

export function AsherZone() {
    disableAsherZone();
    let newImageArray = [] as Array<HTMLImageElement>;
    const randomNumber: number = Math.floor(Math.random() * 75) + 10;

    for (let i: number = 0; i < randomNumber; i++) {
        newImageArray.push(createAndPlaceImage(asherImageUrls));
    }

    newImageArray.forEach((image) => {
        animateImage(image);
    });
}

export function disableAsherZone() {
    const rootContainer: HTMLElement = document.getElementById('root')!;
    const images: NodeListOf<HTMLImageElement> = rootContainer.querySelectorAll('img');
    images.forEach((image) => {
        image.remove();
    });
}

