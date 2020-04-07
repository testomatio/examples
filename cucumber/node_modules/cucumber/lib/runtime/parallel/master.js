"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _child_process = require("child_process");

var _command_types = _interopRequireDefault(require("./command_types"));

var _path = _interopRequireDefault(require("path"));

var _status = _interopRequireDefault(require("../../status"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const slaveCommand = _path.default.resolve(__dirname, '..', '..', '..', 'bin', 'run_slave');

class Master {
  // options - {dryRun, failFast, filterStacktraces, retry, retryTagFilter, strict}
  constructor({
    cwd: cwd,
    eventBroadcaster: eventBroadcaster,
    options: options,
    supportCodePaths: supportCodePaths,
    supportCodeRequiredModules: supportCodeRequiredModules,
    testCases: testCases
  }) {
    this.cwd = cwd;
    this.eventBroadcaster = eventBroadcaster;
    this.options = options || {};
    this.supportCodePaths = supportCodePaths;
    this.supportCodeRequiredModules = supportCodeRequiredModules;
    this.testCases = testCases || [];
    this.nextTestCaseIndex = 0;
    this.result = {
      duration: 0,
      success: true
    };
    this.slaves = {};
  }

  parseSlaveMessage(slave, message) {
    switch (message.command) {
      case _command_types.default.READY:
        this.giveSlaveWork(slave);
        break;

      case _command_types.default.EVENT:
        this.eventBroadcaster.emit(message.name, message.data);

        if (message.name === 'test-case-finished') {
          this.parseTestCaseResult(message.data.result);
        }

        break;

      default:
        throw new Error(`Unexpected message from slave: ${message}`);
    }
  }

  startSlave(id, total) {
    const slaveProcess = (0, _child_process.fork)(slaveCommand, [], {
      cwd: this.cwd,
      env: _lodash.default.assign({}, process.env, {
        CUCUMBER_PARALLEL: 'true',
        CUCUMBER_TOTAL_SLAVES: total,
        CUCUMBER_SLAVE_ID: id
      }),
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });
    const slave = {
      process: slaveProcess
    };
    this.slaves[id] = slave;
    slave.process.on('message', message => {
      this.parseSlaveMessage(slave, message);
    });
    slave.process.on('close', error => {
      slave.closed = true;
      this.onSlaveClose(error);
    });
    slave.process.send({
      command: _command_types.default.INITIALIZE,
      filterStacktraces: this.options.filterStacktraces,
      supportCodePaths: this.supportCodePaths,
      supportCodeRequiredModules: this.supportCodeRequiredModules,
      worldParameters: this.options.worldParameters
    });
  }

  onSlaveClose(error) {
    if (error) {
      this.result.success = false;
    }

    if (_lodash.default.every(this.slaves, 'closed')) {
      this.eventBroadcaster.emit('test-run-finished', {
        result: this.result
      });
      this.onFinish(this.result.success);
    }
  }

  parseTestCaseResult(testCaseResult) {
    if (testCaseResult.duration) {
      this.result.duration += testCaseResult.duration;
    }

    if (!testCaseResult.retried && this.shouldCauseFailure(testCaseResult.status)) {
      this.result.success = false;
    }
  }

  run(numberOfSlaves, done) {
    this.eventBroadcaster.emit('test-run-started');

    _lodash.default.times(numberOfSlaves, id => this.startSlave(id, numberOfSlaves));

    this.onFinish = done;
  }

  giveSlaveWork(slave) {
    if (this.nextTestCaseIndex === this.testCases.length) {
      slave.process.send({
        command: _command_types.default.FINALIZE
      });
      return;
    }

    const testCase = this.testCases[this.nextTestCaseIndex];
    this.nextTestCaseIndex += 1;
    const retries = (0, _helpers.retriesForTestCase)(testCase, this.options);
    const skip = this.options.dryRun || this.options.failFast && !this.result.success;
    slave.process.send({
      command: _command_types.default.RUN,
      retries: retries,
      skip: skip,
      testCase: testCase
    });
  }

  shouldCauseFailure(status) {
    return _lodash.default.includes([_status.default.AMBIGUOUS, _status.default.FAILED, _status.default.UNDEFINED], status) || status === _status.default.PENDING && this.options.strict;
  }

}

exports.default = Master;