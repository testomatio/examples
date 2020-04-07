"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateInstall = validateInstall;

var _bluebird = require("bluebird");

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = _interopRequireDefault(require("path"));

var _resolve = _interopRequireDefault(require("resolve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function validateInstall(cwd) {
  const projectPath = _path.default.join(__dirname, '..', '..');

  if (projectPath === cwd) {
    return; // cucumber testing itself
  }

  const currentCucumberPath = require.resolve(projectPath);

  let localCucumberPath = await (0, _bluebird.promisify)(_resolve.default)('cucumber', {
    basedir: cwd
  });
  localCucumberPath = await _fs.default.realpath(localCucumberPath);

  if (localCucumberPath !== currentCucumberPath) {
    throw new Error(`
      You appear to be executing an install of cucumber (most likely a global install)
      that is different from your local install (the one required in your support files).
      For cucumber to work, you need to execute the same install that is required in your support files.
      Please execute the locally installed version to run your tests.

      Executed Path: ${currentCucumberPath}
      Local Path:    ${localCucumberPath}
      `);
  }
}