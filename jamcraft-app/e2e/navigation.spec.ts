import { test, expect } from '@playwright/test';

test.describe('single-page navigation', () => {
  test('loads the home section with all nav anchors', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#home')).toBeVisible();

    const nav = page.locator('a[href="#projects"]');
    await expect(nav.first()).toBeVisible();
  });

  test('clicking a nav anchor scrolls to the matching section', async ({ page }) => {
    await page.goto('/');

    await page.locator('a[href="#podcasts"]').first().click();
    await expect(page).toHaveURL(/#podcasts$/);
    await expect(page.locator('#podcasts')).toBeInViewport();
  });

  test('legacy /projects path redirects to the projects section', async ({ page }) => {
    await page.goto('/projects');

    await expect(page).toHaveURL(/#projects$/);
  });

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('/');

    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    const rel = await externalLinks.first().getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });
});
