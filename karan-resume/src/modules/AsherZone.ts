import { getRawGithubImageUrl } from "../helpers/CommonHelpers";

export function AsherZone() {
    const imageUrls = [
        getRawGithubImageUrl('asher1.jpg'),
        getRawGithubImageUrl('asher2.jpg'),
        getRawGithubImageUrl('asher3.jpg'),
        getRawGithubImageUrl('asher4.jpg'),
        getRawGithubImageUrl('asher5.jpg'),
        getRawGithubImageUrl('asher6.jpg'),
        getRawGithubImageUrl('asher7.jpg'),
        getRawGithubImageUrl('asher8.jpg'),
    ];

    function createImage() {
        const image = new Image();
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        const rootContainer = document.getElementById('root');

        image.src = randomImageUrl;
        image.style.position = 'absolute';
        image.style.width = '200px';
        image.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
        image.style.top = `${Math.random() * (window.innerHeight - 300)}px`;
        if (rootContainer) {
            rootContainer.appendChild(image);
        }
        else (document.body.appendChild(image));

        var speedX = Math.random() * 2 - 1; // Random horizontal speed between -1 and 1
        var speedY = Math.random() * 2 - 1; // Random vertical speed between -1 and 1

        function animate() {
            let x = parseFloat(image.style.left);
            let y = parseFloat(image.style.top);

            x += speedX;
            y += speedY;

            if (x < 0 || x > window.innerWidth - image.width) {
                speedX *= -1; // Reverse horizontal direction if image hits left or right edge
            }

            if (y < 0 || y > window.innerHeight - image.height) {
                speedY *= -1; // Reverse vertical direction if image hits top or bottom edge
            }

            image.style.left = `${x}px`;
            image.style.top = `${y}px`;
            image.style.transition = 'transform 2s';

            requestAnimationFrame(animate);
        }

        animate();
    }

    const randomNumber = Math.floor(Math.random() * 50) + 1;

    for (let i = 0; i < randomNumber; i++) {
        createImage();
    }
}