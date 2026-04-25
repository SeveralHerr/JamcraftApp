import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home')).toBeVisible();
  });

  test('page loads and shows hero section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('James');
  });

  test('nav contains all section links', async ({ page }) => {
    const nav = page.locator('[aria-label="Main navigation"]');
    await expect(nav.locator('a', { hasText: 'Home' })).toBeVisible();
    await expect(nav.locator('a', { hasText: 'Speaking' })).toBeVisible();
    await expect(nav.locator('a', { hasText: 'Games' })).toBeVisible();
    await expect(nav.locator('a', { hasText: 'Contact' })).toBeVisible();
  });

  test('logo is visible and shows name', async ({ page }) => {
    await expect(page.locator('[aria-label="James Herr — Home"]')).toBeVisible();
  });

  test('speaking nav link scrolls to speaking section', async ({ page }) => {
    await page.locator('[aria-label="Main navigation"] >> text=Speaking').click();
    await expect(page.locator('#speaking')).toBeInViewport({ ratio: 0.1 });
  });

  test('games nav link scrolls to games section', async ({ page }) => {
    await page.locator('[aria-label="Main navigation"] >> text=Games').click();
    await expect(page.locator('#games')).toBeInViewport({ ratio: 0.1 });
  });

  test('contact nav link scrolls to contact section', async ({ page }) => {
    await page.locator('[aria-label="Main navigation"] >> text=Contact').click();
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 });
  });
});
