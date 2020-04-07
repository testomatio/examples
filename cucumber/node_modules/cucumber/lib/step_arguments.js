"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStepArgumentIterator = buildStepArgumentIterator;

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildStepArgumentIterator(mapping) {
  return function (arg) {
    if (Object.prototype.hasOwnProperty.call(arg, 'rows')) {
      return mapping.dataTable(arg);
    } else if (Object.prototype.hasOwnProperty.call(arg, 'content')) {
      return mapping.docString(arg);
    }

    throw new Error(`Unknown argument type:${_util.default.inspect(arg)}`);
  };
}