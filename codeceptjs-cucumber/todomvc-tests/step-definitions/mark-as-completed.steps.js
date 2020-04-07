const { I, TodosPage } = inject();

When('I mark the first one as completed', async () => {
  await TodosPage.markNthAsCompleted(1);
})

Then('I see that 3 todos are still active', async () => {
  TodosPage.filterActive()
  TodosPage.seeNumberOfTodos(3)
})

Then('I see that 1 has been completed', () => {
  TodosPage.filterCompleted()
  TodosPage.seeNumberOfTodos(1)
})

When('I unmark the completed todo item', async () => {
  await TodosPage.unmarkNthAsCompleted(1)
})

Then('I see that 4 todos are still active', () => {
  TodosPage.filterActive()
  TodosPage.seeNumberOfTodos(4)
})

When('I mark them all as completed', async () => {
  await TodosPage.markAllAsCompleted()
})

Then('I see that all 4 are completed', () => {
  TodosPage.filterCompleted()
  TodosPage.seeNumberOfTodos(4)
})

When('I clear all completed items', async () => {
  TodosPage.clearCompleted()
})

Then('I see that all 0 are completed', () => {
  TodosPage.seeNumberOfTodos(0)
})
