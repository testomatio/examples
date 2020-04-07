"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cucumberExpressions = require("cucumber-expressions");

function build() {
  return new _cucumberExpressions.ParameterTypeRegistry();
}

var _default = {
  build: build
};
exports.default = _default;