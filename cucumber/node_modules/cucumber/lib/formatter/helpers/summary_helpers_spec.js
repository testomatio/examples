"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _get_color_fns = _interopRequireDefault(require("../get_color_fns"));

var _summary_helpers = require("./summary_helpers");

var _status = _interopRequireDefault(require("../../status"));

var _time = require("../../time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('SummaryHelpers', () => {
  (0, _mocha.describe)('formatSummary', () => {
    (0, _mocha.beforeEach)(function () {
      this.testCaseAttempts = [];
      this.testRun = {
        result: {
          duration: 0
        }
      };
      this.options = {
        colorFns: (0, _get_color_fns.default)(false),
        testCaseAttempts: this.testCaseAttempts,
        testRun: this.testRun
      };
    });
    (0, _mocha.describe)('with no test cases', () => {
      (0, _mocha.beforeEach)(function () {
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs step totals, scenario totals, and duration', function () {
        (0, _chai.expect)(this.result).to.contain('0 scenarios\n' + '0 steps\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with one passing scenario with one passing step', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PASSED
          },
          stepResults: [{
            status: _status.default.PASSED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }]
          }
        });
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the totals and number of each status', function () {
        (0, _chai.expect)(this.result).to.contain('1 scenario (1 passed)\n' + '1 step (1 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with one passing scenario with one step and hook', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PASSED
          },
          stepResults: [{
            status: _status.default.PASSED
          }, {
            status: _status.default.PASSED
          }],
          testCase: {
            steps: [{}, {
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }]
          }
        });
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('filter out the hooks', function () {
        (0, _chai.expect)(this.result).to.contain('1 scenario (1 passed)\n' + '1 step (1 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with one scenario that failed and was retried then passed', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseAttempts.push({
          result: {
            status: _status.default.FAILED,
            retried: true
          },
          stepResults: [{
            status: _status.default.FAILED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PASSED
          },
          stepResults: [{
            status: _status.default.PASSED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }]
          }
        });
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('filters out the retried attempts', function () {
        (0, _chai.expect)(this.result).to.contain('1 scenario (1 passed)\n' + '1 step (1 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with one passing scenario with multiple passing steps', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PASSED
          },
          stepResults: [{
            status: _status.default.PASSED
          }, {
            status: _status.default.PASSED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }, {
              sourceLocation: {
                uri: 'a.feature',
                line: 3
              }
            }]
          }
        });
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the totals and number of each status', function () {
        (0, _chai.expect)(this.result).to.contain('1 scenario (1 passed)\n' + '2 steps (2 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with one of every kind of scenario', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseAttempts.push({
          result: {
            status: _status.default.AMBIGUOUS
          },
          stepResults: [{
            status: _status.default.AMBIGUOUS
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 2
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.FAILED
          },
          stepResults: [{
            status: _status.default.FAILED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 4
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PENDING
          },
          stepResults: [{
            status: _status.default.PENDING
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 6
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.PASSED
          },
          stepResults: [{
            status: _status.default.PASSED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 8
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.SKIPPED
          },
          stepResults: [{
            status: _status.default.SKIPPED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 10
              }
            }]
          }
        });
        this.testCaseAttempts.push({
          result: {
            status: _status.default.UNDEFINED
          },
          stepResults: [{
            status: _status.default.UNDEFINED
          }],
          testCase: {
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 12
              }
            }]
          }
        });
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the totals and number of each status', function () {
        (0, _chai.expect)(this.result).to.contain('6 scenarios (1 failed, 1 ambiguous, 1 undefined, 1 pending, 1 skipped, 1 passed)\n' + '6 steps (1 failed, 1 ambiguous, 1 undefined, 1 pending, 1 skipped, 1 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with a duration of 123 milliseconds', () => {
      (0, _mocha.beforeEach)(function () {
        this.testRun.result.duration = 123 * _time.MILLISECONDS_IN_NANOSECOND;
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the duration as 0m00.123s', function () {
        (0, _chai.expect)(this.result).to.contain('0 scenarios\n' + '0 steps\n' + '0m00.123s\n');
      });
    });
    (0, _mocha.describe)('with a duration of 12.3 seconds', () => {
      (0, _mocha.beforeEach)(function () {
        this.testRun.result.duration = 123 * 100 * _time.MILLISECONDS_IN_NANOSECOND;
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the duration as 0m12.300s', function () {
        (0, _chai.expect)(this.result).to.contain('0 scenarios\n' + '0 steps\n' + '0m12.300s\n');
      });
    });
    (0, _mocha.describe)('with a duration of 120.3 seconds', () => {
      (0, _mocha.beforeEach)(function () {
        this.testRun.result.duration = 123 * 1000 * _time.MILLISECONDS_IN_NANOSECOND;
        this.result = (0, _summary_helpers.formatSummary)(this.options);
      });
      (0, _mocha.it)('outputs the duration as 2m03.000s', function () {
        (0, _chai.expect)(this.result).to.contain('0 scenarios\n' + '0 steps\n' + '2m03.000s\n');
      });
    });
  });
});