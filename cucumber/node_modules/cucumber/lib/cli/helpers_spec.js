"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _helpers = require("./helpers");

var _bluebird = require("bluebird");

var _events = _interopRequireDefault(require("events"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _pickle_filter = _interopRequireDefault(require("../pickle_filter"));

var _tmp = _interopRequireDefault(require("tmp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('helpers', () => {
  (0, _mocha.describe)('getTestCasesFromFilesystem', () => {
    (0, _mocha.beforeEach)(async function () {
      this.onSource = _sinon.default.stub();
      this.onGherkinDocument = _sinon.default.stub();
      this.onPickle = _sinon.default.stub();
      this.onPickleAccepted = _sinon.default.stub();
      this.onPickleRejected = _sinon.default.stub();
      this.eventBroadcaster = new _events.default();
      this.eventBroadcaster.on('source', this.onSource);
      this.eventBroadcaster.on('gherkin-document', this.onGherkinDocument);
      this.eventBroadcaster.on('pickle', this.onPickle);
      this.eventBroadcaster.on('pickle-accepted', this.onPickleAccepted);
      this.eventBroadcaster.on('pickle-rejected', this.onPickleRejected);
    });
    (0, _mocha.describe)('empty feature', () => {
      (0, _mocha.beforeEach)(async function () {
        this.tmpDir = await (0, _bluebird.promisify)(_tmp.default.dir)();
        this.relativeFeaturePath = _path.default.join('features', 'a.feature');

        const featurePath = _path.default.join(this.tmpDir, 'features', 'a.feature');

        await _fsExtra.default.outputFile(featurePath, '');
        this.result = await (0, _helpers.getTestCasesFromFilesystem)({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          featurePaths: [featurePath],
          order: 'defined',
          pickleFilter: new _pickle_filter.default({})
        });
      });
      (0, _mocha.it)('returns an empty array', function () {
        (0, _chai.expect)(this.result).to.eql([]);
      });
      (0, _mocha.it)('emits a source event', function () {
        (0, _chai.expect)(this.onSource).to.have.callCount(1);
        (0, _chai.expect)(this.onSource).to.have.been.calledWith({
          data: '',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber.gherkin+plain'
          },
          uri: this.relativeFeaturePath
        });
      });
      (0, _mocha.it)('emits a gherkin-document event', function () {
        (0, _chai.expect)(this.onGherkinDocument).to.have.callCount(1);
        const arg = this.onGherkinDocument.firstCall.args[0];
        (0, _chai.expect)(arg).to.have.keys(['document', 'uri']);
        (0, _chai.expect)(arg.uri).to.eql(this.relativeFeaturePath);
      });
      (0, _mocha.it)('does not emit pickle events', function () {
        (0, _chai.expect)(this.onPickle).to.have.callCount(0);
        (0, _chai.expect)(this.onPickleAccepted).to.have.callCount(0);
        (0, _chai.expect)(this.onPickleRejected).to.have.callCount(0);
      });
    });
    (0, _mocha.describe)('feature with scenario that does not match the filter', () => {
      (0, _mocha.beforeEach)(async function () {
        this.tmpDir = await (0, _bluebird.promisify)(_tmp.default.dir)();
        this.relativeFeaturePath = _path.default.join('features', 'a.feature');

        const featurePath = _path.default.join(this.tmpDir, 'features', 'a.feature');

        await _fsExtra.default.outputFile(featurePath, 'Feature: a\nScenario: b\nGiven a step');
        this.result = await (0, _helpers.getTestCasesFromFilesystem)({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          featurePaths: [featurePath],
          order: 'defined',
          pickleFilter: new _pickle_filter.default({
            featurePaths: [`${this.relativeFeaturePath}:5`]
          })
        });
      });
      (0, _mocha.it)('returns an empty array', function () {
        (0, _chai.expect)(this.result).to.eql([]);
      });
      (0, _mocha.it)('emits a source event', function () {
        (0, _chai.expect)(this.onSource).to.have.callCount(1);
        (0, _chai.expect)(this.onSource).to.have.been.calledWith({
          data: 'Feature: a\nScenario: b\nGiven a step',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber.gherkin+plain'
          },
          uri: this.relativeFeaturePath
        });
      });
      (0, _mocha.it)('emits a gherkin-document event', function () {
        (0, _chai.expect)(this.onGherkinDocument).to.have.callCount(1);
        const arg = this.onGherkinDocument.firstCall.args[0];
        (0, _chai.expect)(arg).to.have.keys(['document', 'uri']);
        (0, _chai.expect)(arg.uri).to.eql(this.relativeFeaturePath);
      });
    });
    (0, _mocha.describe)('feature with scenario that matches the filter', () => {
      (0, _mocha.beforeEach)(async function () {
        this.tmpDir = await (0, _bluebird.promisify)(_tmp.default.dir)();
        this.relativeFeaturePath = _path.default.join('features', 'a.feature');

        const featurePath = _path.default.join(this.tmpDir, 'features', 'a.feature');

        await _fsExtra.default.outputFile(featurePath, 'Feature: a\nScenario: b\nGiven a step');
        this.result = await (0, _helpers.getTestCasesFromFilesystem)({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          featurePaths: [featurePath],
          order: 'defined',
          pickleFilter: new _pickle_filter.default({})
        });
      });
      (0, _mocha.it)('returns the test case', function () {
        (0, _chai.expect)(this.result).to.have.lengthOf(1);
        (0, _chai.expect)(this.result[0]).to.have.keys(['pickle', 'uri']);
        (0, _chai.expect)(this.result[0].uri).to.eql(this.relativeFeaturePath);
      });
      (0, _mocha.it)('emits a source event', function () {
        (0, _chai.expect)(this.onSource).to.have.callCount(1);
        (0, _chai.expect)(this.onSource).to.have.been.calledWith({
          data: 'Feature: a\nScenario: b\nGiven a step',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber.gherkin+plain'
          },
          uri: this.relativeFeaturePath
        });
      });
      (0, _mocha.it)('emits a gherkin-document event', function () {
        (0, _chai.expect)(this.onGherkinDocument).to.have.callCount(1);
        const arg = this.onGherkinDocument.firstCall.args[0];
        (0, _chai.expect)(arg).to.have.keys(['document', 'uri']);
        (0, _chai.expect)(arg.uri).to.eql(this.relativeFeaturePath);
      });
      (0, _mocha.it)('emits a pickle and pickle-accepted event', function () {
        (0, _chai.expect)(this.onPickle).to.have.callCount(1);
        (0, _chai.expect)(this.onPickleAccepted).to.have.callCount(1);
        (0, _chai.expect)(this.onPickleRejected).to.have.callCount(0);
        const onPickleArg = this.onPickle.firstCall.args[0];
        (0, _chai.expect)(onPickleArg).to.have.keys(['pickle', 'uri']);
        (0, _chai.expect)(onPickleArg.uri).to.eql(this.relativeFeaturePath);
        const onPickleAcceptedArg = this.onPickleAccepted.firstCall.args[0];
        (0, _chai.expect)(onPickleAcceptedArg).to.eql(onPickleArg);
      });
    });
  });
});