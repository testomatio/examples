"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SupportCodeLibraryBuilder = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _util = _interopRequireDefault(require("util"));

var _parameter_type_registry_builder = _interopRequireDefault(require("./parameter_type_registry_builder"));

var _build_helpers = require("./build_helpers");

var _finalize_helpers = require("./finalize_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SupportCodeLibraryBuilder {
  constructor() {
    this.methods = {
      defineParameterType: this.defineParameterType.bind(this),
      After: this.defineTestCaseHook('afterTestCaseHookDefinitions'),
      AfterAll: this.defineTestRunHook('afterTestRunHookDefinitions'),
      Before: this.defineTestCaseHook('beforeTestCaseHookDefinitions'),
      BeforeAll: this.defineTestRunHook('beforeTestRunHookDefinitions'),
      defineStep: this.defineStep.bind(this),
      defineSupportCode: _util.default.deprecate(fn => {
        fn(this.methods);
      }, 'cucumber: defineSupportCode is deprecated. Please require/import the individual methods instead.'),
      setDefaultTimeout: milliseconds => {
        this.options.defaultTimeout = milliseconds;
      },
      setDefinitionFunctionWrapper: fn => {
        this.options.definitionFunctionWrapper = fn;
      },
      setWorldConstructor: fn => {
        this.options.World = fn;
      }
    };
    this.methods.Given = this.methods.When = this.methods.Then = this.methods.defineStep;
  }

  defineParameterType(options) {
    const parameterType = (0, _build_helpers.buildParameterType)(options);
    this.options.parameterTypeRegistry.defineParameterType(parameterType);
  }

  defineStep(pattern, options, code) {
    const stepDefinitionConfig = (0, _build_helpers.buildStepDefinitionConfig)({
      pattern: pattern,
      options: options,
      code: code,
      cwd: this.cwd
    });
    this.options.stepDefinitionConfigs.push(stepDefinitionConfig);
  }

  defineTestCaseHook(collectionName) {
    return (options, code) => {
      const hookDefinition = (0, _build_helpers.buildTestCaseHookDefinition)({
        options: options,
        code: code,
        cwd: this.cwd
      });
      this.options[collectionName].push(hookDefinition);
    };
  }

  defineTestRunHook(collectionName) {
    return (options, code) => {
      const hookDefinition = (0, _build_helpers.buildTestRunHookDefinition)({
        options: options,
        code: code,
        cwd: this.cwd
      });
      this.options[collectionName].push(hookDefinition);
    };
  }

  finalize() {
    this.options.stepDefinitions = this.options.stepDefinitionConfigs.map(config => (0, _build_helpers.buildStepDefinitionFromConfig)({
      config: config,
      parameterTypeRegistry: this.options.parameterTypeRegistry
    }));
    delete this.options.stepDefinitionConfigs;
    (0, _finalize_helpers.wrapDefinitions)({
      cwd: this.cwd,
      definitionFunctionWrapper: this.options.definitionFunctionWrapper,
      definitions: _lodash.default.chain(['afterTestCaseHook', 'afterTestRunHook', 'beforeTestCaseHook', 'beforeTestRunHook', 'step']).map(key => this.options[`${key}Definitions`]).flatten().value()
    });
    this.options.afterTestCaseHookDefinitions.reverse();
    this.options.afterTestRunHookDefinitions.reverse();
    return this.options;
  }

  reset(cwd) {
    this.cwd = cwd;
    this.options = _lodash.default.cloneDeep({
      afterTestCaseHookDefinitions: [],
      afterTestRunHookDefinitions: [],
      beforeTestCaseHookDefinitions: [],
      beforeTestRunHookDefinitions: [],
      defaultTimeout: 5000,
      definitionFunctionWrapper: null,
      stepDefinitionConfigs: [],
      parameterTypeRegistry: _parameter_type_registry_builder.default.build(),
      World: function ({
        attach: attach,
        parameters: parameters
      }) {
        this.attach = attach;
        this.parameters = parameters;
      }
    });
  }

}

exports.SupportCodeLibraryBuilder = SupportCodeLibraryBuilder;

var _default = new SupportCodeLibraryBuilder();

exports.default = _default;