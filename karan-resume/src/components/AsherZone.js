export function AsherZone() {
    const imageUrls = [
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher1.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher2.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher3.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher4.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher5.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher6.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher7.jpg',
        'https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/asher8.jpg'
    ];

    function createImage() {
        const image = new Image();
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        image.src = randomImageUrl;
        image.style.position = 'absolute';
        image.style.width = '200px';
        image.style.left = `${Math.random() * window.innerWidth}px`;
        image.style.top = `${Math.random() * window.innerHeight}px`;
        image.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotate the image randomly
        document.body.appendChild(image);

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
            image.style.transform = `rotate(${Math.random() * 360}deg)`;
            image.style.transition = 'transform 5s'; // Add transition to make rotation slow

            requestAnimationFrame(animate);
        }

        animate();
    }

    const randomNumber = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

    for (let i = 0; i < randomNumber ; i++) {
        createImage();
    }
}