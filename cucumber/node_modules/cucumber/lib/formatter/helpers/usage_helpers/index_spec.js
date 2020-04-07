"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _ = require("./");

var _events = _interopRequireDefault(require("events"));

var _gherkin = _interopRequireDefault(require("gherkin"));

var _event_data_collector = _interopRequireDefault(require("../event_data_collector"));

var _cucumberExpressions = require("cucumber-expressions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('Usage Helpers', () => {
  (0, _mocha.describe)('getUsage', () => {
    (0, _mocha.beforeEach)(function () {
      this.eventBroadcaster = new _events.default();
      this.eventDataCollector = new _event_data_collector.default(this.eventBroadcaster);
      this.parameterTypeRegistry = new _cucumberExpressions.ParameterTypeRegistry();
      this.stepDefinitions = [];

      this.getResult = () => (0, _.getUsage)({
        eventDataCollector: this.eventDataCollector,
        stepDefinitions: this.stepDefinitions
      });
    });
    (0, _mocha.describe)('no step definitions', () => {
      (0, _mocha.describe)('without steps', () => {
        (0, _mocha.beforeEach)(function () {
          this.eventBroadcaster.emit('test-run-finished');
        });
        (0, _mocha.it)('returns an empty array', function () {
          (0, _chai.expect)(this.getResult()).to.eql([]);
        });
      });
      (0, _mocha.describe)('with some steps', () => {
        (0, _mocha.beforeEach)(function () {
          const events = _gherkin.default.generateEvents('Feature: a\nScenario: b\nWhen abc\nThen ab', 'a.feature');

          events.forEach(event => {
            this.eventBroadcaster.emit(event.type, event);

            if (event.type === 'pickle') {
              this.eventBroadcaster.emit('pickle-accepted', {
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
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: testCase.sourceLocation,
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 3
              }
            }, {
              sourceLocation: {
                uri: 'a.feature',
                line: 4
              }
            }]
          });
          this.eventBroadcaster.emit('test-case-started', testCase);
          this.eventBroadcaster.emit('test-step-finished', {
            index: 0,
            testCase: testCase,
            result: {}
          });
          this.eventBroadcaster.emit('test-step-finished', {
            index: 1,
            testCase: testCase,
            result: {}
          });
          this.eventBroadcaster.emit('test-case-finished', { ...testCase,
            result: {}
          });
          this.eventBroadcaster.emit('test-run-finished');
        });
        (0, _mocha.it)('returns an empty array', function () {
          (0, _chai.expect)(this.getResult()).to.eql([]);
        });
      });
    });
    (0, _mocha.describe)('with step definitions', () => {
      (0, _mocha.beforeEach)(function () {
        this.stepDefinitions.push({
          code: function () {
            'original code';
          },
          // eslint-disable-line prettier/prettier
          uri: 'steps.js',
          expression: new _cucumberExpressions.CucumberExpression('abc', this.parameterTypeRegistry),
          line: 30
        }, {
          code: function () {
            'wrapped code';
          },
          // eslint-disable-line prettier/prettier
          unwrappedCode: function () {
            'original code';
          },
          // eslint-disable-line prettier/prettier
          uri: 'steps.js',
          expression: new _cucumberExpressions.CucumberExpression('ab', this.parameterTypeRegistry),
          line: 40
        });
      });
      (0, _mocha.describe)('without steps run', () => {
        (0, _mocha.beforeEach)(function () {
          this.eventBroadcaster.emit('test-run-finished');
        });
        (0, _mocha.it)('returns an array with the step definitions', function () {
          (0, _chai.expect)(this.getResult()).to.have.lengthOf(2);
        });
      });
      (0, _mocha.describe)('with some steps', () => {
        (0, _mocha.beforeEach)(function () {
          const events = _gherkin.default.generateEvents('Feature: a\nScenario: b\nWhen abc\nThen ab', 'a.feature');

          events.forEach(event => {
            this.eventBroadcaster.emit(event.type, event);

            if (event.type === 'pickle') {
              this.eventBroadcaster.emit('pickle-accepted', {
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
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: testCase.sourceLocation,
            steps: [{
              sourceLocation: {
                uri: 'a.feature',
                line: 3
              }
            }, {
              sourceLocation: {
                uri: 'a.feature',
                line: 4
              }
            }]
          });
          this.eventBroadcaster.emit('test-case-started', testCase);
          this.eventBroadcaster.emit('test-step-finished', {
            index: 0,
            testCase: testCase,
            result: {}
          });
          this.eventBroadcaster.emit('test-step-finished', {
            index: 1,
            testCase: testCase,
            result: {}
          });
          this.eventBroadcaster.emit('test-run-finished');
        });
        (0, _mocha.it)('returns an array with the step definitions, including correct stringified code', function () {
          const result = this.getResult();
          (0, _chai.expect)(result).to.have.lengthOf(2);
          (0, _chai.expect)(result[0].code).to.contain('original code');
          (0, _chai.expect)(result[1].code).to.contain('original code');
        });
      });
    });
  });
});