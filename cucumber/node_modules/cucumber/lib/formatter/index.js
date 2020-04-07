"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Formatter {
  constructor(options) {
    _lodash.default.assign(this, _lodash.default.pick(options, ['colorFns', 'cwd', 'eventDataCollector', 'log', 'snippetBuilder', 'stream', 'supportCodeLibrary']));
  }

}

exports.default = Formatter;