import { expect, test } from '@playwright/test';

const albumArtUrl = 'https://lastfm-img.freetls.fastly.net/i/u/300x300/album.jpg';

const recentTracks = {
  recenttracks: {
    track: [
      {
        name: 'Test Track',
        artist: { '#text': 'Test Artist' },
        album: { '#text': 'Test Album' },
        image: [{ size: 'extralarge', '#text': albumArtUrl }],
        url: 'https://www.last.fm/music/Test+Artist/_/Test+Track',
        '@attr': { nowplaying: 'true' },
      },
    ],
  },
};

const repo = {
  html_url: 'https://github.com/karanshukla/openresto',
  stargazers_count: 1,
  forks_count: 0,
  language: 'TypeScript',
  updated_at: '2026-09-01T00:00:00Z',
};

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.route('https://ws.audioscrobbler.com/**', (route) => {
    const method = new URL(route.request().url()).searchParams.get('method');
    return route.fulfill({
      json: method === 'user.getRecentTracks' ? recentTracks : { toptags: { tag: [] } },
    });
  });
  await page.route(albumArtUrl, (route) => route.fulfill({ path: 'public/og-image.jpg' }));
  await page.route('https://api.github.com/repos/**', (route) => route.fulfill({ json: repo }));
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('home page renders third-party widgets without console errors', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('github pulse (llm summarised)')).toBeVisible();
  await expect(page.getByRole('link', { name: /Test Track by Test Artist/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Test Album' })).toHaveJSProperty('complete', true);
  await expect(page.getByLabel('1 stars').first()).toBeVisible();
});

test('prerendered blog post loads by direct URL', async ({ page }) => {
  await page.goto('/blog/openresto-constraints');

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://karanshukla.ca/blog/openresto-constraints',
  );
  await expect(page).toHaveURL('/#/blog/openresto-constraints');
  await expect(
    page.getByRole('heading', { level: 1, name: 'constraints can sometimes be good actually' }),
  ).toBeVisible();
  await expect(page).toHaveTitle('constraints can sometimes be good actually | karan shukla');
});

test('drawer navigates between sections', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: /^experience/ }).click();
  await expect(page).toHaveURL('/#/experience');

  await page.getByRole('link', { name: /^blog/ }).click();
  await page.getByRole('link', { name: /constraints can sometimes be good actually/ }).click();
  await expect(page).toHaveURL('/#/blog/openresto-constraints');
});
