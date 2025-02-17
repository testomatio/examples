import TodoPage from '../pageobjects/TodoPage';
import { maybeFail } from '../helpers/RandomFailureHelper';
import type AllureReporter from '@wdio/allure-reporter';

declare const allure: typeof AllureReporter;

describe('TodoMVC Add/Remove Tests @S3fee112a', () => {
  const todoPage = new TodoPage();

  before(() => {
    todoPage.open();
    if (typeof allure !== 'undefined') {
      allure.addFeature('TodoMVC Add/Remove');
    }
  });

  it('should add a new todo item @Todo @Functional @T878be988', async () => {
    await todoPage.addTodo('Buy groceries');
    expect(await todoPage.todoListItems.length).toBeGreaterThan(0);
    if (typeof allure !== 'undefined') {
      allure.addStep('Added new todo and verified list length');
    }
  });

  it('should add multiple todo items @Todo @Functional @T658a9e4f', async () => {
    await todoPage.addTodo('Walk the dog');
    await todoPage.addTodo('Write tests');
    expect(await todoPage.todoListItems.length).toBeGreaterThanOrEqual(2);
    maybeFail(0.2);
    if (typeof allure !== 'undefined') {
      allure.addStep('Added multiple todos');
    }
  });

  it('should toggle a todo item as completed @Todo @Functional @T6663c14b', async () => {
    todoPage.addTodo('Complete assignment');
    const initialCount = await todoPage.getTodoCount();
    todoPage.toggleTodo(initialCount - 1);
    if (typeof allure !== 'undefined') {
      allure.addStep('Toggled todo item completion state');
    }
  });

  it('should delete a todo item @Todo @Functional @T92e4a0b6', async () => {
    todoPage.addTodo('Delete me');
    const countBefore = await todoPage.getTodoCount();
    todoPage.deleteTodo(countBefore - 1);
    expect(await todoPage.getTodoCount()).toBe(countBefore - 1);
    if (typeof allure !== 'undefined') {
      allure.addStep('Deleted a todo item successfully');
    }
  });

  it('should clear completed todos @Todo @Functional @T7ecc2164', async () => {
    await todoPage.addTodo('Completed task');
    await todoPage.toggleTodo((await todoPage.getTodoCount()) - 1);
    await todoPage.clearCompletedButton.click();
    maybeFail(0.2);
    if (typeof allure !== 'undefined') {
      allure.addStep('Cleared completed todos');
    }
  });
});
