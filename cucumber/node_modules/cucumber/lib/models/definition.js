"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Definition {
  constructor({
    code: code,
    line: line,
    options: options,
    uri: uri
  }) {
    this.code = code;
    this.line = line;
    this.options = options;
    this.uri = uri;
  }

  buildInvalidCodeLengthMessage(syncOrPromiseLength, callbackLength) {
    return `function has ${this.code.length} arguments` + `, should have ${syncOrPromiseLength} (if synchronous or returning a promise)` + ` or ${callbackLength} (if accepting a callback)`;
  }

  getInvalidCodeLengthMessage(parameters) {
    return this.buildInvalidCodeLengthMessage(parameters.length, parameters.length + 1);
  }

}

exports.default = Definition;