"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cucumberExpressions = require("cucumber-expressions");

var _helpers = require("../helpers");

var _step_arguments = require("../../step_arguments");

class StepDefinitionSnippetBuilder {
  constructor({
    snippetSyntax: snippetSyntax,
    parameterTypeRegistry: parameterTypeRegistry
  }) {
    this.snippetSyntax = snippetSyntax;
    this.cucumberExpressionGenerator = new _cucumberExpressions.CucumberExpressionGenerator(parameterTypeRegistry);
  }

  build({
    keywordType: keywordType,
    pickleStep: pickleStep
  }) {
    const comment = 'Write code here that turns the phrase above into concrete actions';
    const functionName = this.getFunctionName(keywordType);
    const generatedExpressions = this.cucumberExpressionGenerator.generateExpressions(pickleStep.text, true);
    const stepParameterNames = this.getStepParameterNames(pickleStep);
    return this.snippetSyntax.build({
      comment: comment,
      functionName: functionName,
      generatedExpressions: generatedExpressions,
      stepParameterNames: stepParameterNames
    });
  }

  getFunctionName(keywordType) {
    switch (keywordType) {
      case _helpers.KeywordType.EVENT:
        return 'When';

      case _helpers.KeywordType.OUTCOME:
        return 'Then';

      case _helpers.KeywordType.PRECONDITION:
        return 'Given';
    }
  }

  getStepParameterNames(step) {
    const iterator = (0, _step_arguments.buildStepArgumentIterator)({
      dataTable: () => 'dataTable',
      docString: () => 'docString'
    });
    return step.arguments.map(iterator);
  }

}

exports.default = StepDefinitionSnippetBuilder;