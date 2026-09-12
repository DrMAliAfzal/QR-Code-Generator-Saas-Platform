import { test, expect } from '@playwright/test';

test.describe('Smart QR Studio E2E Tests', () => {
  
  test('Landing Page loads correctly and contains SEO elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Smart QR Studio/);
    await expect(page.locator('h1')).toContainText('QR Code');
  });

  test('Empty Input Disables Download Button (Edge Case 1)', async ({ page }) => {
    await page.goto('/');
    
    // Default is URL tab with some default value. Let's switch to Text tab which is empty by default
    await page.getByRole('tab', { name: 'Text' }).click();
    
    // Clear the input explicitly
    await page.fill('input[placeholder="Type something..."]', '');
    
    // Expect the download button to be disabled
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    await expect(downloadBtn).toBeDisabled();

    // Expect the Unsafe badge
    await expect(page.locator('.bg-red-100')).toContainText('Unsafe');
  });

  test('Dense QR Code Shows Warning (Edge Case 2)', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('tab', { name: 'Text' }).click();
    
    // Fill with > 250 characters
    const longString = 'A'.repeat(300);
    await page.fill('input[placeholder="Type something..."]', longString);
    
    // Expect the Warning badge
    await expect(page.locator('.bg-yellow-100')).toContainText('Warning');
    // Button should still be enabled (Warning doesn't block download)
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
    
    // Check if the filename is correctly updated to premium branding
    expect(download.suggestedFilename()).toBe('Smart-QR-Studio.png');
  });

  test('Friendly Authentication Error (Edge Case 3)', async ({ page }) => {
    await page.goto('/signup');

    // Attempt to signup with a fake email
    const testEmail = `testuser_${Date.now()}@example.com`;
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'StrongPassw0rd!');
    await page.click('button[type="submit"]');

    // We expect the friendly mapped error message or a redirect
    await page.waitForTimeout(3000);
    const currentUrl = page.url();
    if (!currentUrl.includes('dashboard')) {
      const errorText = await page.locator('.text-red-500').textContent();
      // Should show the cleaned up error, not the raw JSON/Supabase message
      expect(errorText?.toLowerCase()).toContain('valid email');
    }
  });
});
