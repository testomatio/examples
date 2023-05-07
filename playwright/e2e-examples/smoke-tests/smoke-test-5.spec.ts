import { test, expect, type Page } from '@playwright/test';

const TODO_ITEMS = [
    'buy some cheese',
    'feed the cat',
    'book a doctors appointment'
];
const URL = 'https://demo.playwright.dev/todomvc';

test.describe('New Todo', () => {
    let newTodo: any;

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test.fixme('[Need to fix] should allow me to add todo items', async ({ page }) => {
        await test.step(`[Check 1.1] create a new todo locator`, async () => {
            // create a new todo locator
            const newTodo = page.getByPlaceholder('What needs to be done?');

            // Create 1st todo.
            await newTodo.fill(TODO_ITEMS[0]);
            await newTodo.press('Enter');

            // Make sure the list only has one todo item.
            await expect(page.getByTestId('todo-title')).toHaveText([
                TODO_ITEMS[0]
            ]);
        });
    });
    test('should allow me to add todo items', async ({ page }) => {
        await test.step(`[Check 1.1] create a new todo locator`, async () => {
            // create a new todo locator
            const newTodo = page.getByPlaceholder('What needs to be done?');

            // Create 1st todo.
            await newTodo.fill(TODO_ITEMS[0]);
            await newTodo.press('Enter');

            // Make sure the list only has one todo item.
            await expect(page.getByTestId('todo-title')).toHaveText([
                TODO_ITEMS[0]
            ]);
        });
    });
    test('should allow me to add todo items (part 1)', async ({ page }) => {
        await test.step(`[Check 1.2] create a new todo locator`, async () => {
            // create a new todo locator
            newTodo = page.getByPlaceholder('What needs to be done?');
        });
        await test.step(`[Check 1.3] Create 1st todo.`, async () => {
            // Create 1st todo.
            await newTodo.fill(TODO_ITEMS[0]);
            await newTodo.press('Enter');
        });
        // Make sure the list only has one todo item.
        await expect(page.getByTestId('todo-title')).toHaveText([
            TODO_ITEMS[0]
        ]);
        await checkNumberOfTodosInLocalStorage(page, 1);
    });
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
    return await page.waitForFunction(e => {
        return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
}