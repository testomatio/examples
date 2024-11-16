import { test, expect } from '@playwright/test';
import Basic from "../src/Basic";

const basic = new Basic();

test.describe('Smoke case-1', () => {
    const basicPage = basic.basicPageUrl();

    test.beforeEach(async ({ page }) => {
        await page.goto(basicPage);
    });

    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    });
});