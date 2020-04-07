"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MILLISECONDS_IN_NANOSECOND = void 0;
const MILLISECONDS_IN_NANOSECOND = 1000 * 1000;
exports.MILLISECONDS_IN_NANOSECOND = MILLISECONDS_IN_NANOSECOND;
let previousTimestamp;
const methods = {
  beginTiming: function () {
    previousTimestamp = getTimestamp();
  },
  clearInterval: clearInterval.bind(global),
  clearTimeout: clearTimeout.bind(global),
  Date: Date,
  endTiming: function () {
    return getTimestamp() - previousTimestamp;
  },
  setInterval: setInterval.bind(global),
  setTimeout: setTimeout.bind(global)
};

if (typeof setImmediate !== 'undefined') {
  methods.setImmediate = setImmediate.bind(global);
  methods.clearImmediate = clearImmediate.bind(global);
}

function getTimestamp() {
  return new methods.Date().getTime();
}

var _default = methods;
exports.default = _default;