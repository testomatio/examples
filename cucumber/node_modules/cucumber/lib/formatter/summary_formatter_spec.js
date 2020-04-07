"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _test_helpers = require("./test_helpers");

var _get_color_fns = _interopRequireDefault(require("./get_color_fns"));

var _status = _interopRequireDefault(require("../status"));

var _summary_formatter = _interopRequireDefault(require("./summary_formatter"));

var _figures = _interopRequireDefault(require("figures"));

var _events = require("events");

var _gherkin = _interopRequireDefault(require("gherkin"));

var _helpers = require("./helpers");

var _time = require("../time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('SummaryFormatter', () => {
  (0, _mocha.beforeEach)(function () {
    this.output = '';

    const logFn = data => {
      this.output += data;
    };

    this.eventBroadcaster = new _events.EventEmitter();
    this.summaryFormatter = new _summary_formatter.default({
      colorFns: (0, _get_color_fns.default)(false),
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new _helpers.EventDataCollector(this.eventBroadcaster),
      log: logFn,
      snippetBuilder: (0, _test_helpers.createMock)({
        build: 'snippet'
      })
    });
  });
  (0, _mocha.describe)('issues', () => {
    (0, _mocha.beforeEach)(function () {
      const events = _gherkin.default.generateEvents('Feature: a\nScenario: b\nGiven a step', 'a.feature');

      events.forEach(event => {
        this.eventBroadcaster.emit(event.type, event);

        if (event.type === 'pickle') {
          this.eventBroadcaster.emit('pickle-accepted', {
            type: 'pickle-accepted',
            pickle: event.pickle,
            uri: event.uri
          });
        }
      });
      this.testCase = {
        attemptNumber: 1,
        sourceLocation: {
          uri: 'a.feature',
          line: 2
        }
      };
    });
    (0, _mocha.describe)('with a failing scenario', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            },
            actionLocation: {
              uri: 'steps.js',
              line: 4
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            exception: 'error',
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Failures:\n' + '\n' + '1) Scenario: b # a.feature:2\n' + `   ${_figures.default.cross} Given a step # steps.js:4\n` + '       error\n' + '\n' + '1 scenario (1 failed)\n' + '1 step (1 failed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with an ambiguous step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            exception: 'Multiple step definitions match:\n' + '  pattern1        - steps.js:3\n' + '  longer pattern2 - steps.js:4',
            status: _status.default.AMBIGUOUS
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.AMBIGUOUS
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Failures:\n' + '\n' + '1) Scenario: b # a.feature:2\n' + `   ${_figures.default.cross} Given a step\n` + '       Multiple step definitions match:\n' + '         pattern1        - steps.js:3\n' + '         longer pattern2 - steps.js:4\n' + '\n' + '1 scenario (1 ambiguous)\n' + '1 step (1 ambiguous)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with an undefined step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            status: _status.default.UNDEFINED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.UNDEFINED
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Warnings:\n' + '\n' + '1) Scenario: b # a.feature:2\n' + '   ? Given a step\n' + '       Undefined. Implement with the following snippet:\n' + '\n' + '         snippet\n' + '\n' + '\n' + '1 scenario (1 undefined)\n' + '1 step (1 undefined)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with a pending step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            },
            actionLocation: {
              uri: 'steps.js',
              line: 4
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            status: _status.default.PENDING
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.PENDING
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Warnings:\n' + '\n' + '1) Scenario: b # a.feature:2\n' + '   ? Given a step # steps.js:4\n' + '       Pending\n' + '\n' + '1 scenario (1 pending)\n' + '1 step (1 pending)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with a passing flaky step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            },
            actionLocation: {
              uri: 'steps.js',
              line: 4
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            exception: 'error',
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.FAILED,
            retried: true
          }
        });
        const retriedTestCase = { ...this.testCase,
          attemptNumber: 2
        };
        this.eventBroadcaster.emit('test-case-started', retriedTestCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: retriedTestCase,
          result: {
            status: _status.default.PASSED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...retriedTestCase,
          result: {
            status: _status.default.PASSED
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Warnings:\n' + '\n' + '1) Scenario: b (attempt 1, retried) # a.feature:2\n' + `   ${_figures.default.cross} Given a step # steps.js:4\n` + '       error\n' + '\n' + '1 scenario (1 passed)\n' + '1 step (1 passed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('with a failed flaky step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: this.testCase.sourceLocation,
          steps: [{
            sourceLocation: {
              uri: 'a.feature',
              line: 3
            },
            actionLocation: {
              uri: 'steps.js',
              line: 4
            }
          }]
        });
        this.eventBroadcaster.emit('test-case-started', this.testCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            exception: 'error',
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.FAILED,
            retried: true
          }
        });
        const retriedTestCase = { ...this.testCase,
          attemptNumber: 2
        };
        this.eventBroadcaster.emit('test-case-started', retriedTestCase);
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: retriedTestCase,
          result: {
            exception: 'error',
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...retriedTestCase,
          result: {
            status: _status.default.FAILED
          }
        });
        this.eventBroadcaster.emit('test-run-finished', {
          result: {
            duration: 0
          }
        });
      });
      (0, _mocha.it)('logs the issue', function () {
        (0, _chai.expect)(this.output).to.eql('Failures:\n' + '\n' + '1) Scenario: b (attempt 2) # a.feature:2\n' + `   ${_figures.default.cross} Given a step # steps.js:4\n` + '       error\n' + '\n' + 'Warnings:\n' + '\n' + '1) Scenario: b (attempt 1, retried) # a.feature:2\n' + `   ${_figures.default.cross} Given a step # steps.js:4\n` + '       error\n' + '\n' + '1 scenario (1 failed)\n' + '1 step (1 failed)\n' + '0m00.000s\n');
      });
    });
    (0, _mocha.describe)('summary', () => {
      (0, _mocha.describe)('with a duration of 123 milliseconds', () => {
        (0, _mocha.beforeEach)(function () {
          this.eventBroadcaster.emit('test-run-finished', {
            result: {
              duration: 123 * _time.MILLISECONDS_IN_NANOSECOND
            }
          });
        });
        (0, _mocha.it)('outputs scenario totals, step totals, and duration', function () {
          (0, _chai.expect)(this.output).to.contain('0 scenarios\n0 steps\n0m00.123s\n');
        });
      });
      (0, _mocha.describe)('with a duration of 12.3 seconds', () => {
        (0, _mocha.beforeEach)(function () {
          this.eventBroadcaster.emit('test-run-finished', {
            result: {
              duration: 123 * 100 * _time.MILLISECONDS_IN_NANOSECOND
            }
          });
        });
        (0, _mocha.it)('outputs scenario totals, step totals, and duration', function () {
          (0, _chai.expect)(this.output).to.contain('0 scenarios\n0 steps\n0m12.300s\n');
        });
      });
      (0, _mocha.describe)('with a duration of 120.3 seconds', () => {
        (0, _mocha.beforeEach)(function () {
          this.eventBroadcaster.emit('test-run-finished', {
            result: {
              duration: 123 * 1000 * _time.MILLISECONDS_IN_NANOSECOND
            }
          });
        });
        (0, _mocha.it)('outputs scenario totals, step totals, and duration', function () {
          (0, _chai.expect)(this.output).to.contain('0 scenarios\n0 steps\n2m03.000s\n');
        });
      });
    });
  });
});