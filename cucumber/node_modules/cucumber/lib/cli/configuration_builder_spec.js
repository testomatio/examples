"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _bluebird = require("bluebird");

var _configuration_builder = _interopRequireDefault(require("./configuration_builder"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _tmp = _interopRequireDefault(require("tmp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('Configuration', () => {
  (0, _mocha.beforeEach)(async function () {
    this.tmpDir = await (0, _bluebird.promisify)(_tmp.default.dir)({
      unsafeCleanup: true
    });
    await (0, _bluebird.promisify)(_fsExtra.default.mkdirp)(_path.default.join(this.tmpDir, 'features'));
    this.argv = ['path/to/node', 'path/to/cucumber.js'];
    this.configurationOptions = {
      argv: this.argv,
      cwd: this.tmpDir
    };
  });
  (0, _mocha.describe)('no argv', () => {
    (0, _mocha.beforeEach)(async function () {
      this.result = await _configuration_builder.default.build(this.configurationOptions);
    });
    (0, _mocha.it)('returns the default configuration', function () {
      (0, _chai.expect)(this.result).to.eql({
        featureDefaultLanguage: '',
        featurePaths: [],
        formatOptions: {
          cwd: this.tmpDir
        },
        formats: [{
          outputTo: '',
          type: 'progress'
        }],
        listI18nKeywordsFor: '',
        listI18nLanguages: false,
        order: 'defined',
        parallel: 0,
        pickleFilterOptions: {
          featurePaths: ['features/**/*.feature'],
          names: [],
          tagExpression: ''
        },
        profiles: [],
        runtimeOptions: {
          dryRun: false,
          failFast: false,
          filterStacktraces: true,
          retry: 0,
          retryTagFilter: '',
          strict: true,
          worldParameters: {}
        },
        shouldExitImmediately: false,
        supportCodePaths: [],
        supportCodeRequiredModules: []
      });
    });
  });
  (0, _mocha.describe)('path to a feature', () => {
    (0, _mocha.beforeEach)(async function () {
      this.relativeFeaturePath = _path.default.join('features', 'a.feature');
      this.featurePath = _path.default.join(this.tmpDir, this.relativeFeaturePath);
      await _fsExtra.default.outputFile(this.featurePath, '');
      this.supportCodePath = _path.default.join(this.tmpDir, 'features', 'a.js');
      await _fsExtra.default.outputFile(this.supportCodePath, '');
      this.argv.push(this.relativeFeaturePath);
      this.result = await _configuration_builder.default.build(this.configurationOptions);
    });
    (0, _mocha.it)('returns the appropriate feature and support code paths', async function () {
      const {
        featurePaths: featurePaths,
        pickleFilterOptions: pickleFilterOptions,
        supportCodePaths: supportCodePaths
      } = this.result;
      (0, _chai.expect)(featurePaths).to.eql([this.featurePath]);
      (0, _chai.expect)(pickleFilterOptions.featurePaths).to.eql([this.relativeFeaturePath]);
      (0, _chai.expect)(supportCodePaths).to.eql([this.supportCodePath]);
    });
  });
  (0, _mocha.describe)('path to a nested feature', () => {
    (0, _mocha.beforeEach)(async function () {
      this.relativeFeaturePath = _path.default.join('features', 'nested', 'a.feature');
      this.featurePath = _path.default.join(this.tmpDir, this.relativeFeaturePath);
      await _fsExtra.default.outputFile(this.featurePath, '');
      this.supportCodePath = _path.default.join(this.tmpDir, 'features', 'a.js');
      await _fsExtra.default.outputFile(this.supportCodePath, '');
      this.argv.push(this.relativeFeaturePath);
      this.result = await _configuration_builder.default.build(this.configurationOptions);
    });
    (0, _mocha.it)('returns the appropriate feature and support code paths', async function () {
      const {
        featurePaths: featurePaths,
        pickleFilterOptions: pickleFilterOptions,
        supportCodePaths: supportCodePaths
      } = this.result;
      (0, _chai.expect)(featurePaths).to.eql([this.featurePath]);
      (0, _chai.expect)(pickleFilterOptions.featurePaths).to.eql([this.relativeFeaturePath]);
      (0, _chai.expect)(supportCodePaths).to.eql([this.supportCodePath]);
    });
  });
  (0, _mocha.describe)('formatters', () => {
    (0, _mocha.it)('adds a default', async function () {
      const formats = await getFormats(this.configurationOptions);
      (0, _chai.expect)(formats).to.eql([{
        outputTo: '',
        type: 'progress'
      }]);
    });
    (0, _mocha.it)('splits relative unix paths', async function () {
      this.argv.push('-f', '../custom/formatter:../formatter/output.txt');
      const formats = await getFormats(this.configurationOptions);
      (0, _chai.expect)(formats).to.eql([{
        outputTo: '',
        type: 'progress'
      }, {
        outputTo: '../formatter/output.txt',
        type: '../custom/formatter'
      }]);
    });
    (0, _mocha.it)('splits absolute unix paths', async function () {
      this.argv.push('-f', '/custom/formatter:/formatter/output.txt');
      const formats = await getFormats(this.configurationOptions);
      (0, _chai.expect)(formats).to.eql([{
        outputTo: '',
        type: 'progress'
      }, {
        outputTo: '/formatter/output.txt',
        type: '/custom/formatter'
      }]);
    });
    (0, _mocha.it)('splits absolute windows paths', async function () {
      this.argv.push('-f', 'C:\\custom\\formatter:D:\\formatter\\output.txt');
      const formats = await getFormats(this.configurationOptions);
      (0, _chai.expect)(formats).to.eql([{
        outputTo: '',
        type: 'progress'
      }, {
        outputTo: 'D:\\formatter\\output.txt',
        type: 'C:\\custom\\formatter'
      }]);
    });
    (0, _mocha.it)('does not split absolute windows paths without an output', async function () {
      this.argv.push('-f', 'C:\\custom\\formatter');
      const formats = await getFormats(this.configurationOptions);
      (0, _chai.expect)(formats).to.eql([{
        outputTo: '',
        type: 'C:\\custom\\formatter'
      }]);
    });

    async function getFormats(options) {
      const result = await _configuration_builder.default.build(options);
      return result.formats;
    }
  });
  (0, _mocha.describe)('formatOptions', () => {
    (0, _mocha.it)('returns the format options passed in with cwd added', async function () {
      this.argv.push('--format-options', '{"snippetSyntax": "promise"}');
      const result = await _configuration_builder.default.build(this.configurationOptions);
      (0, _chai.expect)(result.formatOptions).to.eql({
        snippetSyntax: 'promise',
        cwd: this.tmpDir
      });
    });
  });
});