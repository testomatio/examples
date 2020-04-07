"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helpers = require("./helpers");

var _2 = _interopRequireDefault(require("./"));

var _cliTable = _interopRequireDefault(require("cli-table3"));

var _time = require("../time");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsageFormatter extends _2.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-run-finished', this.logUsage.bind(this));
  }

  logUsage() {
    const usage = (0, _helpers.getUsage)({
      stepDefinitions: this.supportCodeLibrary.stepDefinitions,
      eventDataCollector: this.eventDataCollector
    });

    if (usage.length === 0) {
      this.log('No step definitions');
      return;
    }

    const table = new _cliTable.default({
      head: ['Pattern / Text', 'Duration', 'Location'],
      style: {
        border: [],
        head: []
      }
    });
    usage.forEach(({
      line: line,
      matches: matches,
      meanDuration: meanDuration,
      pattern: pattern,
      patternType: patternType,
      uri: uri
    }) => {
      let formattedPattern = pattern;

      if (patternType === 'RegularExpression') {
        formattedPattern = '/' + formattedPattern + '/';
      }

      const col1 = [formattedPattern];
      const col2 = [];

      if (matches.length > 0) {
        if (isFinite(meanDuration)) {
          col2.push(`${(meanDuration / _time.MILLISECONDS_IN_NANOSECOND).toFixed(2)}ms`);
        } else {
          col2.push('-');
        }
      } else {
        col2.push('UNUSED');
      }

      const col3 = [(0, _helpers.formatLocation)({
        line: line,
        uri: uri
      })];

      _lodash.default.take(matches, 5).forEach(match => {
        col1.push(`  ${match.text}`);

        if (isFinite(match.duration)) {
          col2.push(`${match.duration / _time.MILLISECONDS_IN_NANOSECOND}ms`);
        } else {
          col2.push('-');
        }

        col3.push((0, _helpers.formatLocation)(match));
      });

      if (matches.length > 5) {
        col1.push(`  ${matches.length - 5} more`);
      }

      table.push([col1.join('\n'), col2.join('\n'), col3.join('\n')]);
    });
    this.log(`${table.toString()}\n`);
  }

}

exports.default = UsageFormatter;