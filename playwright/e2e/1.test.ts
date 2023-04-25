import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('text=Get started').click();
  await expect(page).toHaveTitle(/Getting started/);
});


// ['test1', 'test2', 'test3'].forEach(async testNumber => {
//   test.describe(`Testomat Suite`, () => {
//     test(`This is test named: ${testNumber}`, async ({ page }) => {
//        await page.goto('https://playwright.dev/');
//        // Expect a title "to contain" a substring.
//        await expect(page).toHaveTitle(/Playwright/);
//     });
//   });
// });
