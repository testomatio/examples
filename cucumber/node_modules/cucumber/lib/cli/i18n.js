"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguages = getLanguages;
exports.getKeywords = getKeywords;

var _lodash = _interopRequireDefault(require("lodash"));

var _gherkin = _interopRequireDefault(require("gherkin"));

var _cliTable = _interopRequireDefault(require("cli-table3"));

var _titleCase = _interopRequireDefault(require("title-case"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const keywords = ['feature', 'background', 'scenario', 'scenarioOutline', 'examples', 'given', 'when', 'then', 'and', 'but'];

function getAsTable(header, rows) {
  const table = new _cliTable.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: ' | ',
      right: '',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 0,
      'padding-right': 0
    }
  });
  table.push(header);
  table.push(...rows);
  return table.toString();
}

function getLanguages() {
  const rows = _lodash.default.map(_gherkin.default.DIALECTS, (data, isoCode) => [isoCode, data.name, data.native]);

  return getAsTable(['ISO 639-1', 'ENGLISH NAME', 'NATIVE NAME'], rows);
}

function getKeywords(isoCode) {
  const language = _gherkin.default.DIALECTS[isoCode];

  const rows = _lodash.default.map(keywords, keyword => {
    const words = _lodash.default.map(language[keyword], s => `"${s}"`).join(', ');

    return [(0, _titleCase.default)(keyword), words];
  });

  return getAsTable(['ENGLISH KEYWORD', 'NATIVE KEYWORDS'], rows);
}