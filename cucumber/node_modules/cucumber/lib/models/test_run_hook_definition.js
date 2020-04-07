"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _definition = _interopRequireDefault(require("./definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestRunHookDefinition extends _definition.default {
  getInvalidCodeLengthMessage() {
    return this.buildInvalidCodeLengthMessage('0', '1');
  }

  getInvocationParameters() {
    return [];
  }

  getValidCodeLengths() {
    return [0, 1];
  }

}

exports.default = TestRunHookDefinition;