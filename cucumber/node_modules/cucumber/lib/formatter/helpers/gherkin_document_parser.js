"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepLineToKeywordMap = getStepLineToKeywordMap;
exports.getScenarioLineToDescriptionMap = getScenarioLineToDescriptionMap;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStepLineToKeywordMap(gherkinDocument) {
  return _lodash.default.chain(gherkinDocument.feature.children).map('steps').flatten().map(step => [step.location.line, step.keyword]).fromPairs().value();
}

function getScenarioLineToDescriptionMap(gherkinDocument) {
  return _lodash.default.chain(gherkinDocument.feature.children).map(element => [element.location.line, element.description]).fromPairs().value();
}