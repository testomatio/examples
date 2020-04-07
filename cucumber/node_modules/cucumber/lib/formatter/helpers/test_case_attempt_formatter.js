"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTestCaseAttempt = formatTestCaseAttempt;

var _indentString = _interopRequireDefault(require("indent-string"));

var _status = _interopRequireDefault(require("../../status"));

var _figures = _interopRequireDefault(require("figures"));

var _error_helpers = require("./error_helpers");

var _location_helpers = require("./location_helpers");

var _test_case_attempt_parser = require("./test_case_attempt_parser");

var _step_argument_formatter = require("./step_argument_formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CHARACTERS = {
  [_status.default.AMBIGUOUS]: _figures.default.cross,
  [_status.default.FAILED]: _figures.default.cross,
  [_status.default.PASSED]: _figures.default.tick,
  [_status.default.PENDING]: '?',
  [_status.default.SKIPPED]: '-',
  [_status.default.UNDEFINED]: '?'
};

function getStepMessage({
  colorFns: colorFns,
  testStep: testStep
}) {
  switch (testStep.result.status) {
    case _status.default.AMBIGUOUS:
      return colorFns.ambiguous(testStep.result.exception);

    case _status.default.FAILED:
      return (0, _error_helpers.formatError)(testStep.result.exception, colorFns);

    case _status.default.UNDEFINED:
      return `${'Undefined. Implement with the following snippet:' + '\n\n'}${(0, _indentString.default)(testStep.snippet, 2)}\n`;

    case _status.default.PENDING:
      return colorFns.pending('Pending');
  }

  return '';
}

function formatStep({
  colorFns: colorFns,
  testStep: testStep
}) {
  const {
    result: {
      status: status
    },
    actionLocation: actionLocation,
    attachments: attachments
  } = testStep;
  const colorFn = colorFns[status];
  const identifier = testStep.keyword + (testStep.text || '');
  let text = colorFn(`${CHARACTERS[status]} ${identifier}`);

  if (actionLocation) {
    text += ` # ${colorFns.location((0, _location_helpers.formatLocation)(actionLocation))}`;
  }

  text += '\n';

  if (testStep.arguments) {
    const argumentsText = (0, _step_argument_formatter.formatStepArguments)(testStep.arguments);

    if (argumentsText) {
      text += (0, _indentString.default)(`${colorFn(argumentsText)}\n`, 4);
    }
  }

  if (attachments) {
    attachments.forEach(({
      media: media,
      data: data
    }) => {
      const message = media.type === 'text/plain' ? `: ${data}` : '';
      text += (0, _indentString.default)(`Attachment (${media.type})${message}\n`, 4);
    });
  }

  const message = getStepMessage({
    colorFns: colorFns,
    testStep: testStep
  });

  if (message) {
    text += `${(0, _indentString.default)(message, 4)}\n`;
  }

  return text;
}

function formatTestCaseAttempt({
  colorFns: colorFns,
  snippetBuilder: snippetBuilder,
  testCaseAttempt: testCaseAttempt
}) {
  const parsed = (0, _test_case_attempt_parser.parseTestCaseAttempt)({
    snippetBuilder: snippetBuilder,
    testCaseAttempt: testCaseAttempt
  });
  let text = `Scenario: ${parsed.testCase.name}`;
  text += getAttemptText(parsed.testCase.attemptNumber, parsed.testCase.result.retried);
  text += ` # ${colorFns.location((0, _location_helpers.formatLocation)(parsed.testCase.sourceLocation))}\n`;
  parsed.testSteps.forEach(testStep => {
    text += formatStep({
      colorFns: colorFns,
      testStep: testStep
    });
  });
  return `${text}\n`;
}

function getAttemptText(attemptNumber, retried) {
  if (retried) {
    return ` (attempt ${attemptNumber}, retried)`;
  }

  if (attemptNumber > 1) {
    return ` (attempt ${attemptNumber})`;
  }

  return '';
}