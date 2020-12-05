exports.config = {
  tests: './specs/*.spec.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://reqres.in',
     }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptJSApi',
  };
