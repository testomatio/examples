const { I, TodosPage } = inject();

When('I refresh the page', async () => {
  TodosPage.refresh()
})

Then('I still see the same todos', async () => {
  TodosPage.seeNumberOfTodos(4)
  await TodosPage.seeNthTodoEquals(1, 'name')
})
