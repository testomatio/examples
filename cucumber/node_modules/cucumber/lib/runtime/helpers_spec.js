"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _helpers = require("./helpers");

(0, _mocha.describe)('Helpers', () => {
  (0, _mocha.describe)('getAmbiguousStepException', () => {
    (0, _mocha.beforeEach)(function () {
      this.result = (0, _helpers.getAmbiguousStepException)([{
        line: 3,
        pattern: 'pattern1',
        uri: 'steps1.js'
      }, {
        line: 4,
        pattern: 'longer pattern2',
        uri: 'steps2.js'
      }]);
    });
    (0, _mocha.it)('returns a nicely formatted error', function () {
      (0, _chai.expect)(this.result).to.eql('Multiple step definitions match:\n' + '  pattern1        - steps1.js:3\n' + '  longer pattern2 - steps2.js:4');
    });
  });
  (0, _mocha.describe)('retriesForTestCase', () => {
    (0, _mocha.it)('returns 0 if options.retry is not set', () => {
      const testCase = {
        pickle: {
          tags: []
        }
      };
      (0, _chai.expect)((0, _helpers.retriesForTestCase)(testCase, {})).to.eql(0);
    });
    (0, _mocha.it)('returns options.retry if set and no options.retryTagFilter is specified', () => {
      const testCase = {
        pickle: {
          tags: []
        }
      };
      const options = {
        retry: 1
      };
      (0, _chai.expect)((0, _helpers.retriesForTestCase)(testCase, options)).to.eql(1);
    });
    (0, _mocha.it)('returns options.retry is set and the test case tags match options.retryTagFilter', () => {
      const testCase = {
        pickle: {
          tags: [{
            name: '@retry'
          }]
        },
        uri: 'features/a.feature'
      };
      const options = {
        retry: 1,
        retryTagFilter: '@retry'
      };
      (0, _chai.expect)((0, _helpers.retriesForTestCase)(testCase, options)).to.eql(1);
    });
    (0, _mocha.it)('returns 0 if options.retry is set but the test case tags do not match options.retryTagFilter', () => {
      const testCase = {
        pickle: {
          tags: [{
            name: '@no_retry'
          }]
        },
        uri: 'features/a.feature'
      };
      const options = {
        retry: 1,
        retryTagFilter: '@retry'
      };
      (0, _chai.expect)((0, _helpers.retriesForTestCase)(testCase, options)).to.eql(0);
    });
  });
});