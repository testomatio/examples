"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _test_helpers = require("../test_helpers");

var _get_color_fns = _interopRequireDefault(require("../get_color_fns"));

var _status = _interopRequireDefault(require("../../status"));

var _issue_helpers = require("./issue_helpers");

var _figures = _interopRequireDefault(require("figures"));

var _gherkin = _interopRequireDefault(require("gherkin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('IssueHelpers', () => {
  (0, _mocha.beforeEach)(function () {
    const gherkinDocument = new _gherkin.default.Parser().parse('Feature: my feature\n' + '  Scenario: my scenario\n' + '    Given step1\n' + '    When step2\n' + '    Then step3\n');
    const pickle = new _gherkin.default.Compiler().compile(gherkinDocument)[0];
    this.testCase = {
      sourceLocation: {
        uri: 'a.feature',
        line: 2
      },
      steps: [{
        actionLocation: {
          line: 2,
          uri: 'steps.js'
        },
        sourceLocation: {
          line: 3,
          uri: 'a.feature'
        }
      }, {}, {
        actionLocation: {
          line: 4,
          uri: 'steps.js'
        },
        sourceLocation: {
          line: 5,
          uri: 'a.feature'
        }
      }]
    };
    this.testCaseAttempt = {
      attemptNumber: 1,
      gherkinDocument: gherkinDocument,
      pickle: pickle,
      result: {},
      stepAttachments: [[], [], []],
      stepResults: [null, null, null],
      testCase: this.testCase
    };
    this.options = {
      colorFns: (0, _get_color_fns.default)(false),
      number: 1,
      snippetBuilder: (0, _test_helpers.createMock)({
        build: 'snippet'
      }),
      testCaseAttempt: this.testCaseAttempt
    };
    this.passedStepResult = {
      duration: 0,
      status: _status.default.PASSED
    };
    this.skippedStepResult = {
      status: _status.default.SKIPPED
    };
  });
  (0, _mocha.describe)('formatIssue', () => {
    (0, _mocha.describe)('returns the formatted scenario', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          exception: 'error',
          status: _status.default.FAILED
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('prints the scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ${_figures.default.cross} When step2 # steps.js:3\n` + '       error\n' + '   - Then step3 # steps.js:4\n\n');
      });
    });
    (0, _mocha.describe)('with an ambiguous step', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          exception: 'Multiple step definitions match:\n' + '  pattern1        - steps.js:5\n' + '  longer pattern2 - steps.js:6',
          status: _status.default.FAILED
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('returns the formatted scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ${_figures.default.cross} When step2 # steps.js:3\n` + '       Multiple step definitions match:\n' + '         pattern1        - steps.js:5\n' + '         longer pattern2 - steps.js:6\n' + '   - Then step3 # steps.js:4\n\n');
      });
    });
    (0, _mocha.describe)('with an undefined step', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCase.steps[1] = {
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          status: _status.default.UNDEFINED
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('returns the formatted scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ? When step2\n` + '       Undefined. Implement with the following snippet:\n' + '\n' + '         snippet\n' + '\n' + '   - Then step3 # steps.js:4\n\n');
      });
    });
    (0, _mocha.describe)('with a pending step', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          status: _status.default.PENDING
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('returns the formatted scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ? When step2 # steps.js:3\n` + '       Pending\n' + '   - Then step3 # steps.js:4\n\n');
      });
    });
    (0, _mocha.describe)('step with data table', () => {
      (0, _mocha.beforeEach)(function () {
        const gherkinDocument = new _gherkin.default.Parser().parse('Feature: my feature\n' + '  Scenario: my scenario\n' + '    Given step1\n' + '    When step2\n' + '    Then step3\n' + '      |aaa|b|c|\n' + '      |d|e|ff|\n' + '      |gg|h|iii|\n');
        this.testCaseAttempt.gherkinDocument = gherkinDocument;
        const pickle = new _gherkin.default.Compiler().compile(gherkinDocument)[0];
        this.testCaseAttempt.pickle = pickle;
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          status: _status.default.PENDING
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('returns the formatted scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ? When step2 # steps.js:3\n` + '       Pending\n' + '   - Then step3 # steps.js:4\n' + '       | aaa | b | c   |\n' + '       | d   | e | ff  |\n' + '       | gg  | h | iii |\n\n');
      });
    });
    (0, _mocha.describe)('step with doc string', () => {
      (0, _mocha.beforeEach)(function () {
        const gherkinDocument = new _gherkin.default.Parser().parse('Feature: my feature\n' + '  Scenario: my scenario\n' + '    Given step1\n' + '    When step2\n' + '    Then step3\n' + '       """\n' + '       this is a multiline\n' + '       doc string\n' + '\n' + '       :-)\n' + '       """\n');
        this.testCaseAttempt.gherkinDocument = gherkinDocument;
        const pickle = new _gherkin.default.Compiler().compile(gherkinDocument)[0];
        this.testCaseAttempt.pickle = pickle;
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepResults[1] = {
          status: _status.default.PENDING
        };
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('returns the formatted scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `   ? When step2 # steps.js:3\n` + '       Pending\n' + '   - Then step3 # steps.js:4\n' + '       """\n' + '       this is a multiline\n' + '       doc string\n' + '\n' + '       :-)\n' + '       """\n\n');
      });
    });
    (0, _mocha.describe)('step with attachment text', () => {
      (0, _mocha.beforeEach)(function () {
        this.testCase.steps[1] = {
          actionLocation: {
            line: 3,
            uri: 'steps.js'
          },
          sourceLocation: {
            line: 4,
            uri: 'a.feature'
          }
        };
        this.testCaseAttempt.stepResults[0] = this.passedStepResult;
        this.testCaseAttempt.stepAttachments[0] = [{
          data: 'Some info.',
          media: {
            type: 'text/plain'
          }
        }, {
          data: '{"name": "some JSON"}',
          media: {
            type: 'application/json'
          }
        }, {
          data: Buffer.from([]),
          media: {
            type: 'image/png'
          }
        }];
        this.testCaseAttempt.stepResults[1] = {
          exception: 'error',
          status: _status.default.FAILED
        };
        this.testCaseAttempt.stepAttachments[1] = [{
          data: 'Other info.',
          media: {
            type: 'text/plain'
          }
        }];
        this.testCaseAttempt.stepResults[2] = this.skippedStepResult;
        this.formattedIssue = (0, _issue_helpers.formatIssue)(this.options);
      });
      (0, _mocha.it)('prints the scenario', function () {
        (0, _chai.expect)(this.formattedIssue).to.eql('1) Scenario: my scenario # a.feature:2\n' + `   ${_figures.default.tick} Given step1 # steps.js:2\n` + `       Attachment (text/plain): Some info.\n` + `       Attachment (application/json)\n` + `       Attachment (image/png)\n` + `   ${_figures.default.cross} When step2 # steps.js:3\n` + `       Attachment (text/plain): Other info.\n` + '       error\n' + '   - Then step3 # steps.js:4\n\n');
      });
    });
  });
});