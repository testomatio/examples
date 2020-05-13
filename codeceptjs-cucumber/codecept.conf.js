const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      waitForTimeout: 5000,
      waitForNavigation: 'networkidle0',
      waitForAction: 0,
      show: false,
    },

    REST: {},

    CustomHelper: {
      require: './todomvc-tests/helpers/custom.helper.js'
    }
  },

  gherkin: {
    features: './todomvc-tests/features/*.feature',
    steps: [
      './todomvc-tests/step-definitions/create-todos.steps.js',
      './todomvc-tests/step-definitions/edit-todos.steps.js',
      './todomvc-tests/step-definitions/mark-as-completed.steps.js',
      './todomvc-tests/step-definitions/persist-todos.steps.js'
    ]
  },

  include: {
    TodosPage: './todomvc-tests/pages/todos.page.js'
  },
  plugins: {
    testomat: {
      enabled: true,
      require: '@testomatio/reporter/lib/adapter/codecept',
      apiKey: 'w2n70ad83nzq',
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'codecept demo tests'
}