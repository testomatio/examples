module.exports = {
  reporterEnabled: 'spec, @testomatio/reporter/lib/adapter/mocha.js',
  testomatioReporterLibAdapterMochaJsReporterOptions: {
    apiKey: process.env.TESTOMAT_API_KEY
  }
}