"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColorFns;

var _lodash = _interopRequireDefault(require("lodash"));

var _safe = _interopRequireDefault(require("colors/safe"));

var _status = _interopRequireDefault(require("../status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_safe.default.enabled = true;

function getColorFns(enabled) {
  if (enabled) {
    return {
      [_status.default.AMBIGUOUS]: _safe.default.red.bind(_safe.default),
      [_status.default.FAILED]: _safe.default.red.bind(_safe.default),
      [_status.default.PASSED]: _safe.default.green.bind(_safe.default),
      [_status.default.PENDING]: _safe.default.yellow.bind(_safe.default),
      [_status.default.SKIPPED]: _safe.default.cyan.bind(_safe.default),
      [_status.default.UNDEFINED]: _safe.default.yellow.bind(_safe.default),
      location: _safe.default.gray.bind(_safe.default),
      tag: _safe.default.cyan.bind(_safe.default),
      // For assertion-error-formatter
      diffAdded: _safe.default.green.bind(_safe.default),
      diffRemoved: _safe.default.red.bind(_safe.default),
      errorMessage: _safe.default.red.bind(_safe.default),
      errorStack: _safe.default.gray.bind(_safe.default)
    };
  } else {
    return {
      [_status.default.AMBIGUOUS]: _lodash.default.identity,
      [_status.default.FAILED]: _lodash.default.identity,
      [_status.default.PASSED]: _lodash.default.identity,
      [_status.default.PENDING]: _lodash.default.identity,
      [_status.default.SKIPPED]: _lodash.default.identity,
      [_status.default.UNDEFINED]: _lodash.default.identity,
      location: _lodash.default.identity,
      tag: _lodash.default.identity,
      // For assertion-error-formatter
      diffAdded: _lodash.default.identity,
      diffRemoved: _lodash.default.identity,
      errorMessage: _lodash.default.identity,
      errorStack: _lodash.default.identity
    };
  }
}