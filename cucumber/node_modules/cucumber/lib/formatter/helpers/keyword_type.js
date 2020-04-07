"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepKeywordType = getStepKeywordType;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _gherkin = _interopRequireDefault(require("gherkin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = {
  EVENT: 'event',
  OUTCOME: 'outcome',
  PRECONDITION: 'precondition'
};
var _default = types;
exports.default = _default;

function getStepKeywordType({
  keyword: keyword,
  language: language,
  previousKeywordType: previousKeywordType
}) {
  const dialect = _gherkin.default.DIALECTS[language];

  const type = _lodash.default.find(['given', 'when', 'then', 'and', 'but'], key => _lodash.default.includes(dialect[key], keyword));

  switch (type) {
    case 'when':
      return types.EVENT;

    case 'then':
      return types.OUTCOME;

    case 'and':
    case 'but':
      if (previousKeywordType) {
        return previousKeywordType;
      }

    // fallthrough

    default:
      return types.PRECONDITION;
  }
}