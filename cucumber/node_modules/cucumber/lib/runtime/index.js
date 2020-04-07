"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("../formatter/helpers");

var _bluebird = _interopRequireDefault(require("bluebird"));

var _stack_trace_filter = _interopRequireDefault(require("../stack_trace_filter"));

var _status = _interopRequireDefault(require("../status"));

var _test_case_runner = _interopRequireDefault(require("./test_case_runner"));

var _user_code_runner = _interopRequireDefault(require("../user_code_runner"));

var _verror = _interopRequireDefault(require("verror"));

var _helpers2 = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Runtime {
  // options - {dryRun, failFast, filterStacktraces, retry, retryTagFilter, strict}
  constructor({
    eventBroadcaster: eventBroadcaster,
    options: options,
    supportCodeLibrary: supportCodeLibrary,
    testCases: testCases
  }) {
    this.eventBroadcaster = eventBroadcaster;
    this.options = options || {};
    this.stackTraceFilter = new _stack_trace_filter.default();
    this.supportCodeLibrary = supportCodeLibrary;
    this.testCases = testCases || [];
    this.result = {
      duration: 0,
      success: true
    };
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
        throw new _verror.default(error, `${name} hook errored, process exiting: ${location}`);
      }
    });
  }

  async runTestCase(testCase) {
    const retries = (0, _helpers2.retriesForTestCase)(testCase, this.options);
    const skip = this.options.dryRun || this.options.failFast && !this.result.success;
    const testCaseRunner = new _test_case_runner.default({
      eventBroadcaster: this.eventBroadcaster,
      retries: retries,
      skip: skip,
      supportCodeLibrary: this.supportCodeLibrary,
      testCase: testCase,
      worldParameters: this.options.worldParameters
    });
    const testCaseResult = await testCaseRunner.run();

    if (testCaseResult.duration) {
      this.result.duration += testCaseResult.duration;
    }

    if (this.shouldCauseFailure(testCaseResult.status)) {
      this.result.success = false;
    }
  }

  async start() {
    if (this.options.filterStacktraces) {
      this.stackTraceFilter.filter();
    }

    this.eventBroadcaster.emit('test-run-started');
    await this.runTestRunHooks('beforeTestRunHookDefinitions', 'a BeforeAll');
    await _bluebird.default.each(this.testCases, this.runTestCase.bind(this));
    await this.runTestRunHooks('afterTestRunHookDefinitions', 'an AfterAll');
    this.eventBroadcaster.emit('test-run-finished', {
      result: this.result
    });

    if (this.options.filterStacktraces) {
      this.stackTraceFilter.unfilter();
    }

    return this.result.success;
  }

  shouldCauseFailure(status) {
    return _lodash.default.includes([_status.default.AMBIGUOUS, _status.default.FAILED, _status.default.UNDEFINED], status) || status === _status.default.PENDING && this.options.strict;
  }

}

exports.default = Runtime;