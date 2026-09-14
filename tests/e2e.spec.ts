import { test, expect } from '@playwright/test';

test.describe('Smart QR Studio E2E Tests', () => {
  
  test('Landing Page loads correctly and contains SEO elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Smart QR Studio/);
    await expect(page.locator('h1')).toContainText('QR Code');
  });

  test('Global Premium Navigation is Present', async ({ page }) => {
    await page.goto('/');
    // Check if header contains Pricing and Blog links
    await expect(page.locator('header').getByRole('link', { name: 'Pricing' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Blog' })).toBeVisible();
    
    // Check footer links
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'URL QR Code' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('Empty Input Disables Download Button (Edge Case 1)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Text' }).click();
    await page.fill('input[placeholder="Type something..."]', '');
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    await expect(downloadBtn).toBeDisabled();
    await expect(page.locator('.bg-red-100')).toContainText('Unsafe');
  });

  test('Dense QR Code Shows Warning (Edge Case 2)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Text' }).click();
    const longString = 'A'.repeat(300);
    await page.fill('input[placeholder="Type something..."]', longString);
    await expect(page.locator('.bg-yellow-100')).toContainText('Warning');
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    await expect(downloadBtn).toBeEnabled();
  });

  test('Generate a Static QR Code (Premium File Name)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Text' }).click();
    await page.fill('input[placeholder="Type something..."]', 'Playwright Automated Test');
    await page.waitForTimeout(1000);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('Smart-QR-Studio.png');
  });

  test('Friendly Authentication Error (Edge Case 3)', async ({ page }) => {
    await page.goto('/signup');
    const testEmail = `testuser_${Date.now()}@example.com`;
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'StrongPassw0rd!');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    if (!currentUrl.includes('dashboard')) {
      const errorText = await page.locator('.text-red-500').textContent();
      expect(errorText?.toLowerCase()).toContain('valid email');
    }
  });

  test('Pricing Page & Waitlist Intercept', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('h1')).toContainText('Simple pricing');
    
    // Check that plans exist
    await expect(page.getByText('Free', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Pro', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Business', { exact: true }).first()).toBeVisible();

    // Click "Join Waitlist" on the Pro plan and intercept the JS alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Premium plans are launching very soon');
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Join Waitlist' }).first().click();
  });

  test('Blog Architecture & AdSense Placeholder', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1')).toContainText('QR Code Guides');
    
    // Navigate to a specific post
    await page.click('text=Dynamic vs Static QR Codes: Which Should You Use?');
    await expect(page).toHaveURL(/.*dynamic-vs-static-qr-codes/);
    
    // Ensure the AdSense placeholder rendered successfully (using the visible span)
    await expect(page.locator('text=AdSense Placeholder').first()).toBeVisible();
  });
});
