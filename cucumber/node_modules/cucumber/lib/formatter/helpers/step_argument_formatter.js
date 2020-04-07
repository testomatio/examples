"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatStepArguments = formatStepArguments;

var _cliTable = _interopRequireDefault(require("cli-table3"));

var _step_arguments = require("../../step_arguments");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDataTable(arg) {
  const table = new _cliTable.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '|',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: '|',
      right: '|',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 1,
      'padding-right': 1
    }
  });
  table.push(...arg.rows);
  return table.toString();
}

function formatDocString(arg) {
  return `"""\n${arg.content}\n"""`;
}

function formatStepArguments(args) {
  const iterator = (0, _step_arguments.buildStepArgumentIterator)({
    dataTable: arg => formatDataTable(arg),
    docString: arg => formatDocString(arg)
  });
  return args.map(iterator).join('\n');
}