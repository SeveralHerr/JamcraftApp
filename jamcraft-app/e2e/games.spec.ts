import { test, expect } from '@playwright/test';

test.describe('Games section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[aria-label="Main navigation"] >> text=Games').click();
    await expect(page.locator('#games')).toBeInViewport({ ratio: 0.1 });
  });

  test('shows games section heading', async ({ page }) => {
    await expect(page.locator('#games h2')).toContainText('Games');
  });

  test('shows exactly 6 game cards', async ({ page }) => {
    await expect(page.locator('#games a[aria-label]')).toHaveCount(6);
  });

  test('view all link is visible and targets itch.io', async ({ page }) => {
    const viewAllLink = page.locator('[aria-label="View all games on jamcraft.io"]');
    await expect(viewAllLink).toBeVisible();
    const href = await viewAllLink.getAttribute('href');
    expect(href).toContain('itch.io');
  });

  test('each game card links to itch.io', async ({ page }) => {
    const cards = page.locator('#games a[aria-label]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href');
      expect(href).toContain('itch.io');
    }
  });

  test('game cards have accessible labels', async ({ page }) => {
    const cards = page.locator('#games a[aria-label]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const label = await cards.nth(i).getAttribute('aria-label');
      expect(label?.length).toBeGreaterThan(0);
    }
  });
});
