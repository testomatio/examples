import { test, expect } from '@playwright/test';
import { testomatioLogger } from '@testomatio/reporter';

/**
 * Inside every test you get a new isolated page instance.
 * @see https://playwright.dev/docs/intro
 * @see https://playwright.dev/docs/api/class-page
 */
test('basic test', async ({ page }) => {
  console.log('console log message');
  testomatioLogger.warn('testomatio logger warn message');
  await page.goto('https://todomvc.com/examples/vanilla-es6/');

  const inputBox = page.locator('input.new-todo');
  const todoList = page.locator('.todo-list');

  await inputBox.fill('Learn Playwright');
  await inputBox.press('Enter');
  // example of test with status FAIL
  await expect(todoList).toHaveText('Le1arn Playwright'); //TODO: To fix update text to => 'Learn Playwright'
});
