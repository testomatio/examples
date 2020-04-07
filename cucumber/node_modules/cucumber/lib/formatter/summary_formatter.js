"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("./helpers");

var _2 = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SummaryFormatter extends _2.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-run-finished', this.logSummary.bind(this));
  }

  logSummary(testRun) {
    const failures = [];
    const warnings = [];
    const testCaseAttempts = this.eventDataCollector.getTestCaseAttempts();

    _lodash.default.each(testCaseAttempts, testCaseAttempt => {
      if ((0, _helpers.isFailure)(testCaseAttempt.result)) {
        failures.push(testCaseAttempt);
      } else if ((0, _helpers.isWarning)(testCaseAttempt.result)) {
        warnings.push(testCaseAttempt);
      }
    });

    if (failures.length > 0) {
      this.logIssues({
        issues: failures,
        title: 'Failures'
      });
    }

    if (warnings.length > 0) {
      this.logIssues({
        issues: warnings,
        title: 'Warnings'
      });
    }

    this.log((0, _helpers.formatSummary)({
      colorFns: this.colorFns,
      testCaseAttempts: testCaseAttempts,
      testRun: testRun
    }));
  }

  logIssues({
    issues: issues,
    title: title
  }) {
    this.log(`${title}:\n\n`);
    issues.forEach((testCaseAttempt, index) => {
      this.log((0, _helpers.formatIssue)({
        colorFns: this.colorFns,
        number: index + 1,
        snippetBuilder: this.snippetBuilder,
        testCaseAttempt: testCaseAttempt
      }));
    });
  }

}

exports.default = SummaryFormatter;