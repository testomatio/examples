"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScenarioDescription = getScenarioDescription;
exports.getStepKeyword = getStepKeyword;
exports.getStepLineToPickledStepMap = getStepLineToPickledStepMap;
exports.getPickleStepLine = getPickleStepLine;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScenarioDescription({
  pickle: pickle,
  scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
}) {
  return _lodash.default.chain(pickle.locations).map(({
    line: line
  }) => scenarioLineToDescriptionMap[line]).compact().first().value();
}

function getStepKeyword({
  pickleStep: pickleStep,
  stepLineToKeywordMap: stepLineToKeywordMap
}) {
  return _lodash.default.chain(pickleStep.locations).map(({
    line: line
  }) => stepLineToKeywordMap[line]).compact().first().value();
}

function getStepLineToPickledStepMap(pickle) {
  return _lodash.default.chain(pickle.steps).map(step => [getPickleStepLine(step), step]).fromPairs().value();
}

function getPickleStepLine(pickleStep) {
  return _lodash.default.last(pickleStep.locations).line;
}