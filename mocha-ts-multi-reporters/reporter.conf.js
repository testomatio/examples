module.exports = {
  reporterEnabled: 'spec, @testomatio/reporter/lib/adapter/mocha.js',
  testomatioReporterLibAdapterMochaJsReporterOptions: {
    apiKey: process.env.TESTOMATIO
  }
}
