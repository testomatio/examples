"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _test_case_hook_definition = _interopRequireDefault(require("../models/test_case_hook_definition"));

var _test_case_runner = _interopRequireDefault(require("./test_case_runner"));

var _status = _interopRequireDefault(require("../status"));

var _step_runner = _interopRequireDefault(require("./step_runner"));

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('TestCaseRunner', () => {
  (0, _mocha.beforeEach)(function () {
    this.onTestCasePrepared = _sinon.default.stub();
    this.onTestCaseStarted = _sinon.default.stub();
    this.onTestStepStarted = _sinon.default.stub();
    this.onTestStepFinished = _sinon.default.stub();
    this.onTestCaseFinished = _sinon.default.stub();
    this.eventBroadcaster = new _events.EventEmitter();
    this.eventBroadcaster.on('test-case-prepared', this.onTestCasePrepared);
    this.eventBroadcaster.on('test-case-started', this.onTestCaseStarted);
    this.eventBroadcaster.on('test-step-started', this.onTestStepStarted);
    this.eventBroadcaster.on('test-step-finished', this.onTestStepFinished);
    this.eventBroadcaster.on('test-case-finished', this.onTestCaseFinished);
    this.testCase = {
      pickle: {
        steps: [],
        locations: [{
          line: 1
        }]
      },
      uri: 'path/to/feature'
    };
    this.onWorldConstructed = _sinon.default.stub();
    const owc = this.onWorldConstructed;
    this.supportCodeLibrary = {
      afterTestCaseHookDefinitions: [],
      beforeTestCaseHookDefinitions: [],
      defaultTimeout: 5000,
      stepDefinitions: [],
      parameterTypeRegistry: {},
      World: function () {
        owc();
      }
    };

    _sinon.default.stub(_step_runner.default, 'run');
  });
  (0, _mocha.afterEach)(() => {
    _step_runner.default.run.restore();
  });
  (0, _mocha.describe)('run()', () => {
    (0, _mocha.describe)('with no steps or hooks', () => {
      (0, _mocha.beforeEach)(async function () {
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.PASSED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with a passing step', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        this.stepResult = {
          duration: 1,
          status: _status.default.PASSED
        };
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };

        _step_runner.default.run.resolves(this.stepResult);

        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            duration: 1,
            status: _status.default.PASSED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 1,
            status: _status.default.PASSED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with a failing step', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        this.error = new Error('a');
        this.stepResult = {
          duration: 1,
          status: _status.default.FAILED,
          exception: this.error
        };
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };

        _step_runner.default.run.resolves(this.stepResult);

        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            duration: 1,
            status: _status.default.FAILED,
            exception: this.error
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 1,
            status: _status.default.FAILED,
            exception: this.error
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with a flaky step and a positive retries value', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        this.error = new Error('a');
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };

        _step_runner.default.run.onFirstCall().resolves({
          duration: 1,
          status: _status.default.FAILED,
          exception: this.error
        });

        _step_runner.default.run.onSecondCall().resolves({
          duration: 1,
          status: _status.default.PASSED
        });

        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          retries: 1,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started twice', function () {
        const sourceLocation = {
          line: 1,
          uri: 'path/to/feature'
        };
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(2);
        (0, _chai.expect)(this.onTestCaseStarted.firstCall).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: sourceLocation
        });
        (0, _chai.expect)(this.onTestCaseStarted.secondCall).to.have.been.calledWith({
          attemptNumber: 2,
          sourceLocation: sourceLocation
        });
      });
      (0, _mocha.it)('emits test-step-started twice', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepStarted.firstCall).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
        (0, _chai.expect)(this.onTestStepStarted.secondCall).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 2,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished twice', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepFinished.firstCall).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            duration: 1,
            status: _status.default.FAILED,
            exception: this.error
          }
        });
        (0, _chai.expect)(this.onTestStepFinished.secondCall).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 2,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            duration: 1,
            status: _status.default.PASSED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished twice', function () {
        const sourceLocation = {
          line: 1,
          uri: 'path/to/feature'
        };
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(2);
        (0, _chai.expect)(this.onTestCaseFinished.firstCall).to.have.been.calledWith({
          result: {
            duration: 1,
            exception: this.error,
            retried: true,
            status: _status.default.FAILED
          },
          attemptNumber: 1,
          sourceLocation: sourceLocation
        });
        (0, _chai.expect)(this.onTestCaseFinished.secondCall).to.have.been.calledWith({
          result: {
            duration: 1,
            status: _status.default.PASSED
          },
          attemptNumber: 2,
          sourceLocation: sourceLocation
        });
      });
      (0, _mocha.it)('constructs the World twice', function () {
        (0, _chai.expect)(this.onWorldConstructed).to.have.callCount(2);
      });
    });
    (0, _mocha.describe)('with an ambiguous step', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        const stepDefinition1 = {
          pattern: 'pattern1',
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };
        const stepDefinition2 = {
          pattern: 'pattern2',
          uri: 'path/to/steps',
          line: 4,
          matchesStepName: _sinon.default.stub().returns(true)
        };
        this.supportCodeLibrary.stepDefinitions = [stepDefinition1, stepDefinition2];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            exception: 'Multiple step definitions match:\n' + '  pattern1 - path/to/steps:3\n' + '  pattern2 - path/to/steps:4',
            status: _status.default.AMBIGUOUS
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.AMBIGUOUS,
            exception: 'Multiple step definitions match:\n' + '  pattern1 - path/to/steps:3\n' + '  pattern2 - path/to/steps:4'
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with an undefined step', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: false,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.UNDEFINED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.UNDEFINED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with a step when skipping', () => {
      (0, _mocha.beforeEach)(async function () {
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };
        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: true,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.SKIPPED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.SKIPPED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with a before hook and step when skipping', () => {
      (0, _mocha.beforeEach)(async function () {
        const testCaseHookDefinition = new _test_case_hook_definition.default({
          code: function () {
            throw new Error('error');
          },
          line: 4,
          options: {},
          uri: 'path/to/hooks'
        });
        this.supportCodeLibrary.beforeTestCaseHookDefinitions = [testCaseHookDefinition];
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };
        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: true,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 4,
              uri: 'path/to/hooks'
            }
          }, {
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 1,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.SKIPPED
          }
        });
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 1,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.SKIPPED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.SKIPPED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
    (0, _mocha.describe)('with an after hook when skipping', () => {
      (0, _mocha.beforeEach)(async function () {
        const testCaseHookDefinition = new _test_case_hook_definition.default({
          code: function () {
            throw new Error('error');
          },
          line: 4,
          options: {},
          uri: 'path/to/hooks'
        });
        this.supportCodeLibrary.afterTestCaseHookDefinitions = [testCaseHookDefinition];
        this.step = {
          uri: 'path/to/feature',
          locations: [{
            line: 2
          }]
        };
        const stepDefinition = {
          uri: 'path/to/steps',
          line: 3,
          matchesStepName: _sinon.default.stub().returns(true)
        };
        this.supportCodeLibrary.stepDefinitions = [stepDefinition];
        this.testCase.pickle.steps = [this.step];
        const scenarioRunner = new _test_case_runner.default({
          eventBroadcaster: this.eventBroadcaster,
          skip: true,
          testCase: this.testCase,
          supportCodeLibrary: this.supportCodeLibrary
        });
        await scenarioRunner.run();
      });
      (0, _mocha.it)('emits test-case-prepared', function () {
        (0, _chai.expect)(this.onTestCasePrepared).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCasePrepared).to.have.been.calledWith({
          steps: [{
            actionLocation: {
              line: 3,
              uri: 'path/to/steps'
            },
            sourceLocation: {
              line: 2,
              uri: 'path/to/feature'
            }
          }, {
            actionLocation: {
              line: 4,
              uri: 'path/to/hooks'
            }
          }],
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-case-started', function () {
        (0, _chai.expect)(this.onTestCaseStarted).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseStarted).to.have.been.calledWith({
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
      (0, _mocha.it)('emits test-step-started', function () {
        (0, _chai.expect)(this.onTestStepStarted).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
        (0, _chai.expect)(this.onTestStepStarted).to.have.been.calledWith({
          index: 1,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          }
        });
      });
      (0, _mocha.it)('emits test-step-finished', function () {
        (0, _chai.expect)(this.onTestStepFinished).to.have.callCount(2);
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 0,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.SKIPPED
          }
        });
        (0, _chai.expect)(this.onTestStepFinished).to.have.been.calledWith({
          index: 1,
          testCase: {
            attemptNumber: 1,
            sourceLocation: {
              line: 1,
              uri: 'path/to/feature'
            }
          },
          result: {
            status: _status.default.SKIPPED
          }
        });
      });
      (0, _mocha.it)('emits test-case-finished', function () {
        (0, _chai.expect)(this.onTestCaseFinished).to.have.callCount(1);
        (0, _chai.expect)(this.onTestCaseFinished).to.have.been.calledWith({
          result: {
            duration: 0,
            status: _status.default.SKIPPED
          },
          attemptNumber: 1,
          sourceLocation: {
            line: 1,
            uri: 'path/to/feature'
          }
        });
      });
    });
  });
});