"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _status = _interopRequireDefault(require("../status"));

var _summary_formatter = _interopRequireDefault(require("./summary_formatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const STATUS_CHARACTER_MAPPING = {
  [_status.default.AMBIGUOUS]: 'A',
  [_status.default.FAILED]: 'F',
  [_status.default.PASSED]: '.',
  [_status.default.PENDING]: 'P',
  [_status.default.SKIPPED]: '-',
  [_status.default.UNDEFINED]: 'U'
};

class ProgressFormatter extends _summary_formatter.default {
  constructor(options) {
    options.eventBroadcaster.on('test-run-finished', () => {
      this.log('\n\n');
    });
    super(options);
    options.eventBroadcaster.on('test-step-finished', this.logProgress.bind(this));
  }

  logProgress({
    result: result
  }) {
    const {
      status: status
    } = result;
    const character = this.colorFns[status](STATUS_CHARACTER_MAPPING[status]);
    this.log(character);
  }

}

exports.default = ProgressFormatter;