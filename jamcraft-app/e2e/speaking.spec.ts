import { test, expect } from '@playwright/test';

test.describe('Speaking section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[aria-label="Main navigation"] >> text=Speaking').click();
    await expect(page.locator('#speaking')).toBeInViewport({ ratio: 0.1 });
  });

  test('shows speaking section heading', async ({ page }) => {
    await expect(page.locator('#speaking h2')).toContainText('Speaking');
  });

  test('shows all 6 entries by default', async ({ page }) => {
    await expect(page.locator('#speaking article')).toHaveCount(6);
  });

  test('All filter button is active by default', async ({ page }) => {
    const allBtn = page.locator('[aria-label="Filter by type"] button', { hasText: 'All' });
    await expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('podcasts filter shows exactly 4 entries', async ({ page }) => {
    await page.locator('[aria-label="Filter by type"] button', { hasText: 'Podcasts' }).click();
    await expect(page.locator('#speaking article')).toHaveCount(4);
  });

  test('talks filter shows exactly 2 entries', async ({ page }) => {
    await page.locator('[aria-label="Filter by type"] button', { hasText: 'Talks' }).click();
    await expect(page.locator('#speaking article')).toHaveCount(2);
  });

  test('all filter restores full list after filtering', async ({ page }) => {
    await page.locator('[aria-label="Filter by type"] button', { hasText: 'Podcasts' }).click();
    await expect(page.locator('#speaking article')).toHaveCount(4);
    await page.locator('[aria-label="Filter by type"] button', { hasText: 'All' }).click();
    await expect(page.locator('#speaking article')).toHaveCount(6);
  });
});
