module.exports = {
  testEnvironment: "node",
  reporters: ['default', "jest-junit", ['/home/davert/projects/testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }]],
};
