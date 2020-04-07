"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = _interopRequireDefault(require("path"));

var _stringArgv = _interopRequireDefault(require("string-argv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileLoader {
  constructor(directory) {
    this.directory = directory;
  }

  async getDefinitions() {
    const definitionsFilePath = _path.default.join(this.directory, 'cucumber.js');

    const exists = await _fs.default.exists(definitionsFilePath);

    if (!exists) {
      return {};
    }

    const definitions = require(definitionsFilePath);

    if (typeof definitions !== 'object') {
      throw new Error(`${definitionsFilePath} does not export an object`);
    }

    return definitions;
  }

  async getArgv(profiles) {
    const definitions = await this.getDefinitions();

    if (profiles.length === 0 && definitions.default) {
      profiles = ['default'];
    }

    const argvs = profiles.map(profile => {
      if (!definitions[profile]) {
        throw new Error(`Undefined profile: ${profile}`);
      }

      return (0, _stringArgv.default)(definitions[profile]);
    });
    return _lodash.default.flatten(argvs);
  }

}

exports.default = ProfileLoader;