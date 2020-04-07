"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _test_helpers = require("./test_helpers");

var _sinon = _interopRequireDefault(require("sinon"));

var _get_color_fns = _interopRequireDefault(require("./get_color_fns"));

var _progress_bar_formatter = _interopRequireDefault(require("./progress_bar_formatter"));

var _status = _interopRequireDefault(require("../status"));

var _events = require("events");

var _gherkin = _interopRequireDefault(require("gherkin"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('ProgressBarFormatter', () => {
  (0, _mocha.beforeEach)(function () {
    this.eventBroadcaster = new _events.EventEmitter();
    this.output = '';

    const logFn = data => {
      this.output += data;
    };

    const colorFns = (0, _get_color_fns.default)(false);
    this.progressBarFormatter = new _progress_bar_formatter.default({
      colorFns: colorFns,
      cwd: 'path/to/project',
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new _helpers.EventDataCollector(this.eventBroadcaster),
      log: logFn,
      snippetBuilder: (0, _test_helpers.createMock)({
        build: 'snippet'
      }),
      stream: {}
    });
  });
  (0, _mocha.describe)('pickle-accepted, test-case-started', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster.emit('pickle-accepted', {
        pickle: {
          locations: [{
            line: 2
          }],
          steps: [1, 2, 3]
        },
        uri: 'path/to/feature'
      });
      this.eventBroadcaster.emit('pickle-accepted', {
        pickle: {
          locations: [{
            line: 7
          }],
          steps: [4, 5]
        },
        uri: 'path/to/feature'
      });
      const testCase = {
        attemptNumber: 1,
        sourceLocation: {
          line: 2,
          uri: 'path/to/feature'
        }
      };
      this.eventBroadcaster.emit('test-case-prepared', {
        sourceLocation: testCase.sourceLocation,
        steps: [{
          actionLocation: {
            line: 2,
            uri: 'path/to/steps'
          }
        }, {
          actionLocation: {
            line: 2,
            uri: 'path/to/steps'
          },
          sourceLocation: {
            line: 3,
            uri: 'path/to/feature'
          }
        }]
      });
      this.eventBroadcaster.emit('test-step-started');
    });
    (0, _mocha.it)('initializes a progress bar with the total number of steps', function () {
      (0, _chai.expect)(this.progressBarFormatter.progressBar.total).to.eql(5);
    });
  });
  (0, _mocha.describe)('test-step-finished', () => {
    (0, _mocha.beforeEach)(function () {
      this.progressBarFormatter.progressBar = {
        interrupt: _sinon.default.stub(),
        tick: _sinon.default.stub()
      };
      this.testCase = {
        attemptNumber: 1,
        sourceLocation: {
          line: 2,
          uri: 'path/to/feature'
        }
      };
      this.eventBroadcaster.emit('test-case-prepared', {
        sourceLocation: this.testCase.sourceLocation,
        steps: [{
          actionLocation: {
            line: 2,
            uri: 'path/to/steps'
          }
        }, {
          actionLocation: {
            line: 2,
            uri: 'path/to/steps'
          },
          sourceLocation: {
            line: 3,
            uri: 'path/to/feature'
          }
        }]
      });
      this.eventBroadcaster.emit('test-case-started', this.testCase);
    });
    (0, _mocha.describe)('step is a hook', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          testCase: this.testCase,
          result: {
            status: _status.default.PASSED
          }
        });
      });
      (0, _mocha.it)('does not increase the progress bar percentage', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.tick).to.have.callCount(0);
      });
    });
    (0, _mocha.describe)('step is a normal step', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 1,
          testCase: this.testCase,
          result: {
            status: _status.default.PASSED
          }
        });
      });
      (0, _mocha.it)('increases the progress bar percentage', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.tick).to.have.callCount(1);
      });
    });
  });
  (0, _mocha.describe)('test-case-finished', () => {
    (0, _mocha.beforeEach)(function () {
      this.progressBarFormatter.progressBar = {
        interrupt: _sinon.default.stub(),
        tick: _sinon.default.stub()
      };

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
    (0, _mocha.describe)('ambiguous', () => {
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
      });
      (0, _mocha.it)('prints the error', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
      });
    });
    (0, _mocha.describe)('failed', () => {
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
      });
      (0, _mocha.it)('prints the error', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
      });
    });
    (0, _mocha.describe)('retried', () => {
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
        this.retriedTestCase = { ...this.testCase,
          attemptNumber: 2
        };
      });
      (0, _mocha.it)('prints a warning for the failed run', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
      });
      (0, _mocha.describe)('with passing run', function () {
        (0, _mocha.beforeEach)(function () {
          this.progressBarFormatter.progressBar.interrupt.reset();
          this.eventBroadcaster.emit('test-case-started', this.retriedTestCase);
          this.eventBroadcaster.emit('test-step-finished', {
            index: 0,
            testCase: this.retriedTestCase,
            result: {
              status: _status.default.PASSED
            }
          });
          this.eventBroadcaster.emit('test-case-finished', { ...this.retriedTestCase,
            result: {
              status: _status.default.PASSED
            }
          });
        });
        (0, _mocha.it)('does not print an additional error', function () {
          (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(0);
        });
      });
      (0, _mocha.describe)('with all failures', function () {
        (0, _mocha.beforeEach)(function () {
          this.progressBarFormatter.progressBar.interrupt.reset();
          this.eventBroadcaster.emit('test-case-started', this.retriedTestCase);
          this.eventBroadcaster.emit('test-step-finished', {
            index: 0,
            testCase: this.retriedTestCase,
            result: {
              exception: 'error',
              status: _status.default.FAILED
            }
          });
          this.eventBroadcaster.emit('test-case-finished', { ...this.retriedTestCase,
            result: {
              status: _status.default.FAILED
            }
          });
        });
        (0, _mocha.it)('prints the error for the last run', function () {
          (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
        });
      });
    });
    (0, _mocha.describe)('passed', () => {
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
            status: _status.default.PASSED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.PASSED
          }
        });
      });
      (0, _mocha.it)('does not print anything', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(0);
      });
    });
    (0, _mocha.describe)('pending', () => {
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
      });
      (0, _mocha.it)('prints the warning', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
      });
    });
    (0, _mocha.describe)('skipped', () => {
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
            status: _status.default.SKIPPED
          }
        });
        this.eventBroadcaster.emit('test-case-finished', { ...this.testCase,
          result: {
            status: _status.default.SKIPPED
          }
        });
      });
      (0, _mocha.it)('does not print anything', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(0);
      });
    });
    (0, _mocha.describe)('undefined', () => {
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
      });
      (0, _mocha.it)('prints the warning', function () {
        (0, _chai.expect)(this.progressBarFormatter.progressBar.interrupt).to.have.callCount(1);
      });
    });
  });
  (0, _mocha.describe)('test-run-finished', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster.emit('test-run-finished', {
        result: {
          duration: 0
        }
      });
    });
    (0, _mocha.it)('outputs step totals, scenario totals, and duration', function () {
      (0, _chai.expect)(this.output).to.contain('0 scenarios\n' + '0 steps\n' + '0m00.000s\n');
    });
  });
});