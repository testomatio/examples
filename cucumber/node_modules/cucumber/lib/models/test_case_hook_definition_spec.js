"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _test_case_hook_definition = _interopRequireDefault(require("./test_case_hook_definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('TestCaseHookDefinition', () => {
  (0, _mocha.describe)('appliesToTestCase', () => {
    (0, _mocha.beforeEach)(function () {
      this.input = {
        pickle: {
          tags: []
        },
        uri: ''
      };
    });
    (0, _mocha.describe)('no tags', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseHookDefinition = new _test_case_hook_definition.default({
          options: {}
        });
      });
      (0, _mocha.it)('returns true', function () {
        (0, _chai.expect)(this.testCaseHookDefinition.appliesToTestCase(this.input)).to.eql(true);
      });
    });
    (0, _mocha.describe)('tags match', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickle.tags = [{
          name: '@tagA'
        }];
        this.testCaseHookDefinition = new _test_case_hook_definition.default({
          options: {
            tags: '@tagA'
          }
        });
      });
      (0, _mocha.it)('returns true', function () {
        (0, _chai.expect)(this.testCaseHookDefinition.appliesToTestCase(this.input)).to.eql(true);
      });
    });
    (0, _mocha.describe)('tags do not match', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCaseHookDefinition = new _test_case_hook_definition.default({
          options: {
            tags: '@tagA'
          }
        });
      });
      (0, _mocha.it)('returns false', function () {
        (0, _chai.expect)(this.testCaseHookDefinition.appliesToTestCase(this.input)).to.eql(false);
      });
    });
  });
});