import re

with open('tests/e2e.spec.ts', 'r', encoding='utf-8') as f:
    content = f.read()

old_test = """    let alertMessage = '';
    page.on('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });

    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    
    // Download 5 times successfully
    for (let i = 0; i < 5; i++) {
      const downloadPromise = page.waitForEvent('download');
      await downloadBtn.click();
      await downloadPromise;
      expect(alertMessage).toBe(''); // No alert should fire
    }
    
    // 6th download should fire the limit paywall alert and NOT trigger a download
    await downloadBtn.click();
    await page.waitForTimeout(1000);
    expect(alertMessage).toContain('limit of 5 downloads');"""

new_test = """    const downloadBtn = page.getByRole('button', { name: 'Download PNG' });
    
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
    await expect(page.locator('text=limit of 5 downloads').first()).toBeVisible();"""

if old_test in content:
    content = content.replace(old_test, new_test)
    with open('tests/e2e.spec.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Test updated successfully.")
else:
    print("Could not find the test.")
