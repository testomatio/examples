"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../formatter/helpers");

var _helpers2 = require("./helpers");

var _install_validator = require("./install_validator");

var I18n = _interopRequireWildcard(require("./i18n"));

var _configuration_builder = _interopRequireDefault(require("./configuration_builder"));

var _events = _interopRequireDefault(require("events"));

var _builder = _interopRequireDefault(require("../formatter/builder"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = _interopRequireDefault(require("path"));

var _pickle_filter = _interopRequireDefault(require("../pickle_filter"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _master = _interopRequireDefault(require("../runtime/parallel/master"));

var _runtime = _interopRequireDefault(require("../runtime"));

var _support_code_library_builder = _interopRequireDefault(require("../support_code_library_builder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Cli {
  constructor({
    argv: argv,
    cwd: cwd,
    stdout: stdout
  }) {
    this.argv = argv;
    this.cwd = cwd;
    this.stdout = stdout;
  }

  async getConfiguration() {
    const fullArgv = await (0, _helpers2.getExpandedArgv)({
      argv: this.argv,
      cwd: this.cwd
    });
    return _configuration_builder.default.build({
      argv: fullArgv,
      cwd: this.cwd
    });
  }

  async initializeFormatters({
    eventBroadcaster: eventBroadcaster,
    formatOptions: formatOptions,
    formats: formats,
    supportCodeLibrary: supportCodeLibrary
  }) {
    const streamsToClose = [];
    const eventDataCollector = new _helpers.EventDataCollector(eventBroadcaster);
    await _bluebird.default.map(formats, async ({
      type: type,
      outputTo: outputTo
    }) => {
      var _context;

      let stream = this.stdout;

      if (outputTo) {
        const fd = await _fs.default.open(_path.default.resolve(this.cwd, outputTo), 'w');
        stream = _fs.default.createWriteStream(null, {
          fd: fd
        });
        streamsToClose.push(stream);
      }

      const typeOptions = {
        eventBroadcaster: eventBroadcaster,
        eventDataCollector: eventDataCollector,
        log: (_context = stream).write.bind(_context),
        stream: stream,
        supportCodeLibrary: supportCodeLibrary,
        ...formatOptions
      };

      if (!Object.prototype.hasOwnProperty.call(formatOptions, 'colorsEnabled')) {
        typeOptions.colorsEnabled = !!stream.isTTY;
      }

      if (type === 'progress-bar' && !stream.isTTY) {
        console.warn(`Cannot use 'progress-bar' formatter for output to '${outputTo || 'stdout'}' as not a TTY. Switching to 'progress' formatter.`);
        type = 'progress';
      }

      return _builder.default.build(type, typeOptions);
    });
    return function () {
      return _bluebird.default.each(streamsToClose, stream => _bluebird.default.promisify(stream.end.bind(stream))());
    };
  }

  getSupportCodeLibrary({
    supportCodeRequiredModules: supportCodeRequiredModules,
    supportCodePaths: supportCodePaths
  }) {
    supportCodeRequiredModules.map(module => require(module));

    _support_code_library_builder.default.reset(this.cwd);

    supportCodePaths.forEach(codePath => require(codePath));
    return _support_code_library_builder.default.finalize();
  }

  async run() {
    await (0, _install_validator.validateInstall)(this.cwd);
    const configuration = await this.getConfiguration();

    if (configuration.listI18nLanguages) {
      this.stdout.write(I18n.getLanguages());
      return {
        success: true
      };
    }

    if (configuration.listI18nKeywordsFor) {
      this.stdout.write(I18n.getKeywords(configuration.listI18nKeywordsFor));
      return {
        success: true
      };
    }

    const supportCodeLibrary = this.getSupportCodeLibrary(configuration);
    const eventBroadcaster = new _events.default();
    const cleanup = await this.initializeFormatters({
      eventBroadcaster: eventBroadcaster,
      formatOptions: configuration.formatOptions,
      formats: configuration.formats,
      supportCodeLibrary: supportCodeLibrary
    });
    const testCases = await (0, _helpers2.getTestCasesFromFilesystem)({
      cwd: this.cwd,
      eventBroadcaster: eventBroadcaster,
      featureDefaultLanguage: configuration.featureDefaultLanguage,
      featurePaths: configuration.featurePaths,
      order: configuration.order,
      pickleFilter: new _pickle_filter.default(configuration.pickleFilterOptions)
    });
    let success;

    if (configuration.parallel) {
      const parallelRuntimeMaster = new _master.default({
        cwd: this.cwd,
        eventBroadcaster: eventBroadcaster,
        options: configuration.runtimeOptions,
        supportCodePaths: configuration.supportCodePaths,
        supportCodeRequiredModules: configuration.supportCodeRequiredModules,
        testCases: testCases
      });
      await new _bluebird.default(resolve => {
        parallelRuntimeMaster.run(configuration.parallel, s => {
          success = s;
          resolve();
        });
      });
    } else {
      const runtime = new _runtime.default({
        eventBroadcaster: eventBroadcaster,
        options: configuration.runtimeOptions,
        supportCodeLibrary: supportCodeLibrary,
        testCases: testCases
      });
      success = await runtime.start();
    }

    await cleanup();
    return {
      shouldExitImmediately: configuration.shouldExitImmediately,
      success: success
    };
  }

}

exports.default = Cli;