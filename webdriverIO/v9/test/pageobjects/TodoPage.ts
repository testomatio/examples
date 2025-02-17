import type AllureReporter from '@wdio/allure-reporter';

declare const allure: typeof AllureReporter;

export default class TodoPage { 
  // Відкриває сторінку TodoMVC
  public async open(): Promise<void> {
    await browser.url('https://todomvc.com/examples/react/dist/');
  }

  // Селектори
  get newTodoInput() { return $('.new-todo'); }
  get todoListItems() { return $$('.todo-list li'); }
  get clearCompletedButton() { return $('.clear-completed'); }

  // Додає новий todo
  public async addTodo(todo: string): Promise<void> {
    await this.newTodoInput.waitForDisplayed({ timeout: 5000 });
    await this.newTodoInput.setValue(todo);
    await this.newTodoInput.addValue('\uE007'); // Enter key
    if (typeof allure !== 'undefined') {
      allure.addStep(`Added todo: ${todo}`);
    }
  }

  // Перемикає статус todo за індексом
  public async toggleTodo(index: number): Promise<void> {
    const todoItem = this.todoListItems[index];
    await todoItem.waitForDisplayed({ timeout: 5000 });
    const toggle = todoItem.$('.toggle');
    await toggle.click();
    if (typeof allure !== 'undefined') {
      allure.addStep(`Toggled todo at index: ${index}`);
    }
  }

  // Видаляє todo за індексом
  public async deleteTodo(index: number): Promise<void> {
    const todoItem = this.todoListItems[index];
    await todoItem.waitForDisplayed({ timeout: 5000 });
    // Щоб показати кнопку видалення (зазвичай з'являється при hover)
    await todoItem.moveTo();
    const deleteButton = todoItem.$('.destroy');
    await deleteButton.waitForClickable({ timeout: 5000 });
    await deleteButton.click();
    if (typeof allure !== 'undefined') {
      allure.addStep(`Deleted todo at index: ${index}`);
    }
  }

  public async getTodoCount(): Promise<number> {
    return await this.todoListItems.length;
  }
}
