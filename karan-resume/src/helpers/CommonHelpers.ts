export function getRawGithubImageUrl(imageName: string): string {
    return `https://raw.githubusercontent.com/karanshukla/karanshukla.ca/main/karan-resume/src/assets/${imageName}`;
}

export const isLandscape = (): boolean => window.matchMedia('(orientation: landscape)').matches;