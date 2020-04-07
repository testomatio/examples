"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusMapping = getStatusMapping;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statuses = {
  AMBIGUOUS: 'ambiguous',
  FAILED: 'failed',
  PASSED: 'passed',
  PENDING: 'pending',
  SKIPPED: 'skipped',
  UNDEFINED: 'undefined'
};
var _default = statuses;
exports.default = _default;

function getStatusMapping(initialValue) {
  return _lodash.default.chain(statuses).map(status => [status, initialValue]).fromPairs().value();
}