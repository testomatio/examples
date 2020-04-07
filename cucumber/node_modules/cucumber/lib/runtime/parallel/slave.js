"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("../../formatter/helpers");

var _command_types = _interopRequireDefault(require("./command_types"));

var _events = _interopRequireDefault(require("events"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _serializeError = _interopRequireDefault(require("serialize-error"));

var _stack_trace_filter = _interopRequireDefault(require("../../stack_trace_filter"));

var _support_code_library_builder = _interopRequireDefault(require("../../support_code_library_builder"));

var _test_case_runner = _interopRequireDefault(require("../test_case_runner"));

var _user_code_runner = _interopRequireDefault(require("../../user_code_runner"));

var _verror = _interopRequireDefault(require("verror"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENTS = ['test-case-prepared', 'test-case-started', 'test-step-started', 'test-step-attachment', 'test-step-finished', 'test-case-finished'];

function serializeResultExceptionIfNecessary(data) {
  if (data.result && data.result.exception && _lodash.default.isError(data.result.exception)) {
    data.result.exception = (0, _serializeError.default)(data.result.exception);
  }
}

class Slave {
  constructor({
    cwd: cwd,
    exit: exit,
    id: id,
    sendMessage: sendMessage
  }) {
    this.id = id;
    this.initialized = false;
    this.cwd = cwd;
    this.exit = exit;
    this.sendMessage = sendMessage;
    this.eventBroadcaster = new _events.default();
    this.stackTraceFilter = new _stack_trace_filter.default();
    EVENTS.forEach(name => {
      this.eventBroadcaster.on(name, data => {
        serializeResultExceptionIfNecessary(data);
        this.sendMessage({
          command: _command_types.default.EVENT,
          name: name,
          data: data
        });
      });
    });
  }

  async initialize({
    filterStacktraces: filterStacktraces,
    supportCodeRequiredModules: supportCodeRequiredModules,
    supportCodePaths: supportCodePaths,
    worldParameters: worldParameters
  }) {
    supportCodeRequiredModules.map(module => require(module));

    _support_code_library_builder.default.reset(this.cwd);

    supportCodePaths.forEach(codePath => require(codePath));
    this.supportCodeLibrary = _support_code_library_builder.default.finalize();
    this.worldParameters = worldParameters;
    this.filterStacktraces = filterStacktraces;

    if (this.filterStacktraces) {
      this.stackTraceFilter.filter();
    }

    await this.runTestRunHooks('beforeTestRunHookDefinitions', 'a BeforeAll');
    this.sendMessage({
      command: _command_types.default.READY
    });
  }

  async finalize() {
    await this.runTestRunHooks('afterTestRunHookDefinitions', 'an AfterAll');

    if (this.filterStacktraces) {
      this.stackTraceFilter.unfilter();
    }

    this.exit();
  }

  receiveMessage(message) {
    if (message.command === 'initialize') {
      this.initialize(message);
    } else if (message.command === 'finalize') {
      this.finalize();
    } else if (message.command === 'run') {
      this.runTestCase(message);
    }
  }

  async runTestCase({
    testCase: testCase,
    retries: retries,
    skip: skip
  }) {
    const testCaseRunner = new _test_case_runner.default({
      eventBroadcaster: this.eventBroadcaster,
      retries: retries,
      skip: skip,
      supportCodeLibrary: this.supportCodeLibrary,
      testCase: testCase,
      worldParameters: this.worldParameters
    });
    await testCaseRunner.run();
    this.sendMessage({
      command: _command_types.default.READY
    });
  }

  async runTestRunHooks(key, name) {
    await _bluebird.default.each(this.supportCodeLibrary[key], async hookDefinition => {
      const {
        error: error
      } = await _user_code_runner.default.run({
        argsArray: [],
        fn: hookDefinition.code,
        thisArg: null,
        timeoutInMilliseconds: hookDefinition.options.timeout || this.supportCodeLibrary.defaultTimeout
      });

      if (error) {
        const location = (0, _helpers.formatLocation)(hookDefinition);
        console.error(_verror.default.fullStack(new _verror.default(error, `${name} hook errored on slave ${this.id}, process exiting: ${location}`))); // eslint-disable-line no-console

        this.exit(1);
      }
    });
  }

}

exports.default = Slave;