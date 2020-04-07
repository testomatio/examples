"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _bluebird = require("bluebird");

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = _interopRequireDefault(require("path"));

var _profile_loader = _interopRequireDefault(require("./profile_loader"));

var _tmp = _interopRequireDefault(require("tmp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('ProfileLoader', () => {
  (0, _mocha.describe)('getArgv', () => {
    (0, _mocha.beforeEach)(async function () {
      this.tmpDir = await (0, _bluebird.promisify)(_tmp.default.dir)({
        unsafeCleanup: true
      });
      this.profileLoader = new _profile_loader.default(this.tmpDir);
    });
    (0, _mocha.describe)('with no identifiers', () => {
      (0, _mocha.describe)('no definition file', () => {
        (0, _mocha.it)('returns an empty array', async function () {
          const result = await this.profileLoader.getArgv([]);
          (0, _chai.expect)(result).to.eql([]);
        });
      });
      (0, _mocha.describe)('with definition file', () => {
        (0, _mocha.describe)('with a default', () => {
          (0, _mocha.beforeEach)(async function () {
            const fileContent = 'module.exports = {default: "--opt1 --opt2"}';
            await _fs.default.writeFile(_path.default.join(this.tmpDir, 'cucumber.js'), fileContent);
          });
          (0, _mocha.it)('returns the argv for the default profile', async function () {
            const result = await this.profileLoader.getArgv([]);
            (0, _chai.expect)(result).to.eql(['--opt1', '--opt2']);
          });
        });
        (0, _mocha.describe)('without a default', () => {
          (0, _mocha.beforeEach)(async function () {
            const fileContent = 'module.exports = {profile1: "--opt1 --opt2"}';
            await _fs.default.writeFile(_path.default.join(this.tmpDir, 'cucumber.js'), fileContent);
          });
          (0, _mocha.it)('returns an empty array', async function () {
            const result = await this.profileLoader.getArgv([]);
            (0, _chai.expect)(result).to.eql([]);
          });
        });
      });
    });
    (0, _mocha.describe)('with identifiers', () => {
      (0, _mocha.describe)('no definition file', () => {
        (0, _mocha.it)('throws', async function () {
          let thrown = false;

          try {
            await this.profileLoader.getArgv(['profile1']);
          } catch (error) {
            thrown = true;
            (0, _chai.expect)(error.message).to.eql('Undefined profile: profile1');
          }

          (0, _chai.expect)(thrown).to.eql(true);
        });
      });
      (0, _mocha.describe)('with definition file', () => {
        (0, _mocha.beforeEach)(async function () {
          const fileContent = 'module.exports = {\n' + '  profile1: "--opt1 --opt2",\n' + '  profile2: "--opt3 \'some value\'"\n' + '}';
          await _fs.default.writeFile(_path.default.join(this.tmpDir, 'cucumber.js'), fileContent);
        });
        (0, _mocha.describe)('profile is defined', () => {
          (0, _mocha.it)('returns the argv for the given profile', async function () {
            const result = await this.profileLoader.getArgv(['profile1']);
            (0, _chai.expect)(result).to.eql(['--opt1', '--opt2']);
          });
        });
        (0, _mocha.describe)('profile is defined and contains quoted string', () => {
          (0, _mocha.it)('returns the argv for the given profile', async function () {
            const result = await this.profileLoader.getArgv(['profile2']);
            (0, _chai.expect)(result).to.eql(['--opt3', 'some value']);
          });
        });
        (0, _mocha.describe)('profile is not defined', () => {
          (0, _mocha.it)('throws', async function () {
            let thrown = false;

            try {
              await this.profileLoader.getArgv(['profile3']);
            } catch (error) {
              thrown = true;
              (0, _chai.expect)(error.message).to.eql('Undefined profile: profile3');
            }

            (0, _chai.expect)(thrown).to.eql(true);
          });
        });
      });
    });
  });
});