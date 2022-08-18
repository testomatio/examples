/// <reference types='codeceptjs' />
type TodosPage = typeof import('./todomvc-tests/pages/todos.page.js');
type CustomHelper = import('./todomvc-tests/helpers/custom.helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, TodosPage: TodosPage }
  interface Methods extends Playwright, REST, CustomHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
