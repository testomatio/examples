require('dotenv').config();

module.exports = {
  testEnvironment: "node",
  reporters: ['default', ['@testomatio/reporter/lib/adapter/jest.js', { apiKey: process.env.TESTOMATIO }]],
};
