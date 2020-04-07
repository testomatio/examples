"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _2 = _interopRequireDefault(require("./"));

var _status = _interopRequireDefault(require("../status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_SEPARATOR = '\n';

class RerunFormatter extends _2.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-case-finished', this.storeFailedTestCases.bind(this)).on('test-run-finished', this.logFailedTestCases.bind(this));
    this.mapping = {};
    this.separator = _lodash.default.get(options, 'rerun.separator', DEFAULT_SEPARATOR);
  }

  storeFailedTestCases({
    sourceLocation: {
      line: line,
      uri: uri
    },
    result: {
      status: status
    }
  }) {
    if (status !== _status.default.PASSED) {
      if (!this.mapping[uri]) {
        this.mapping[uri] = [];
      }

      this.mapping[uri].push(line);
    }
  }

  logFailedTestCases() {
    const text = _lodash.default.chain(this.mapping).map((lines, uri) => `${uri}:${lines.join(':')}`).join(this.separator).value();

    this.log(text);
  }

}

exports.default = RerunFormatter;