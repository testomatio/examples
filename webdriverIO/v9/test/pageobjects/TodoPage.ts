import { step } from '@testomatio/reporter'

export default class TodoPage { 

  public async open(): Promise<void> {
    await browser.url('https://todomvc.com/examples/react/dist/');
  }

  get newTodoInput() { return $('.new-todo'); }
  get todoListItems() { return $$('.todo-list li'); }
  get clearCompletedButton() { return $('.clear-completed'); }

  public async addTodo(todo: string): Promise<void> {
    await this.newTodoInput.waitForDisplayed({ timeout: 5000 });
    await this.newTodoInput.setValue(todo);
    await this.newTodoInput.addValue('\uE007'); // Enter key
    step(`Added todo: ${todo}`);
  }

  public async toggleTodo(index: number): Promise<void> {
    const todoItem = this.todoListItems[index];
    await todoItem.waitForDisplayed({ timeout: 5000 });
    const toggle = todoItem.$('.toggle');
    await toggle.click();
    step(`Toggled todo at index: ${index}`);
  }

  public async deleteTodo(index: number): Promise<void> {
    const todoItem = this.todoListItems[index];
    await todoItem.waitForDisplayed({ timeout: 5000 });
    await todoItem.moveTo();
    const deleteButton = todoItem.$('.destroy');
    await deleteButton.waitForClickable({ timeout: 5000 });
    await deleteButton.click();
    step(`Deleted todo at index: ${index}`);
  }

  public async getTodoCount(): Promise<number> {
    return await this.todoListItems.length;
  }
}
