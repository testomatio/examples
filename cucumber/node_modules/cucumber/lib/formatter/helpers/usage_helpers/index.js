"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsage = getUsage;

var _lodash = _interopRequireDefault(require("lodash"));

var _location_helpers = require("../location_helpers");

var _pickle_parser = require("../pickle_parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCodeAsString(stepDefinition) {
  if (typeof stepDefinition.unwrappedCode === 'function') {
    return stepDefinition.unwrappedCode.toString();
  }

  return stepDefinition.code.toString();
}

function buildEmptyMapping(stepDefinitions) {
  const mapping = {};
  stepDefinitions.forEach(stepDefinition => {
    const location = (0, _location_helpers.formatLocation)(stepDefinition);
    mapping[location] = {
      code: getCodeAsString(stepDefinition),
      line: stepDefinition.line,
      pattern: stepDefinition.expression.source,
      patternType: stepDefinition.expression.constructor.name,
      matches: [],
      uri: stepDefinition.uri
    };
  });
  return mapping;
}

function buildMapping({
  stepDefinitions: stepDefinitions,
  eventDataCollector: eventDataCollector
}) {
  const mapping = buildEmptyMapping(stepDefinitions);

  _lodash.default.each(eventDataCollector.getTestCaseAttempts(), testCaseAttempt => {
    const stepLineToPickledStepMap = (0, _pickle_parser.getStepLineToPickledStepMap)(testCaseAttempt.pickle);
    testCaseAttempt.stepResults.forEach((testStepResult, index) => {
      const {
        actionLocation: actionLocation,
        sourceLocation: sourceLocation
      } = testCaseAttempt.testCase.steps[index];
      const {
        duration: duration
      } = testStepResult;

      if (actionLocation && sourceLocation) {
        const location = (0, _location_helpers.formatLocation)(actionLocation);
        const match = {
          line: sourceLocation.line,
          text: stepLineToPickledStepMap[sourceLocation.line].text,
          uri: sourceLocation.uri
        };

        if (isFinite(duration)) {
          match.duration = duration;
        }

        if (mapping[location]) {
          mapping[location].matches.push(match);
        }
      }
    });
  });

  return mapping;
}

function invertNumber(key) {
  return obj => {
    const value = obj[key];

    if (isFinite(value)) {
      return -1 * value;
    }

    return 1;
  };
}

function buildResult(mapping) {
  return _lodash.default.chain(mapping).map(({
    matches: matches,
    ...rest
  }) => {
    const sortedMatches = _lodash.default.sortBy(matches, [invertNumber('duration'), 'text']);

    const result = {
      matches: sortedMatches,
      ...rest
    };

    const meanDuration = _lodash.default.meanBy(matches, 'duration');

    if (isFinite(meanDuration)) {
      result.meanDuration = meanDuration;
    }

    return result;
  }).sortBy(invertNumber('meanDuration')).value();
}

function getUsage({
  stepDefinitions: stepDefinitions,
  eventDataCollector: eventDataCollector
}) {
  const mapping = buildMapping({
    stepDefinitions: stepDefinitions,
    eventDataCollector: eventDataCollector
  });
  return buildResult(mapping);
}