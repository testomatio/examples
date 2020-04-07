"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAmbiguousStepException = getAmbiguousStepException;
exports.retriesForTestCase = retriesForTestCase;

var _location_helpers = require("../formatter/helpers/location_helpers");

var _cliTable = _interopRequireDefault(require("cli-table3"));

var _indentString = _interopRequireDefault(require("indent-string"));

var _pickle_filter = _interopRequireDefault(require("../pickle_filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAmbiguousStepException(stepDefinitions) {
  const table = new _cliTable.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: ' - ',
      right: '',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 0,
      'padding-right': 0
    }
  });
  table.push(...stepDefinitions.map(stepDefinition => {
    const pattern = stepDefinition.pattern.toString();
    return [pattern, (0, _location_helpers.formatLocation)(stepDefinition)];
  }));
  return `${'Multiple step definitions match:' + '\n'}${(0, _indentString.default)(table.toString(), 2)}`;
}

function retriesForTestCase(testCase, options) {
  const retries = options.retry;

  if (!retries) {
    return 0;
  }

  const retryTagFilter = options.retryTagFilter;

  if (!retryTagFilter) {
    return retries;
  }

  const pickleFilter = new _pickle_filter.default({
    tagExpression: retryTagFilter
  });

  if (pickleFilter.matches(testCase)) {
    return retries;
  }

  return 0;
}