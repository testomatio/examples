"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFailure = isFailure;
exports.isWarning = isWarning;
exports.isIssue = isIssue;
exports.formatIssue = formatIssue;

var _lodash = _interopRequireDefault(require("lodash"));

var _indentString = _interopRequireDefault(require("indent-string"));

var _status = _interopRequireDefault(require("../../status"));

var _test_case_attempt_formatter = require("./test_case_attempt_formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFailure(result) {
  return result.status === _status.default.AMBIGUOUS || result.status === _status.default.FAILED && !result.retried;
}

function isWarning(result) {
  return _lodash.default.includes([_status.default.PENDING, _status.default.UNDEFINED], result.status) || result.status === _status.default.FAILED && result.retried;
}

function isIssue(result) {
  return isFailure(result) || isWarning(result);
}

function formatIssue({
  colorFns: colorFns,
  number: number,
  snippetBuilder: snippetBuilder,
  testCaseAttempt: testCaseAttempt
}) {
  const prefix = `${number}) `;
  const formattedTestCaseAttempt = (0, _test_case_attempt_formatter.formatTestCaseAttempt)({
    colorFns: colorFns,
    snippetBuilder: snippetBuilder,
    testCaseAttempt: testCaseAttempt
  });
  const lines = formattedTestCaseAttempt.split('\n');
  const updatedLines = lines.map((line, index) => {
    if (index === 0) {
      return `${prefix}${line}`;
    }

    return (0, _indentString.default)(line, prefix.length);
  });
  return updatedLines.join('\n');
}