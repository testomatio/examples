import { test, expect, Page } from '@playwright/test';

//parameterized test
const users = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: '30', salary: '50000', department: 'Finance' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: '25', salary: '40000', department: 'HR' },
];
let page: Page
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('https://demoqa.com/webtables');
  await page.waitForLoadState('load');
});

users.forEach(user => {
  test(`Create a new user: ${user.firstName} ${user.lastName} @Tdc27a2a4`, async () => {
    await test.step('Log in', async () => {
      await test.step('Add new Record', async () => {
        await page.click('button[id="addNewRecordButton"]');
        await page.waitForSelector('input[id="firstName"]');
      });
      await test.step('Fill Fields', async () => {
        await page.fill('input[id="firstName"]', user.firstName);
        await page.fill('input[id="lastName"]', user.lastName);
        await page.fill('input[id="userEmail"]', user.email);
        await page.fill('input[id="age"]', user.age);
        await page.fill('input[id="salary"]', user.salary);
        await page.fill('input[id="department"]', user.department);
      });
      await test.step('Submit', async () => {
        await page.click('button[id="submit"]');
        await page.waitForLoadState('load');
      });
    });
    await test.step('Check if user exists', async () => {
      await test.step('Check if user exists', async () => {
        await expect(page.getByRole('gridcell', { name: `${user.firstName}`, exact: true })).toBeVisible();
        await expect(page.getByRole('gridcell', { name: `${user.lastName}`, exact: true })).toBeVisible();
      });
    });
  });

  test(`Check if user exists: ${user.firstName} ${user.lastName} @T201e04a3`, async () => {
    await expect(page.getByRole('gridcell', { name: `${user.firstName}`, exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: `${user.lastName}`, exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: `${user.email}`, exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: `${user.age}`, exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: `${user.salary}`, exact: true })).toBeVisible();
    await expect(page.getByRole('gridcell', { name: `${user.department}`, exact: true })).toBeVisible();
  });

  test(`Update user ${user.firstName} information @Tb8a36c4e`, async () => {
    await page.click(`div[role="gridcell"]:has-text("${user.department}") + div>div>span[title="Edit"]`);
    await page.fill('input[id="age"]', '35');
    await page.click('button[id="submit"]');
    await page.waitForLoadState('load');
    await expect(await page.getByRole('gridcell', { name: '35', exact: true })).toBeVisible();
  });

  test(`Delete a user ${user.firstName} @T27b2ea22`, async () => {
    await page.click(`div[role="gridcell"]:has-text("${user.department}") + div>div>span[title="Delete"]`);
    await page.waitForLoadState('load');
    await expect(await page.getByRole('gridcell', { name: `${user.firstName}`, exact: true })).not.toBeVisible();
  });
});

test.afterAll(async () => {
  await page.close();
});