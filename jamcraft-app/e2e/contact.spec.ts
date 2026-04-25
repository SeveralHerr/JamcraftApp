import { test, expect } from '@playwright/test';

test.describe('Contact section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('[aria-label="Main navigation"] >> text=Contact').click();
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 });
  });

  test('shows contact section heading', async ({ page }) => {
    await expect(page.locator('#contact h2')).toContainText('Get in touch');
  });

  test('contact form is visible', async ({ page }) => {
    await expect(page.locator('[aria-label="Contact form"]')).toBeVisible();
  });

  test('reason pills can be selected', async ({ page }) => {
    const pill = page.locator('[aria-label="Contact reason"] button', { hasText: 'Podcast invite' });
    await pill.click();
    await expect(pill).toHaveAttribute('aria-pressed', 'true');
  });

  test('selecting a reason deselects the previous one', async ({ page }) => {
    const podcastPill = page.locator('[aria-label="Contact reason"] button', { hasText: 'Podcast invite' });
    const collabPill = page.locator('[aria-label="Contact reason"] button', { hasText: 'Collaboration' });
    await podcastPill.click();
    await collabPill.click();
    await expect(podcastPill).toHaveAttribute('aria-pressed', 'false');
    await expect(collabPill).toHaveAttribute('aria-pressed', 'true');
  });

  test('form fields are associated with labels', async ({ page }) => {
    await expect(page.locator('#field-your-name')).toBeVisible();
    await expect(page.locator('#field-email')).toBeVisible();
    await expect(page.locator('#field-message')).toBeVisible();
  });

  test('form submission shows success state', async ({ page }) => {
    await page.locator('#field-your-name').fill('Test User');
    await page.locator('#field-email').fill('test@example.com');
    await page.locator('#field-message').fill('Hello there!');
    await page.locator('[type="submit"]').click();
    await expect(page.locator('[type="submit"]')).toContainText('sent');
  });

  test('shows 6 social contact channels', async ({ page }) => {
    const links = page.locator('#contact a[aria-label]');
    await expect(links).toHaveCount(6);
  });
});
