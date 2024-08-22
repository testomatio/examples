import { test, expect } from '@playwright/test';

test.describe(
    'simple url cheks @Sd329f1b9',
    () => {
        // Suite
        test.describe('Check home page url', () => {
            test('get started link', async ({ page }) => {
                // Access to the basic page  
                await page.goto('https://playwright.dev/');

                // Expects the 'Get started' is shown
                await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
            });
        });

        test.describe.skip('Check home page url (skip)', () => {
            test('get started link (skip) @T09fb0556', async ({ page }) => {
                // Access to the basic page  
                await page.goto('https://playwright.dev/');

                // Expects the 'Get started' is shown
                await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
            });
        });

        test.describe.fixme('Check home page url (fixme)', () => {
            test('get started link (fixme) @T8abf0e35', async ({ page }) => {
                // Access to the basic page  
                await page.goto('https://playwright.dev/');

                // Expects the 'Get started' is shown
                await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
            });
        });
    });