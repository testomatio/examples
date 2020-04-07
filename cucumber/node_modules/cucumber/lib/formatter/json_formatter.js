"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _2 = _interopRequireDefault(require("./"));

var _status = _interopRequireDefault(require("../status"));

var _helpers = require("./helpers");

var _step_arguments = require("../step_arguments");

var _assertionErrorFormatter = require("assertion-error-formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getStepLineToKeywordMap: getStepLineToKeywordMap,
  getScenarioLineToDescriptionMap: getScenarioLineToDescriptionMap
} = _helpers.GherkinDocumentParser;
const {
  getScenarioDescription: getScenarioDescription,
  getStepLineToPickledStepMap: getStepLineToPickledStepMap,
  getStepKeyword: getStepKeyword
} = _helpers.PickleParser;

class JsonFormatter extends _2.default {
  constructor(options) {
    super(options);
    options.eventBroadcaster.on('test-run-finished', this.onTestRunFinished.bind(this));
  }

  convertNameToId(obj) {
    return obj.name.replace(/ /g, '-').toLowerCase();
  }

  formatDataTable(dataTable) {
    return {
      rows: dataTable.rows.map(row => ({
        cells: _lodash.default.map(row.cells, 'value')
      }))
    };
  }

  formatDocString(docString) {
    return {
      content: docString.content,
      line: docString.location.line
    };
  }

  formatStepArguments(stepArguments) {
    const iterator = (0, _step_arguments.buildStepArgumentIterator)({
      dataTable: this.formatDataTable.bind(this),
      docString: this.formatDocString.bind(this)
    });
    return _lodash.default.map(stepArguments, iterator);
  }

  onTestRunFinished() {
    const groupedTestCaseAttempts = {};

    _lodash.default.each(this.eventDataCollector.getTestCaseAttempts(), testCaseAttempt => {
      if (!testCaseAttempt.result.retried) {
        const {
          uri: uri
        } = testCaseAttempt.testCase.sourceLocation;

        if (!groupedTestCaseAttempts[uri]) {
          groupedTestCaseAttempts[uri] = [];
        }

        groupedTestCaseAttempts[uri].push(testCaseAttempt);
      }
    });

    const features = _lodash.default.map(groupedTestCaseAttempts, (group, uri) => {
      const gherkinDocument = this.eventDataCollector.gherkinDocumentMap[uri];
      const featureData = this.getFeatureData(gherkinDocument.feature, uri);
      const stepLineToKeywordMap = getStepLineToKeywordMap(gherkinDocument);
      const scenarioLineToDescriptionMap = getScenarioLineToDescriptionMap(gherkinDocument);
      featureData.elements = group.map(testCaseAttempt => {
        const {
          pickle: pickle
        } = testCaseAttempt;
        const scenarioData = this.getScenarioData({
          featureId: featureData.id,
          pickle: pickle,
          scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
        });
        const stepLineToPickledStepMap = getStepLineToPickledStepMap(pickle);
        let isBeforeHook = true;
        scenarioData.steps = testCaseAttempt.testCase.steps.map((testStep, index) => {
          isBeforeHook = isBeforeHook && !testStep.sourceLocation;
          return this.getStepData({
            isBeforeHook: isBeforeHook,
            stepLineToKeywordMap: stepLineToKeywordMap,
            stepLineToPickledStepMap: stepLineToPickledStepMap,
            testStep: testStep,
            testStepAttachments: testCaseAttempt.stepAttachments[index],
            testStepResult: testCaseAttempt.stepResults[index]
          });
        });
        return scenarioData;
      });
      return featureData;
    });

    this.log(JSON.stringify(features, null, 2));
  }

  getFeatureData(feature, uri) {
    return {
      description: feature.description,
      keyword: feature.keyword,
      name: feature.name,
      line: feature.location.line,
      id: this.convertNameToId(feature),
      tags: this.getTags(feature),
      uri: uri
    };
  }

  getScenarioData({
    featureId: featureId,
    pickle: pickle,
    scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
  }) {
    const description = getScenarioDescription({
      pickle: pickle,
      scenarioLineToDescriptionMap: scenarioLineToDescriptionMap
    });
    return {
      description: description,
      id: `${featureId};${this.convertNameToId(pickle)}`,
      keyword: 'Scenario',
      line: pickle.locations[0].line,
      name: pickle.name,
      tags: this.getTags(pickle),
      type: 'scenario'
    };
  }

  getStepData({
    isBeforeHook: isBeforeHook,
    stepLineToKeywordMap: stepLineToKeywordMap,
    stepLineToPickledStepMap: stepLineToPickledStepMap,
    testStep: testStep,
    testStepAttachments: testStepAttachments,
    testStepResult: testStepResult
  }) {
    const data = {};

    if (testStep.sourceLocation) {
      const {
        line: line
      } = testStep.sourceLocation;
      const pickleStep = stepLineToPickledStepMap[line];
      data.arguments = this.formatStepArguments(pickleStep.arguments);
      data.keyword = getStepKeyword({
        pickleStep: pickleStep,
        stepLineToKeywordMap: stepLineToKeywordMap
      });
      data.line = line;
      data.name = pickleStep.text;
    } else {
      data.keyword = isBeforeHook ? 'Before' : 'After';
      data.hidden = true;
    }

    if (testStep.actionLocation) {
      data.match = {
        location: (0, _helpers.formatLocation)(testStep.actionLocation)
      };
    }

    if (testStepResult) {
      const {
        exception: exception,
        status: status
      } = testStepResult;
      data.result = {
        status: status
      };

      if (!_lodash.default.isUndefined(testStepResult.duration)) {
        data.result.duration = testStepResult.duration;
      }

      if (status === _status.default.FAILED && exception) {
        data.result.error_message = (0, _assertionErrorFormatter.format)(exception);
      }
    }

    if (_lodash.default.size(testStepAttachments) > 0) {
      data.embeddings = testStepAttachments.map(attachment => ({
        data: attachment.data,
        mime_type: attachment.media.type
      }));
    }

    return data;
  }

  getTags(obj) {
    return _lodash.default.map(obj.tags, tagData => ({
      name: tagData.name,
      line: tagData.location.line
    }));
  }

}

exports.default = JsonFormatter;