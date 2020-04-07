"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireDefault(require("./"));

var _status = _interopRequireDefault(require("../status"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SnippetsFormatter extends _.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-run-finished', this.logSnippets.bind(this));
  }

  logSnippets() {
    const snippets = [];
    this.eventDataCollector.getTestCaseAttempts().map(testCaseAttempt => {
      const parsed = (0, _helpers.parseTestCaseAttempt)({
        snippetBuilder: this.snippetBuilder,
        testCaseAttempt: testCaseAttempt
      });
      parsed.testSteps.forEach(testStep => {
        if (testStep.result.status === _status.default.UNDEFINED) {
          snippets.push(testStep.snippet);
        }
      });
    });
    this.log(snippets.join('\n\n'));
  }

}

exports.default = SnippetsFormatter;