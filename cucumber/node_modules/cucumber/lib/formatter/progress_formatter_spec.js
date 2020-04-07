"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _get_color_fns = _interopRequireDefault(require("./get_color_fns"));

var _progress_formatter = _interopRequireDefault(require("./progress_formatter"));

var _status = _interopRequireDefault(require("../status"));

var _events = require("events");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('ProgressFormatter', () => {
  (0, _mocha.beforeEach)(function () {
    this.eventBroadcaster = new _events.EventEmitter();
    this.output = '';
    const colorFns = (0, _get_color_fns.default)(false);

    const logFn = data => {
      this.output += data;
    };

    this.progressFormatter = new _progress_formatter.default({
      colorFns: colorFns,
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new _helpers.EventDataCollector(this.eventBroadcaster),
      log: logFn
    });
  });
  (0, _mocha.describe)('test step finished', () => {
    (0, _mocha.beforeEach)(function () {
      this.testCase = {
        attemptNumber: 1,
        sourceLocation: {
          uri: 'path/to/feature',
          line: 1
        }
      };
      this.eventBroadcaster.emit('test-case-prepared', {
        sourceLocation: this.testCase.sourceLocation,
        steps: [{}]
      });
      this.eventBroadcaster.emit('test-case-started', this.testCase);
    });
    (0, _mocha.describe)('ambiguous', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.AMBIGUOUS
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs A', function () {
        (0, _chai.expect)(this.output).to.eql('A');
      });
    });
    (0, _mocha.describe)('failed', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.FAILED
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs F', function () {
        (0, _chai.expect)(this.output).to.eql('F');
      });
    });
    (0, _mocha.describe)('passed', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.PASSED
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs .', function () {
        (0, _chai.expect)(this.output).to.eql('.');
      });
    });
    (0, _mocha.describe)('pending', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.PENDING
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs P', function () {
        (0, _chai.expect)(this.output).to.eql('P');
      });
    });
    (0, _mocha.describe)('skipped', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.SKIPPED
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs -', function () {
        (0, _chai.expect)(this.output).to.eql('-');
      });
    });
    (0, _mocha.describe)('undefined', () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-step-finished', {
          index: 0,
          result: {
            status: _status.default.UNDEFINED
          },
          testCase: this.testCase
        });
      });
      (0, _mocha.it)('outputs U', function () {
        (0, _chai.expect)(this.output).to.eql('U');
      });
    });
  });
  (0, _mocha.describe)('test run finished', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster.emit('test-run-finished', {
        result: {
          duration: 0
        }
      });
    });
    (0, _mocha.it)('outputs two newlines before the summary', function () {
      (0, _chai.expect)(this.output).to.eql('\n\n0 scenarios\n0 steps\n0m00.000s\n');
    });
  });
});