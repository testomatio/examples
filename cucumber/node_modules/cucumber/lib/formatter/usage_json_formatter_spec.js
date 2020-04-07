"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _usage_json_formatter = _interopRequireDefault(require("./usage_json_formatter"));

var _events = _interopRequireDefault(require("events"));

var _gherkin = _interopRequireDefault(require("gherkin"));

var _helpers = require("./helpers");

var _cucumberExpressions = require("cucumber-expressions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('UsageJsonFormatter', () => {
  (0, _mocha.describe)('handleFeaturesResult', () => {
    (0, _mocha.beforeEach)(function () {
      const eventBroadcaster = new _events.default();
      const parameterTypeRegistry = new _cucumberExpressions.ParameterTypeRegistry();
      this.output = '';

      const logFn = data => {
        this.output += data;
      };

      const supportCodeLibrary = {
        stepDefinitions: [{
          code: function (a) {},
          line: 1,
          expression: new _cucumberExpressions.CucumberExpression('abc', parameterTypeRegistry),
          uri: 'steps.js'
        }, {
          code: function (b) {},
          line: 2,
          expression: new _cucumberExpressions.RegularExpression(/def/, parameterTypeRegistry),
          uri: 'steps.js'
        }, {
          code: function (c) {},
          line: 3,
          expression: new _cucumberExpressions.CucumberExpression('ghi', parameterTypeRegistry),
          uri: 'steps.js'
        }]
      };
      this.usageJsonFormatter = new _usage_json_formatter.default({
        eventBroadcaster: eventBroadcaster,
        eventDataCollector: new _helpers.EventDataCollector(eventBroadcaster),
        log: logFn,
        supportCodeLibrary: supportCodeLibrary
      });

      const events = _gherkin.default.generateEvents('Feature: a\nScenario: b\nGiven abc\nWhen def', 'a.feature');

      events.forEach(event => {
        eventBroadcaster.emit(event.type, event);

        if (event.type === 'pickle') {
          eventBroadcaster.emit('pickle-accepted', {
            type: 'pickle-accepted',
            pickle: event.pickle,
            uri: event.uri
          });
        }
      });
      const testCase = {
        attemptNumber: 1,
        sourceLocation: {
          uri: 'a.feature',
          line: 2
        }
      };
      eventBroadcaster.emit('test-case-prepared', {
        sourceLocation: testCase.sourceLocation,
        steps: [{
          sourceLocation: {
            uri: 'a.feature',
            line: 3
          },
          actionLocation: {
            uri: 'steps.js',
            line: 1
          }
        }, {
          sourceLocation: {
            uri: 'a.feature',
            line: 4
          },
          actionLocation: {
            uri: 'steps.js',
            line: 2
          }
        }]
      });
      eventBroadcaster.emit('test-case-started', testCase);
      eventBroadcaster.emit('test-step-finished', {
        index: 0,
        testCase: testCase,
        result: {
          duration: 1
        }
      });
      eventBroadcaster.emit('test-step-finished', {
        index: 1,
        testCase: testCase,
        result: {
          duration: 2
        }
      });
      eventBroadcaster.emit('test-run-finished');
    });
    (0, _mocha.it)('outputs the usage in json format', function () {
      const parsedOutput = JSON.parse(this.output);
      (0, _chai.expect)(parsedOutput).to.eql([{
        code: 'function (b) {}',
        line: 2,
        matches: [{
          duration: 2,
          line: 4,
          text: 'def',
          uri: 'a.feature'
        }],
        meanDuration: 2,
        pattern: 'def',
        patternType: 'RegularExpression',
        uri: 'steps.js'
      }, {
        code: 'function (a) {}',
        line: 1,
        matches: [{
          duration: 1,
          line: 3,
          text: 'abc',
          uri: 'a.feature'
        }],
        meanDuration: 1,
        pattern: 'abc',
        patternType: 'CucumberExpression',
        uri: 'steps.js'
      }, {
        code: 'function (c) {}',
        line: 3,
        matches: [],
        pattern: 'ghi',
        patternType: 'CucumberExpression',
        uri: 'steps.js'
      }]);
    });
  });
});