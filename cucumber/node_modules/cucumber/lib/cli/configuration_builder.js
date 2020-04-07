"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _argv_parser = _interopRequireDefault(require("./argv_parser"));

var _fs = _interopRequireDefault(require("mz/fs"));

var _path = _interopRequireDefault(require("path"));

var _option_splitter = _interopRequireDefault(require("./option_splitter"));

var _bluebird = _interopRequireWildcard(require("bluebird"));

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const globP = (0, _bluebird.promisify)(_glob.default);

class ConfigurationBuilder {
  static async build(options) {
    const builder = new ConfigurationBuilder(options);
    return builder.build();
  }

  constructor({
    argv: argv,
    cwd: cwd
  }) {
    this.cwd = cwd;

    const parsedArgv = _argv_parser.default.parse(argv);

    this.args = parsedArgv.args;
    this.options = parsedArgv.options;
  }

  async build() {
    const listI18nKeywordsFor = this.options.i18nKeywords;
    const listI18nLanguages = !!this.options.i18nLanguages;
    const unexpandedFeaturePaths = await this.getUnexpandedFeaturePaths();
    let featurePaths = [];
    let supportCodePaths = [];

    if (!listI18nKeywordsFor && !listI18nLanguages) {
      featurePaths = await this.expandFeaturePaths(unexpandedFeaturePaths);
      let unexpandedSupportCodePaths = this.options.require;

      if (unexpandedSupportCodePaths.length === 0) {
        unexpandedSupportCodePaths = this.getFeatureDirectoryPaths(featurePaths);
      }

      supportCodePaths = await this.expandPaths(unexpandedSupportCodePaths, '.js');
    }

    return {
      featureDefaultLanguage: this.options.language,
      featurePaths: featurePaths,
      formats: this.getFormats(),
      formatOptions: this.getFormatOptions(),
      listI18nKeywordsFor: listI18nKeywordsFor,
      listI18nLanguages: listI18nLanguages,
      order: this.options.order,
      parallel: this.options.parallel,
      profiles: this.options.profile,
      pickleFilterOptions: {
        featurePaths: unexpandedFeaturePaths,
        names: this.options.name,
        tagExpression: this.options.tags
      },
      runtimeOptions: {
        dryRun: !!this.options.dryRun,
        failFast: !!this.options.failFast,
        filterStacktraces: !this.options.backtrace,
        retry: this.options.retry,
        retryTagFilter: this.options.retryTagFilter,
        strict: !!this.options.strict,
        worldParameters: this.options.worldParameters
      },
      shouldExitImmediately: !!this.options.exit,
      supportCodePaths: supportCodePaths,
      supportCodeRequiredModules: this.options.requireModule
    };
  }

  async expandPaths(unexpandedPaths, defaultExtension) {
    const expandedPaths = await _bluebird.default.map(unexpandedPaths, async unexpandedPath => {
      const matches = await globP(unexpandedPath, {
        absolute: true,
        cwd: this.cwd
      });
      return _bluebird.default.map(matches, async match => {
        if (_path.default.extname(match) === '') {
          return globP(`${match}/**/*${defaultExtension}`);
        }

        return match;
      });
    });
    return _lodash.default.flattenDepth(expandedPaths, 2).map(x => _path.default.normalize(x));
  }

  async expandFeaturePaths(featurePaths) {
    featurePaths = featurePaths.map(p => p.replace(/(:\d+)*$/g, '')); // Strip line numbers

    return this.expandPaths(featurePaths, '.feature');
  }

  getFeatureDirectoryPaths(featurePaths) {
    const featureDirs = featurePaths.map(featurePath => {
      let featureDir = _path.default.dirname(featurePath);

      let childDir;
      let parentDir = featureDir;

      while (childDir !== parentDir) {
        childDir = parentDir;
        parentDir = _path.default.dirname(childDir);

        if (_path.default.basename(parentDir) === 'features') {
          featureDir = parentDir;
          break;
        }
      }

      return _path.default.relative(this.cwd, featureDir);
    });
    return _lodash.default.uniq(featureDirs);
  }

  getFormatOptions() {
    return _lodash.default.assign({}, this.options.formatOptions, {
      cwd: this.cwd
    });
  }

  getFormats() {
    const mapping = {
      '': 'progress'
    };
    this.options.format.forEach(format => {
      const [type, outputTo] = _option_splitter.default.split(format);

      mapping[outputTo || ''] = type;
    });
    return _lodash.default.map(mapping, (type, outputTo) => ({
      outputTo: outputTo,
      type: type
    }));
  }

  async getUnexpandedFeaturePaths() {
    if (this.args.length > 0) {
      const nestedFeaturePaths = await _bluebird.default.map(this.args, async arg => {
        const filename = _path.default.basename(arg);

        if (filename[0] === '@') {
          const filePath = _path.default.join(this.cwd, arg);

          const content = await _fs.default.readFile(filePath, 'utf8');
          return _lodash.default.chain(content).split('\n').map(_lodash.default.trim).compact().value();
        }

        return arg;
      });

      const featurePaths = _lodash.default.flatten(nestedFeaturePaths);

      if (featurePaths.length > 0) {
        return featurePaths;
      }
    }

    return ['features/**/*.feature'];
  }

}

exports.default = ConfigurationBuilder;