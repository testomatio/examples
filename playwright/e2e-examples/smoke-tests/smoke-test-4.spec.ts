import { test, expect } from '@playwright/test';

test.describe.skip('Skip condition testing @Sf75efe68', () => {
    test.describe('All tests should be skipped', () => {
        test('Test-1: get started linkshould be visible (first skipped) @T2ec2a2c0', async ({ page }) => {
            // Access to the basic page  
            await page.goto('https://playwright.dev/');

            // Expects the 'Get started' is shown
            await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
        });
        test('Test-2: get started linkshould be visible (second skipped) @Te0494806', async ({ page }) => {
            // Access to the basic page  
            await page.goto('https://playwright.dev/');

            // Expects the 'Get started' is shown
            await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
        });
    });
});