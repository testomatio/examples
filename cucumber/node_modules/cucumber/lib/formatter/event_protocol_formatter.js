"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _escapeStringRegexp = _interopRequireDefault(require("escape-string-regexp"));

var _ = _interopRequireDefault(require("./"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EVENT_NAMES = ['source', 'attachment', 'gherkin-document', 'pickle', 'pickle-accepted', 'pickle-rejected', 'test-run-started', 'test-case-prepared', 'test-case-started', 'test-step-started', 'test-step-attachment', 'test-step-finished', 'test-case-finished', 'test-run-finished'];

class EventProtocolFormatter extends _.default {
  constructor(options) {
    super(options);
    EVENT_NAMES.forEach(eventName => {
      options.eventBroadcaster.on(eventName, data => this.logEvent(eventName, data));
    });
    const pathSepRegexp = new RegExp((0, _escapeStringRegexp.default)(_path.default.sep), 'g');

    const pathToRemove = this.cwd.replace(pathSepRegexp, _path.default.posix.sep) + _path.default.posix.sep;

    this.pathRegexp = new RegExp((0, _escapeStringRegexp.default)(pathToRemove), 'g');
  }

  logEvent(eventName, data) {
    const text = JSON.stringify({
      type: eventName,
      ...data
    }, this.formatJsonData.bind(this));
    this.log(`${text}\n`);
  }

  formatJsonData(key, value) {
    if (value instanceof Error) {
      return value.stack.replace(this.pathRegexp, '');
    }

    return value;
  }

}

exports.default = EventProtocolFormatter;