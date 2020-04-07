const { I, TodosPage } = inject();

When('I edit the first todo', () => {
  TodosPage.editNthTodo(1, 'boom');
})

Then('I see that the todo text has been changed', () => {
  TodosPage.seeNthTodoEquals(1, 'boom');
})

When('I delete the first todo', () => {
  TodosPage.deleteNthTodo(1);
})

Then('the todo should disappear from the list', () => {
  TodosPage.seeNumberOfTodos(3);
})