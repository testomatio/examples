"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EventDataCollector {
  constructor(eventBroadcaster) {
    eventBroadcaster.on('gherkin-document', this.storeGherkinDocument.bind(this)).on('pickle', this.storePickle.bind(this)).on('test-case-prepared', this.storeTestCase.bind(this)).on('test-step-attachment', this.storeTestStepAttachment.bind(this)).on('test-case-started', this.initTestCaseResult.bind(this)).on('test-step-finished', this.storeTestStepResult.bind(this)).on('test-case-finished', this.storeTestCaseResult.bind(this));
    this.gherkinDocumentMap = {}; // uri to gherkinDocument

    this.pickleMap = {}; // uri:line to pickle

    this.testCaseMap = {}; // uri:line to {sourceLocation, steps}

    this.testCaseAttemptMap = {}; // uri:line:attemptNumber to {result, stepAttachments, stepResults}
  }

  getTestCaseAttempts() {
    return _lodash.default.keys(this.testCaseAttemptMap).map(testCaseAttemptKey => {
      const [uri, line] = testCaseAttemptKey.split(':');
      const testCaseKey = this.getTestCaseKey({
        uri: uri,
        line: line
      });
      return this.internalGetTestCaseAttempt({
        uri: uri,
        testCaseKey: testCaseKey,
        testCaseAttemptKey: testCaseAttemptKey
      });
    });
  }

  getTestCaseAttempt({
    attemptNumber: attemptNumber,
    sourceLocation: sourceLocation
  }) {
    const testCaseKey = this.getTestCaseKey(sourceLocation);
    const testCaseAttemptKey = this.getTestCaseAttemptKey({
      attemptNumber: attemptNumber,
      sourceLocation: sourceLocation
    });
    return this.internalGetTestCaseAttempt({
      uri: sourceLocation.uri,
      testCaseKey: testCaseKey,
      testCaseAttemptKey: testCaseAttemptKey
    });
  }

  internalGetTestCaseAttempt({
    uri: uri,
    testCaseKey: testCaseKey,
    testCaseAttemptKey: testCaseAttemptKey
  }) {
    return {
      gherkinDocument: this.gherkinDocumentMap[uri],
      pickle: this.pickleMap[testCaseKey],
      testCase: this.testCaseMap[testCaseKey],
      ...this.testCaseAttemptMap[testCaseAttemptKey]
    };
  }

  getTestCaseKey({
    uri: uri,
    line: line
  }) {
    return `${uri}:${line}`;
  }

  getTestCaseAttemptKey({
    attemptNumber: attemptNumber,
    sourceLocation: {
      uri: uri,
      line: line
    }
  }) {
    return `${uri}:${line}:${attemptNumber}`;
  }

  storeGherkinDocument({
    document: document,
    uri: uri
  }) {
    this.gherkinDocumentMap[uri] = { ...document,
      uri: uri
    };
  }

  storePickle({
    pickle: pickle,
    uri: uri
  }) {
    this.pickleMap[`${uri}:${pickle.locations[0].line}`] = { ...pickle,
      uri: uri
    };
  }

  storeTestCase({
    sourceLocation: sourceLocation,
    steps: steps
  }) {
    const key = this.getTestCaseKey(sourceLocation);
    this.testCaseMap[key] = {
      sourceLocation: sourceLocation,
      steps: steps
    };
  }

  initTestCaseResult(testCaseStartedEvent) {
    const testCaseKey = this.getTestCaseKey(testCaseStartedEvent.sourceLocation);
    const testCase = this.testCaseMap[testCaseKey];
    const testCaseAttemptKey = this.getTestCaseAttemptKey(testCaseStartedEvent);
    this.testCaseAttemptMap[testCaseAttemptKey] = {
      attemptNumber: testCaseStartedEvent.attemptNumber,
      result: {},
      stepAttachments: testCase.steps.map(_ => []),
      stepResults: testCase.steps.map(_ => null)
    };
  }

  storeTestStepAttachment({
    index: index,
    testCase: testCase,
    data: data,
    media: media
  }) {
    const key = this.getTestCaseAttemptKey(testCase);
    this.testCaseAttemptMap[key].stepAttachments[index].push({
      data: data,
      media: media
    });
  }

  storeTestStepResult({
    index: index,
    testCase: testCase,
    result: result
  }) {
    const key = this.getTestCaseAttemptKey(testCase);
    this.testCaseAttemptMap[key].stepResults[index] = result;
  }

  storeTestCaseResult(testCaseFinishedEvent) {
    const key = this.getTestCaseAttemptKey(testCaseFinishedEvent);
    this.testCaseAttemptMap[key].result = testCaseFinishedEvent.result;
  }

}

exports.default = EventDataCollector;