import { test, expect } from '@playwright/test';
import Basic from "../src/Basic";

const basic = new Basic();

test.describe('Smoke case-1 @Sb81d48d3', () => {
    const basicPage = basic.basicPageUrl();

    test.beforeEach(async ({ page }) => {
        await page.goto(basicPage);
    });

    test('has title @T17ea071c', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
    });
});