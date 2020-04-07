"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("./helpers");

var _ = _interopRequireDefault(require("./"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsageJsonFormatter extends _.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-run-finished', this.logUsage.bind(this));
  }

  logUsage() {
    const usage = (0, _helpers.getUsage)({
      stepDefinitions: this.supportCodeLibrary.stepDefinitions,
      eventDataCollector: this.eventDataCollector
    });
    this.log(JSON.stringify(usage, null, 2));
  }

}

exports.default = UsageJsonFormatter;