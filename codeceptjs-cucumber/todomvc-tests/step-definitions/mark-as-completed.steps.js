const { I, TodosPage } = inject();

When('I mark the first one as completed', async () => {
  await TodosPage.markNthAsCompleted(1);
})

When('I mark {int} todos as completed', async (num) => {
  for (let i = 1; i <= num; i++) {
    await TodosPage.markNthAsCompleted(i);
  }
})


Then('I see that {int} todos are still active', async (num) => {
  TodosPage.filterActive()
  TodosPage.seeNumberOfTodos(num)
})

Then('I see that {int} has been completed', (num) => {
  TodosPage.filterCompleted()
  TodosPage.seeNumberOfTodos(num)
})

When('I unmark the completed todo item', async () => {
  await TodosPage.unmarkNthAsCompleted(1)
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

