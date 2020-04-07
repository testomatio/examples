"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const CALLBACK_NAME = 'callback';

class JavaScriptSnippetSyntax {
  constructor(snippetInterface) {
    this.snippetInterface = snippetInterface;
  }

  build({
    comment: comment,
    generatedExpressions: generatedExpressions,
    functionName: functionName,
    stepParameterNames: stepParameterNames
  }) {
    let functionKeyword = 'function ';

    if (this.snippetInterface === 'async-await') {
      functionKeyword = 'async ' + functionKeyword;
    } else if (this.snippetInterface === 'generator') {
      functionKeyword += '*';
    }

    let implementation;

    if (this.snippetInterface === 'callback') {
      implementation = `${CALLBACK_NAME}(null, 'pending');`;
    } else {
      implementation = "return 'pending';";
    }

    const definitionChoices = generatedExpressions.map((generatedExpression, index) => {
      const prefix = index === 0 ? '' : '// ';
      const allParameterNames = generatedExpression.parameterNames.concat(stepParameterNames);

      if (this.snippetInterface === 'callback') {
        allParameterNames.push(CALLBACK_NAME);
      }

      return `${prefix + functionName}('${generatedExpression.source.replace(/'/g, "\\'")}', ${functionKeyword}(${allParameterNames.join(', ')}) {\n`;
    });
    return `${definitionChoices.join('')}  // ${comment}\n` + `  ${implementation}\n` + `});`;
  }

}

exports.default = JavaScriptSnippetSyntax;