"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _test_helpers = require("../test_helpers");

var _helpers = require("../helpers");

var _ = _interopRequireDefault(require("./"));

var _parameter_type_registry_builder = _interopRequireDefault(require("../../support_code_library_builder/parameter_type_registry_builder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('StepDefinitionSnippetBuilder', () => {
  (0, _mocha.beforeEach)(function () {
    this.snippetSyntax = (0, _test_helpers.createMock)(['build']);
    this.transformsLookup = _parameter_type_registry_builder.default.build();
    this.snippetBuilder = new _.default({
      snippetSyntax: this.snippetSyntax,
      parameterTypeRegistry: this.transformsLookup
    });
  });
  (0, _mocha.describe)('build()', () => {
    (0, _mocha.beforeEach)(function () {
      this.input = {
        keywordType: _helpers.KeywordType.PRECONDITION,
        pickleStep: {
          arguments: [],
          text: ''
        }
      };
    });
    (0, _mocha.describe)('step is an precondition step', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.keywordType = _helpers.KeywordType.PRECONDITION;
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('uses Given as the function name', function () {
        (0, _chai.expect)(this.arg.functionName).to.eql('Given');
      });
    });
    (0, _mocha.describe)('step is an event step', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.keywordType = _helpers.KeywordType.EVENT;
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('uses When as the function name', function () {
        (0, _chai.expect)(this.arg.functionName).to.eql('When');
      });
    });
    (0, _mocha.describe)('step is an outcome step', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.keywordType = _helpers.KeywordType.OUTCOME;
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('uses Then as the function name', function () {
        (0, _chai.expect)(this.arg.functionName).to.eql('Then');
      });
    });
    (0, _mocha.describe)('step has simple name', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.text = 'abc';
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('adds the proper generated expression', function () {
        const generatedExpression = this.arg.generatedExpressions[0];
        (0, _chai.expect)(generatedExpression.source).to.eql('abc');
        (0, _chai.expect)(generatedExpression.parameterNames).to.eql([]);
      });
    });
    (0, _mocha.describe)('step name has a quoted string', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.text = 'abc "def" ghi';
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('adds the proper generated expression', function () {
        const generatedExpression = this.arg.generatedExpressions[0];
        (0, _chai.expect)(generatedExpression.source).to.eql('abc {string} ghi');
        (0, _chai.expect)(generatedExpression.parameterNames).to.eql(['string']);
      });
    });
    (0, _mocha.describe)('step name has multiple quoted strings', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.text = 'abc "def" ghi "jkl" mno';
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('adds the proper generated expression', function () {
        const generatedExpression = this.arg.generatedExpressions[0];
        (0, _chai.expect)(generatedExpression.source).to.eql('abc {string} ghi {string} mno');
        (0, _chai.expect)(generatedExpression.parameterNames).to.eql(['string', 'string2']);
      });
    });
    (0, _mocha.describe)('step name has a standalone number', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.text = 'abc 123 def';
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('adds the proper generated expression', function () {
        const generatedExpression = this.arg.generatedExpressions[0];
        (0, _chai.expect)(generatedExpression.source).to.eql('abc {int} def');
        (0, _chai.expect)(generatedExpression.parameterNames).to.eql(['int']);
      });
    });
    (0, _mocha.describe)('step has no arguments', () => {
      (0, _mocha.beforeEach)(function () {
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('passes no step parameter names', function () {
        (0, _chai.expect)(this.arg.stepParameterNames).to.eql([]);
      });
    });
    (0, _mocha.describe)('step has a data table argument', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.arguments = [{
          rows: []
        }];
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('passes dataTable as a step parameter name', function () {
        (0, _chai.expect)(this.arg.stepParameterNames).to.eql(['dataTable']);
      });
    });
    (0, _mocha.describe)('step has a doc string argument', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.pickleStep.arguments = [{
          content: ''
        }];
        this.result = this.snippetBuilder.build(this.input);
        this.arg = this.snippetSyntax.build.firstCall.args[0];
      });
      (0, _mocha.it)('passes docString as a step parameter name', function () {
        (0, _chai.expect)(this.arg.stepParameterNames).to.eql(['docString']);
      });
    });
  });
});