export function getRawGithubImageUrl(imageName) {
    return `https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/${imageName}`;
}

export const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;