import { test, expect } from '@playwright/test';

test.describe('Smart QR Studio - Deep Launch E2E & SEO/AEO Tests', () => {
  
  test('SEO & AEO Validation (Meta tags, JSON-LD, Schemas)', async ({ page }) => {
    await page.goto('/');
    // Check Meta tags
    await expect(page).toHaveTitle(/Smart QR Studio/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /customized, logo-embedded/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Smart QR Studio/);
    
    // Check H1 Tag for accessibility and SEO
    await expect(page.locator('h1').first()).toContainText('QR Code');
    
    // Check JSON-LD schema for AEO / LLM parsing
    const schemaScript = page.locator('script[type="application/ld+json"]').first();
    await expect(schemaScript).toBeAttached();
    const schemaContent = await schemaScript.textContent();
    expect(schemaContent).toContain('WebApplication');
  });

  test('Blog AEO & LLM Schemas', async ({ page }) => {
    await page.goto('/blog/dynamic-vs-static-qr-codes');
    
    // Check Blog JSON-LD schema
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toBeAttached();
    const schemaContent = await schemaScript.textContent();
    expect(schemaContent).toContain('BlogPosting');
    expect(schemaContent).toContain('Al-Afzal Solutions');
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

  test('Weekly Free Limit (5 Downloads per Product)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'URL', exact: true }).click();
    await page.fill('input[placeholder="https://..."]', 'https://limit-test.com');
    await page.waitForTimeout(500);
    
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    
    // Download 5 times successfully
    for (let i = 0; i < 5; i++) {
      const downloadPromise = page.waitForEvent('download');
      await downloadBtn.click();
      await downloadPromise;
      await expect(page.locator('text=Limit Reached')).toBeHidden();
    }
    
    // 6th download should trigger the DOM modal
    await downloadBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('text=Limit Reached').first()).toBeVisible();
    await expect(page.locator('text=limit of 5 downloads').first()).toBeVisible();
  });

  test('Empty Input Disables Download Button (Edge Case 1)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Text', exact: true }).click();
    await page.fill('input[placeholder="Type something..."]', '');
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    await expect(downloadBtn).toBeDisabled();
    await expect(page.locator('.bg-red-100')).toContainText('Unsafe');
  });

  test('Dense QR Code Shows Warning (Edge Case 2)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Text', exact: true }).click();
    const longString = 'A'.repeat(300);
    await page.fill('input[placeholder="Type something..."]', longString);
    await expect(page.locator('.bg-yellow-100')).toContainText('Warning');
    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    await expect(downloadBtn).toBeEnabled();
  });

  test('Pricing Page Hover Effects & Waitlist', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check waitlist
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Join Waitlist' }).first().click();
    expect(alertMessage).toContain('Premium plans are launching very soon');
  });

});
