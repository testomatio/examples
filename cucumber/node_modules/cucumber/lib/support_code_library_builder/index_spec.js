"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _cucumberExpressions = require("cucumber-expressions");

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('supportCodeLibraryBuilder', () => {
  (0, _mocha.describe)('no support code fns', () => {
    (0, _mocha.beforeEach)(function () {
      this.attachFn = _sinon.default.stub();

      _.default.reset('path/to/project');

      this.options = _.default.finalize();
    });
    (0, _mocha.it)('returns the default options', function () {
      (0, _chai.expect)(this.options.afterTestRunHookDefinitions).to.eql([]);
      (0, _chai.expect)(this.options.afterTestCaseHookDefinitions).to.eql([]);
      (0, _chai.expect)(this.options.beforeTestRunHookDefinitions).to.eql([]);
      (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions).to.eql([]);
      (0, _chai.expect)(this.options.defaultTimeout).to.eql(5000);
      (0, _chai.expect)(this.options.stepDefinitions).to.eql([]);
      (0, _chai.expect)(this.options.parameterTypeRegistry).to.be.instanceOf(_cucumberExpressions.ParameterTypeRegistry);
      const worldInstance = new this.options.World({
        attach: this.attachFn,
        parameters: {
          some: 'data'
        }
      });
      (0, _chai.expect)(worldInstance.attach).to.eql(this.attachFn);
      (0, _chai.expect)(worldInstance.parameters).to.eql({
        some: 'data'
      });
    });
  });
  (0, _mocha.describe)('step', () => {
    (0, _mocha.describe)('without definition function wrapper', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.defineStep('I do a thing', this.hook);

        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a step definition and makes original code available', function () {
        (0, _chai.expect)(this.options.stepDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.stepDefinitions[0].code).to.eql(this.hook);
        (0, _chai.expect)(this.options.stepDefinitions[0].unwrappedCode).to.eql(undefined);
      });
    });
    (0, _mocha.describe)('with definition function wrapper', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.defineStep('I do a thing', this.hook);

        _.default.methods.setDefinitionFunctionWrapper(function (fn) {
          return fn.apply(this, arguments);
        });

        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a step definition and makes original code available', function () {
        (0, _chai.expect)(this.options.stepDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.stepDefinitions[0].code).not.to.eql(this.hook);
        (0, _chai.expect)(this.options.stepDefinitions[0].unwrappedCode).to.eql(this.hook);
      });
    });
  });
  (0, _mocha.describe)('After', () => {
    (0, _mocha.describe)('function only', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.After(this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('tag and function', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.After('@tagA', this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].options.tags).to.eql('@tagA');
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('options and function', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.After({
          tags: '@tagA'
        }, this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].options.tags).to.eql('@tagA');
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('multiple', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook1 = function hook1() {};

        this.hook2 = function hook2() {};

        _.default.reset('path/to/project');

        _.default.methods.After(this.hook1); // eslint-disable-line babel/new-cap


        _.default.methods.After(this.hook2); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds the scenario hook definitions in the reverse order of definition', function () {
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions).to.have.lengthOf(2);
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[0].code).to.eql(this.hook2);
        (0, _chai.expect)(this.options.afterTestCaseHookDefinitions[1].code).to.eql(this.hook1);
      });
    });
  });
  (0, _mocha.describe)('this.Before', () => {
    (0, _mocha.describe)('function only', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.Before(this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('tag and function', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.Before('@tagA', this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].options.tags).to.eql('@tagA');
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('options and function', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook = function () {};

        _.default.reset('path/to/project');

        _.default.methods.Before({
          tags: '@tagA'
        }, this.hook); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds a scenario hook definition', function () {
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions).to.have.lengthOf(1);
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].options.tags).to.eql('@tagA');
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].code).to.eql(this.hook);
      });
    });
    (0, _mocha.describe)('multiple', () => {
      (0, _mocha.beforeEach)(function () {
        this.hook1 = function hook1() {};

        this.hook2 = function hook2() {};

        _.default.reset('path/to/project');

        _.default.methods.Before(this.hook1); // eslint-disable-line babel/new-cap


        _.default.methods.Before(this.hook2); // eslint-disable-line babel/new-cap


        this.options = _.default.finalize();
      });
      (0, _mocha.it)('adds the scenario hook definitions in the order of definition', function () {
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions).to.have.lengthOf(2);
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[0].code).to.eql(this.hook1);
        (0, _chai.expect)(this.options.beforeTestCaseHookDefinitions[1].code).to.eql(this.hook2);
      });
    });
  });
});