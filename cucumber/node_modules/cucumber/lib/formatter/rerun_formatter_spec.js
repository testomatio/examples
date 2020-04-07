"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _rerun_formatter = _interopRequireDefault(require("./rerun_formatter"));

var _status = _interopRequireDefault(require("../status"));

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareFormatter(options = {}) {
  this.output = '';

  const logFn = data => {
    this.output += data;
  };

  this.eventBroadcaster = new _events.EventEmitter();
  this.feature1Path = _path.default.join('features', 'a.feature');
  this.feature2Path = _path.default.join('features', 'b.feature');
  this.rerunFormatter = new _rerun_formatter.default({ ...options,
    eventBroadcaster: this.eventBroadcaster,
    log: logFn
  });
}

(0, _mocha.describe)('RerunFormatter', () => {
  (0, _mocha.beforeEach)(prepareFormatter);
  (0, _mocha.describe)('with no scenarios', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster.emit('test-run-finished');
    });
    (0, _mocha.it)('outputs nothing', function () {
      (0, _chai.expect)(this.output).to.eql('');
    });
  });

  _lodash.default.each([_status.default.PASSED], status => {
    (0, _mocha.describe)(`with one ${status} scenario`, () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-finished', {
          sourceLocation: {
            uri: this.feature1Path,
            line: 1
          },
          result: {
            status: status
          }
        });
        this.eventBroadcaster.emit('test-run-finished');
      });
      (0, _mocha.it)('outputs nothing', function () {
        (0, _chai.expect)(this.output).to.eql('');
      });
    });
  });

  _lodash.default.each([_status.default.AMBIGUOUS, _status.default.FAILED, _status.default.PENDING, _status.default.SKIPPED, _status.default.UNDEFINED], status => {
    (0, _mocha.describe)(`with one ${status} scenario`, () => {
      (0, _mocha.beforeEach)(function () {
        this.eventBroadcaster.emit('test-case-finished', {
          sourceLocation: {
            uri: this.feature1Path,
            line: 1
          },
          result: {
            status: status
          }
        });
        this.eventBroadcaster.emit('test-run-finished');
      });
      (0, _mocha.it)('outputs the reference needed to run the scenario again', function () {
        (0, _chai.expect)(this.output).to.eql(`${this.feature1Path}:1`);
      });
    });
  });

  (0, _mocha.describe)('with two failing scenarios in the same file', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster.emit('test-case-finished', {
        sourceLocation: {
          uri: this.feature1Path,
          line: 1
        },
        result: {
          status: _status.default.FAILED
        }
      });
      this.eventBroadcaster.emit('test-case-finished', {
        sourceLocation: {
          uri: this.feature1Path,
          line: 2
        },
        result: {
          status: _status.default.FAILED
        }
      });
      this.eventBroadcaster.emit('test-run-finished');
    });
    (0, _mocha.it)('outputs the reference needed to run the scenarios again', function () {
      (0, _chai.expect)(this.output).to.eql(`${this.feature1Path}:1:2`);
    });
  });

  _lodash.default.each([{
    separator: {
      opt: undefined,
      expected: '\n'
    },
    label: 'default'
  }, {
    separator: {
      opt: '\n',
      expected: '\n'
    },
    label: 'newline'
  }, {
    separator: {
      opt: ' ',
      expected: ' '
    },
    label: 'space'
  }], ({
    separator: separator,
    label: label
  }) => {
    (0, _mocha.describe)(`using ${label} separator`, () => {
      (0, _mocha.describe)('with two failing scenarios in different files', () => {
        (0, _mocha.beforeEach)(function () {
          prepareFormatter.apply(this, [{
            rerun: {
              separator: separator.opt
            }
          }]);
          this.eventBroadcaster.emit('test-case-finished', {
            sourceLocation: {
              uri: this.feature1Path,
              line: 1
            },
            result: {
              status: _status.default.FAILED
            }
          });
          this.eventBroadcaster.emit('test-case-finished', {
            sourceLocation: {
              uri: this.feature2Path,
              line: 2
            },
            result: {
              status: _status.default.FAILED
            }
          });
          this.eventBroadcaster.emit('test-run-finished');
        });
        (0, _mocha.it)('outputs the references needed to run the scenarios again', function () {
          (0, _chai.expect)(this.output).to.eql(`${this.feature1Path}:1${separator.expected}${this.feature2Path}:2`);
        });
      });
    });
  });
});