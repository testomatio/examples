import TodoPage from '../pageobjects/TodoPage';
import { maybeFail } from '../helpers/RandomFailureHelper';
import { step, log, meta } from '@testomatio/reporter'


describe('TodoMVC UI Tests @Sbf061784', () => {
  const todoPage = new TodoPage();

  beforeEach(() => {
    todoPage.open();
    meta('FEATURE','TodoMVC UI');
    step('Open TodoMVC UI');
    meta('PRIORITY', 'Medium');
    meta('RISK', 'Possible UI inconsistencies');
    meta('BUSINESS_REQUIREMENT', 'REQ-TODO-004');
  
    log('TESTOMATIO:', process.env.TESTOMATIO);
  });

  afterEach(() => {
    browser.saveScreenshot('./screenshots/todo-ui.png');
    step('Screenshot saved');
  });

  it('should display the input field for new todos @UI @Smoke @Tda456756', async () => {
      step('Verifying the visibility of the input field');
    expect(await todoPage.newTodoInput.isDisplayed()).toBe(true);
  });

  it('should display an empty todo list initially @UI @Regression @Tdc99996f', async () => {
    step('Checking if the todo list is empty on first load');
    expect(await todoPage.todoListItems.length).toBe(0);
  });

  it('should allow adding a new todo and display it @UI @T85825f3c', async () => {
    step('Adding a new todo item and verifying its display');
    await todoPage.addTodo('Test Todo');
    expect(await todoPage.todoListItems.length).toBe(1);
  });

  it('should show the clear completed button after completing a task @UI @Regression @T1fba6311', async () => {
    step('Completing a task and checking if the clear button appears');
    todoPage.addTodo('Complete Me');
    todoPage.toggleTodo((await todoPage.getTodoCount()) - 1);
    expect(todoPage.clearCompletedButton.isDisplayed()).toBe(true);
  });

  it('should maintain UI structure when adding multiple todos @UI @T5c2069d1', async () => {
    step('Adding multiple todos and ensuring the UI remains consistent');
    await todoPage.addTodo('Item 1');
    await todoPage.addTodo('Item 2');
    await todoPage.addTodo('Item 3');
    expect(await todoPage.todoListItems.length).toBe(3);
    maybeFail(0.2);
  });

  it('should not break UI when deleting a todo @UI @Td9336491', async () => {
    step('Adding and deleting a todo, ensuring UI remains intact');
    todoPage.addTodo('Delete me');
    const countBefore = await todoPage.getTodoCount();
    todoPage.deleteTodo(countBefore - 1);
    expect(await todoPage.getTodoCount()).toBe(countBefore - 1);
  });
});
