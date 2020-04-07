"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pickle_filter = _interopRequireDefault(require("../pickle_filter"));

var _definition = _interopRequireDefault(require("./definition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TestCaseHookDefinition extends _definition.default {
  constructor(...data) {
    super(...data);
    this.pickleFilter = new _pickle_filter.default({
      tagExpression: this.options.tags
    });
  }

  appliesToTestCase({
    pickle: pickle,
    uri: uri
  }) {
    return this.pickleFilter.matches({
      pickle: pickle,
      uri: uri
    });
  }

  getInvalidCodeLengthMessage() {
    return this.buildInvalidCodeLengthMessage('0 or 1', '2');
  }

  getInvocationParameters({
    hookParameter: hookParameter
  }) {
    return [hookParameter];
  }

  getValidCodeLengths() {
    return [0, 1, 2];
  }

}

exports.default = TestCaseHookDefinition;