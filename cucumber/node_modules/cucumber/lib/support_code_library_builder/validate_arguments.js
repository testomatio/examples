"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateArguments;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const optionsValidation = {
  expectedType: 'object or function',
  predicate: function ({
    options: options
  }) {
    return _lodash.default.isPlainObject(options);
  }
};
const optionsTimeoutValidation = {
  identifier: '"options.timeout"',
  expectedType: 'integer',
  predicate: function ({
    options: options
  }) {
    return !options.timeout || _lodash.default.isInteger(options.timeout);
  }
};
const fnValidation = {
  expectedType: 'function',
  predicate: function ({
    code: code
  }) {
    return _lodash.default.isFunction(code);
  }
};
const validations = {
  defineTestRunHook: [{
    identifier: 'first argument',
    ...optionsValidation
  }, optionsTimeoutValidation, {
    identifier: 'second argument',
    ...fnValidation
  }],
  defineTestCaseHook: [{
    identifier: 'first argument',
    ...optionsValidation
  }, {
    identifier: '"options.tags"',
    expectedType: 'string',
    predicate: function ({
      options: options
    }) {
      return !options.tags || _lodash.default.isString(options.tags);
    }
  }, optionsTimeoutValidation, {
    identifier: 'second argument',
    ...fnValidation
  }],
  defineStep: [{
    identifier: 'first argument',
    expectedType: 'string or regular expression',
    predicate: function ({
      pattern: pattern
    }) {
      return _lodash.default.isRegExp(pattern) || _lodash.default.isString(pattern);
    }
  }, {
    identifier: 'second argument',
    ...optionsValidation
  }, optionsTimeoutValidation, {
    identifier: 'third argument',
    ...fnValidation
  }]
};

function validateArguments({
  args: args,
  fnName: fnName,
  location: location
}) {
  validations[fnName].forEach(({
    identifier: identifier,
    expectedType: expectedType,
    predicate: predicate
  }) => {
    if (!predicate(args)) {
      throw new Error(`${location}: Invalid ${identifier}: should be a ${expectedType}`);
    }
  });
}