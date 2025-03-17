import TodoPage from '../pageobjects/TodoPage';
import { maybeFail } from '../helpers/RandomFailureHelper';
import { step, meta } from '@testomatio/reporter'


describe('TodoMVC Add/Remove Tests @S3fee112a', () => {
  const todoPage = new TodoPage();

  before(() => {
    todoPage.open();
    meta('FEATURE','TodoMVC Add/Remove');
    step('Open TodoMVC Add/Remove');
  });

  it('should add a new todo item @Todo @Functional @T878be988', async () => {
    await todoPage.addTodo('Buy groceries');
    expect(await todoPage.todoListItems.length).toBeGreaterThan(0);
    step('Added new todo and verified list length');
  });

  it('should add multiple todo items @Todo @Functional @T658a9e4f', async () => {
    await todoPage.addTodo('Walk the dog');
    await todoPage.addTodo('Write tests');
    expect(await todoPage.todoListItems.length).toBeGreaterThanOrEqual(2);
    maybeFail(0.2);
    step('Added multiple todos');
  });

  it('should toggle a todo item as completed @Todo @Functional @T6663c14b', async () => {
    todoPage.addTodo('Complete assignment');
    const initialCount = await todoPage.getTodoCount();
    todoPage.toggleTodo(initialCount - 1);
    step('Toggled todo item completion state');
  });

  it('should delete a todo item @Todo @Functional @T92e4a0b6', async () => {
    todoPage.addTodo('Delete me');
    const countBefore = await todoPage.getTodoCount();
    todoPage.deleteTodo(countBefore - 1);
    expect(await todoPage.getTodoCount()).toBe(countBefore - 1);
    step('Deleted a todo item successfully');
  });

  it('should clear completed todos @Todo @Functional @T7ecc2164', async () => {
    await todoPage.addTodo('Completed task');
    await todoPage.toggleTodo((await todoPage.getTodoCount()) - 1);
    await todoPage.clearCompletedButton.click();
    maybeFail(0.2);
    step('Cleared completed todos');
  });
});
