"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMock = createMock;

var _lodash = _interopRequireDefault(require("lodash"));

var _sinon = _interopRequireDefault(require("sinon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMock(input) {
  if (_lodash.default.isArray(input)) {
    input = _lodash.default.zipObject(input);
  }

  return _lodash.default.mapValues(input, value => _sinon.default.stub().returns(value));
}