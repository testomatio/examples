Feature('Edit/Delete Todos @step-06 @S15a1c5dd')

Before(async ({ I, TodosPage }) => {
    TodosPage.goto()

    TodosPage.enterTodo('foo')
    TodosPage.enterTodo('bar')
    TodosPage.enterTodo('baz')
})

Scenario('Unapproved user cant chat with unapproved user @T1ce5074b', async ({I}) => {
  I.createUserAndLogIn();
  const username = globalConf.users.getCurrentUser().username;
  await I.getUserId(username);

  I.logOut();

  I.createUserAndLogIn();
  I.openUsersPage(username);
  I.startChatWithUser(username);

  I.seeNotMemberRestriction(username);
});

Scenario('Edited todo is saved on blur @Tc51caa87', async ({ I, TodosPage }) => {
    I.say('Given I have some todos')
  
    I.say('When I edit the first todo')
    await TodosPage.editNthTodo(1, 'boom')
  
    I.say('Then I see that the todo text has been changed')
    await TodosPage.seeNthTodoEquals(1, 'boom')

    I.saveScreenshot('edited-todo-saved-on-blur.png')
})

Scenario('Delete todos @T99544623', async ({ I, TodosPage }) => {
    I.say('Given I have some todos')
    I.say('When I delete the first todo')
    TodosPage.deleteNthTodo(1)

    I.say('Then the todo should disappear from the list')
    TodosPage.seeNumberOfTodos(2)    
})
  
