"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTestCaseAttempt = parseTestCaseAttempt;

var _lodash = _interopRequireDefault(require("lodash"));

var _status = _interopRequireDefault(require("../../status"));

var _keyword_type = _interopRequireWildcard(require("./keyword_type"));

var _step_arguments = require("../../step_arguments");

var _gherkin_document_parser = require("./gherkin_document_parser");

var _pickle_parser = require("./pickle_parser");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseDataTable(arg) {
  const rows = arg.rows.map(row => row.cells.map(cell => cell.value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n')));
  return {
    rows: rows
  };
}

function parseDocString(arg) {
  return {
    content: arg.content
  };
}

function parseStep({
  isBeforeHook: isBeforeHook,
  keyword: keyword,
  keywordType: keywordType,
  pickleStep: pickleStep,
  snippetBuilder: snippetBuilder,
  testStep: testStep,
  testStepResult: testStepResult,
  testStepAttachments: testStepAttachments
}) {
  const out = {
    attachments: testStepAttachments,
    result: testStepResult
  };

  if (testStep.actionLocation) {
    out.actionLocation = testStep.actionLocation;
  }

  if (testStep.sourceLocation) {
    out.keyword = keyword;
    out.sourceLocation = testStep.sourceLocation;
    out.text = pickleStep.text;
  } else {
    out.keyword = isBeforeHook ? 'Before' : 'After';
  }

  if (pickleStep) {
    const iterator = (0, _step_arguments.buildStepArgumentIterator)({
      dataTable: arg => parseDataTable(arg),
      docString: arg => parseDocString(arg)
    });
    out.arguments = pickleStep.arguments.map(iterator);
  }

  if (testStepResult.status === _status.default.UNDEFINED) {
    out.snippet = snippetBuilder.build({
      keywordType: keywordType,
      pickleStep: pickleStep
    });
  }

  return out;
} // Converts a testCaseAttempt into a json object with all data needed for
// displaying it in a pretty format
//
// Returns the following
// {
//   testCase: {sourceLocation, name, attemptNumber, result: { status, retried, duration}},
//   testSteps: [
//     {attachments, keyword, text?, result: {status, duration}, arguments?, snippet?, sourceLocation?, actionLocation?}
//     ...
//   ]
// }


function parseTestCaseAttempt({
  testCaseAttempt: testCaseAttempt,
  snippetBuilder: snippetBuilder
}) {
  const {
    testCase: testCase,
    pickle: pickle,
    gherkinDocument: gherkinDocument
  } = testCaseAttempt;
  const out = {
    testCase: {
      attemptNumber: testCaseAttempt.attemptNumber,
      name: pickle.name,
      result: testCaseAttempt.result,
      sourceLocation: testCase.sourceLocation
    },
    testSteps: []
  };
  const stepLineToKeywordMap = (0, _gherkin_document_parser.getStepLineToKeywordMap)(gherkinDocument);
  const stepLineToPickledStepMap = (0, _pickle_parser.getStepLineToPickledStepMap)(pickle);
  let isBeforeHook = true;
  let previousKeywordType = _keyword_type.default.PRECONDITION;

  _lodash.default.each(testCaseAttempt.stepResults, (testStepResult, index) => {
    const testStep = testCase.steps[index];
    isBeforeHook = isBeforeHook && !testStep.sourceLocation;
    let keyword, keywordType, pickleStep;

    if (testStep.sourceLocation) {
      pickleStep = stepLineToPickledStepMap[testStep.sourceLocation.line];
      keyword = (0, _pickle_parser.getStepKeyword)({
        pickleStep: pickleStep,
        stepLineToKeywordMap: stepLineToKeywordMap
      });
      keywordType = (0, _keyword_type.getStepKeywordType)({
        keyword: keyword,
        language: gherkinDocument.feature.language,
        previousKeywordType: previousKeywordType
      });
    }

    const parsedStep = parseStep({
      isBeforeHook: isBeforeHook,
      keyword: keyword,
      keywordType: keywordType,
      pickleStep: pickleStep,
      snippetBuilder: snippetBuilder,
      testStep: testStep,
      testStepResult: testStepResult,
      testStepAttachments: testCaseAttempt.stepAttachments[index]
    });
    out.testSteps.push(parsedStep);
    previousKeywordType = keywordType;
  });

  return out;
}