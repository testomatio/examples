"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _javascript_snippet_syntax = _interopRequireDefault(require("./javascript_snippet_syntax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('JavascriptSnippetSyntax', () => {
  (0, _mocha.describe)('build()', () => {
    (0, _mocha.describe)('callback interface', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('callback');
      });
      (0, _mocha.it)('returns the proper snippet', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            source: 'pattern',
            parameterNames: ['arg1', 'arg2']
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern', function (arg1, arg2, callback) {\n" + '  // comment\n' + "  callback(null, 'pending');\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
    (0, _mocha.describe)('generator interface', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('generator');
      });
      (0, _mocha.it)('returns the proper snippet', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            source: 'pattern',
            parameterNames: ['arg1', 'arg2']
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern', function *(arg1, arg2) {\n" + '  // comment\n' + "  return 'pending';\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
    (0, _mocha.describe)('promise interface', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('promise');
      });
      (0, _mocha.it)('returns the proper snippet', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            source: 'pattern',
            parameterNames: ['arg1', 'arg2']
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern', function (arg1, arg2) {\n" + '  // comment\n' + "  return 'pending';\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
    (0, _mocha.describe)('synchronous interface', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('synchronous');
      });
      (0, _mocha.it)('returns the proper snippet', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            source: 'pattern',
            parameterNames: ['arg1', 'arg2']
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern', function (arg1, arg2) {\n" + '  // comment\n' + "  return 'pending';\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
    (0, _mocha.describe)('pattern contains single quote', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('synchronous');
      });
      (0, _mocha.it)('returns the proper snippet', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            source: "pattern'",
            parameterNames: ['arg1', 'arg2']
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern\\'', function (arg1, arg2) {\n" + '  // comment\n' + "  return 'pending';\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
    (0, _mocha.describe)('multiple patterns', () => {
      (0, _mocha.beforeEach)(function () {
        this.syntax = new _javascript_snippet_syntax.default('synchronous');
      });
      (0, _mocha.it)('returns the snippet with the other choices commented out', function () {
        const actual = this.syntax.build({
          comment: 'comment',
          functionName: 'functionName',
          generatedExpressions: [{
            parameterNames: ['argA', 'argB'],
            source: 'pattern1'
          }, {
            parameterNames: ['argC', 'argD'],
            source: 'pattern2'
          }, {
            parameterNames: ['argE', 'argF'],
            source: 'pattern3'
          }],
          stepParameterNames: []
        });
        const expected = "functionName('pattern1', function (argA, argB) {\n" + "// functionName('pattern2', function (argC, argD) {\n" + "// functionName('pattern3', function (argE, argF) {\n" + '  // comment\n' + "  return 'pending';\n" + '});';
        (0, _chai.expect)(actual).to.eql(expected);
      });
    });
  });
});