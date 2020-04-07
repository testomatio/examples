"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data_table = _interopRequireDefault(require("./data_table"));

var _step_arguments = require("../step_arguments");

var _definition = _interopRequireDefault(require("./definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StepDefinition extends _definition.default {
  constructor({
    code: code,
    line: line,
    options: options,
    uri: uri,
    pattern: pattern,
    expression: expression
  }) {
    super({
      code: code,
      line: line,
      options: options,
      uri: uri
    });
    this.pattern = pattern;
    this.expression = expression;
  }

  getInvocationParameters({
    step: step,
    world: world
  }) {
    const stepNameParameters = this.expression.match(step.text).map(arg => arg.getValue(world));
    const iterator = (0, _step_arguments.buildStepArgumentIterator)({
      dataTable: arg => new _data_table.default(arg),
      docString: arg => arg.content
    });
    const stepArgumentParameters = step.arguments.map(iterator);
    return stepNameParameters.concat(stepArgumentParameters);
  }

  getValidCodeLengths(parameters) {
    return [parameters.length, parameters.length + 1];
  }

  matchesStepName(stepName) {
    return Boolean(this.expression.match(stepName));
  }

}

exports.default = StepDefinition;