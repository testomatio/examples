"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _ = _interopRequireDefault(require("./"));

var _verror = _interopRequireDefault(require("verror"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exitWithError(error) {
  console.error(_verror.default.fullStack(error)); // eslint-disable-line no-console

  process.exit(1);
}

async function run() {
  const cwd = process.cwd();
  const cli = new _.default({
    argv: process.argv,
    cwd: cwd,
    stdout: process.stdout
  });
  let result;

  try {
    result = await cli.run();
  } catch (error) {
    exitWithError(error);
  }

  const exitCode = result.success ? 0 : 1;

  if (result.shouldExitImmediately) {
    process.exit(exitCode);
  } else {
    process.exitCode = exitCode;
  }
}