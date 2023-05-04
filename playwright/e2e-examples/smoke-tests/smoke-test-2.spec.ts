import { test, expect } from '@playwright/test';
import Basic from "../src/Basic";

const basic = new Basic();

test.describe('Basic', () => {
    const basicPage = basic.basicPageUrl();

    test.beforeEach(async ({ page }) => {
        await page.goto(basicPage);
    });
    test.describe('Main Basic tests', () => {
        test.describe('[Case 1] Basic page checks 1', () => {
            test('get started link', async ({ page }) => {  
                await test.step(`[Check 1.1] Basic page - click the <Get started> link`, async () => {
                    await page.getByRole('link', { name: 'Get started' }).click();
                });
                await test.step(`[Check 1.2] Get started - Expects the URL to contain intro.`, async () => {
                    await expect(page).toHaveURL(/.*intro/);
                });
              });
        });
    
        test.describe('[Case 2] Basic page checks 2', () => {
            test('get started link', async ({ page }) => {  
                await test.step(`[Check 2.1] Basic page - click the <Get started> link`, async () => {
                    await page.getByRole('link', { name: 'Get started' }).click();
                });
                await test.step(`[Check 2.2] Get started - Expects the URL to contain intro.`, async () => {
                    await expect(page).toHaveURL(/.*intro/);
                });
              });
        });    
    });
});