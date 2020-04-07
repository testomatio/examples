const { I, TodosPage } = inject();

Given('I have an empty todo list', () => {
  TodosPage.goto()
})

When(/I create a todo (\d+)/, (todo) => {
  TodosPage.enterTodo(todo)
})

Then('I see the new todo on my list', () => {
  TodosPage.seeNumberOfTodos(1);
})

Given('I have these todos on my list', table => {
  TodosPage.goto()
  for (const row of table.rows) {
    const cells = row.cells
    TodosPage.enterTodo(cells[0].value);
  }
})

Then('I see 4 todos on my list', () => {
  TodosPage.seeNumberOfTodos(4);
})