import { test, expect } from '@playwright/test';

test.describe('Smart QR Studio E2E Tests', () => {
  
  test('Landing Page loads correctly and contains SEO elements', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Smart QR Studio/);
    
    // Check Hero text
    await expect(page.locator('h1')).toContainText('QR Code');
    
    // Check FAQ accordion
    await page.click('text=Are static QR codes really free forever?');
    await expect(page.locator('text=Yes! Static QR codes generated on our homepage')).toBeVisible();
  });

  test('Navigation to Legal Pages', async ({ page }) => {
    await page.goto('/');
    
    // Go to Privacy Policy
    await page.click('text=Privacy Policy');
    await expect(page).toHaveURL(/.*privacy-policy/);
    await expect(page.locator('h1')).toHaveText('Privacy Policy');

    // Go back to Home
    await page.click('text=Back to Home');
    await expect(page).toHaveURL('/');

    // Go to Terms of Service
    await page.click('text=Terms of Service');
    await expect(page).toHaveURL(/.*terms-of-service/);
    await expect(page.locator('h1')).toHaveText('Terms of Service');
  });

  test('Generate a Static QR Code (Download)', async ({ page }) => {
    await page.goto('/');

    // Switch to Text tab
    await page.getByRole('tab', { name: 'Text' }).click();
    
    // Fill text input
    await page.fill('input[placeholder="Type something..."]', 'Playwright Automated Test');

    // Wait a moment for QR to render
    await page.waitForTimeout(1000);

    // Click Download (Expect a download event)
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PNG' }).click();
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toContain('qr-code.png');
  });

  test('Authentication Flow - Signup and Login rendering', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Login
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('body')).toContainText('Welcome back'); // Note: changed from 'Welcome Back' to 'Welcome back' (case sensitive)

    // Navigate to Signup
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Started' }).first().click(); // Or Sign up
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('body')).toContainText('Create an account');

    // Attempt to signup with a fake email
    const testEmail = `testuser_${Date.now()}@example.com`;
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'StrongPassw0rd!');
    await page.click('button[type="submit"]');

    // We either expect a successful redirect to dashboard, or an email check warning
    await page.waitForTimeout(3000); // Wait for API response
    const currentUrl = page.url();
    if (currentUrl.includes('dashboard')) {
      await expect(page.locator('h1')).toContainText('My QR Codes');
    } else {
      const errorText = await page.locator('.text-red-500').textContent();
      expect(errorText?.toLowerCase()).toContain('email');
    }
  });
});


