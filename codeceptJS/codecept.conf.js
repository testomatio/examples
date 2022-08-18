require('dotenv').config();

const { setHeadlessWhen } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './todomvc-tests/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      video: true,
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

  include: {
    TodosPage: './todomvc-tests/pages/todos.page.js'
  },
  plugins: {
    testomatio: {
      enabled: true,
      require: '@testomatio/reporter/lib/adapter/codecept',
      apiKey:  process.env.TESTOMATIO,
    },
  },
  bootstrap: null,
  mocha: {},
  name: 'codecept demo tests'
}
