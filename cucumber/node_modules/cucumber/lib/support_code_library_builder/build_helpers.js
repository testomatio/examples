"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTestCaseHookDefinition = buildTestCaseHookDefinition;
exports.buildTestRunHookDefinition = buildTestRunHookDefinition;
exports.buildStepDefinitionConfig = buildStepDefinitionConfig;
exports.buildStepDefinitionFromConfig = buildStepDefinitionFromConfig;
exports.buildParameterType = buildParameterType;

var _util = require("util");

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("../formatter/helpers");

var _cucumberExpressions = require("cucumber-expressions");

var _path = _interopRequireDefault(require("path"));

var _stacktraceJs = _interopRequireDefault(require("stacktrace-js"));

var _stack_trace_filter = require("../stack_trace_filter");

var _step_definition = _interopRequireDefault(require("../models/step_definition"));

var _test_case_hook_definition = _interopRequireDefault(require("../models/test_case_hook_definition"));

var _test_run_hook_definition = _interopRequireDefault(require("../models/test_run_hook_definition"));

var _validate_arguments = _interopRequireDefault(require("./validate_arguments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildTestCaseHookDefinition({
  options: options,
  code: code,
  cwd: cwd
}) {
  if (typeof options === 'string') {
    options = {
      tags: options
    };
  } else if (typeof options === 'function') {
    code = options;
    options = {};
  }

  const {
    line: line,
    uri: uri
  } = getDefinitionLineAndUri(cwd);
  (0, _validate_arguments.default)({
    args: {
      code: code,
      options: options
    },
    fnName: 'defineTestCaseHook',
    location: (0, _helpers.formatLocation)({
      line: line,
      uri: uri
    })
  });
  return new _test_case_hook_definition.default({
    code: code,
    line: line,
    options: options,
    uri: uri
  });
}

function buildTestRunHookDefinition({
  options: options,
  code: code,
  cwd: cwd
}) {
  if (typeof options === 'string') {
    options = {
      tags: options
    };
  } else if (typeof options === 'function') {
    code = options;
    options = {};
  }

  const {
    line: line,
    uri: uri
  } = getDefinitionLineAndUri(cwd);
  (0, _validate_arguments.default)({
    args: {
      code: code,
      options: options
    },
    fnName: 'defineTestRunHook',
    location: (0, _helpers.formatLocation)({
      line: line,
      uri: uri
    })
  });
  return new _test_run_hook_definition.default({
    code: code,
    line: line,
    options: options,
    uri: uri
  });
}

function buildStepDefinitionConfig({
  pattern: pattern,
  options: options,
  code: code,
  cwd: cwd
}) {
  if (typeof options === 'function') {
    code = options;
    options = {};
  }

  const {
    line: line,
    uri: uri
  } = getDefinitionLineAndUri(cwd);
  (0, _validate_arguments.default)({
    args: {
      code: code,
      pattern: pattern,
      options: options
    },
    fnName: 'defineStep',
    location: (0, _helpers.formatLocation)({
      line: line,
      uri: uri
    })
  });
  return {
    code: code,
    line: line,
    options: options,
    pattern: pattern,
    uri: uri
  };
}

function buildStepDefinitionFromConfig({
  config: config,
  parameterTypeRegistry: parameterTypeRegistry
}) {
  const {
    code: code,
    line: line,
    options: options,
    uri: uri,
    pattern: pattern
  } = config;
  const Expression = typeof pattern === 'string' ? _cucumberExpressions.CucumberExpression : _cucumberExpressions.RegularExpression;
  const expression = new Expression(pattern, parameterTypeRegistry);
  return new _step_definition.default({
    code: code,
    line: line,
    options: options,
    uri: uri,
    pattern: pattern,
    expression: expression
  });
}

function getDefinitionLineAndUri(cwd) {
  let line = 'unknown';
  let uri = 'unknown';

  const stackframes = _stacktraceJs.default.getSync();

  const stackframe = _lodash.default.find(stackframes, frame => {
    return !(0, _stack_trace_filter.isFileNameInCucumber)(frame.getFileName());
  });

  if (stackframe) {
    line = stackframe.getLineNumber();
    uri = stackframe.getFileName();

    if (uri) {
      uri = _path.default.relative(cwd, uri);
    }
  }

  return {
    line: line,
    uri: uri
  };
}

function buildParameterType({
  name: name,
  typeName: typeName,
  regexp: regexp,
  transformer: transformer,
  useForSnippets: useForSnippets,
  preferForRegexpMatch: preferForRegexpMatch
}) {
  const getTypeName = (0, _util.deprecate)(() => typeName, 'Cucumber defineParameterType: Use name instead of typeName');

  const _name = name || getTypeName();

  if (typeof useForSnippets !== 'boolean') useForSnippets = true;
  if (typeof preferForRegexpMatch !== 'boolean') preferForRegexpMatch = false;
  return new _cucumberExpressions.ParameterType(_name, regexp, null, transformer, useForSnippets, preferForRegexpMatch);
}