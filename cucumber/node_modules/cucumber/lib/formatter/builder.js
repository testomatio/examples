"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event_protocol_formatter = _interopRequireDefault(require("./event_protocol_formatter"));

var _get_color_fns = _interopRequireDefault(require("./get_color_fns"));

var _javascript_snippet_syntax = _interopRequireDefault(require("./step_definition_snippet_builder/javascript_snippet_syntax"));

var _json_formatter = _interopRequireDefault(require("./json_formatter"));

var _path = _interopRequireDefault(require("path"));

var _progress_bar_formatter = _interopRequireDefault(require("./progress_bar_formatter"));

var _progress_formatter = _interopRequireDefault(require("./progress_formatter"));

var _rerun_formatter = _interopRequireDefault(require("./rerun_formatter"));

var _snippets_formatter = _interopRequireDefault(require("./snippets_formatter"));

var _step_definition_snippet_builder = _interopRequireDefault(require("./step_definition_snippet_builder"));

var _summary_formatter = _interopRequireDefault(require("./summary_formatter"));

var _usage_formatter = _interopRequireDefault(require("./usage_formatter"));

var _usage_json_formatter = _interopRequireDefault(require("./usage_json_formatter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormatterBuilder {
  static build(type, options) {
    const Formatter = FormatterBuilder.getConstructorByType(type, options);
    const extendedOptions = {
      colorFns: (0, _get_color_fns.default)(options.colorsEnabled),
      snippetBuilder: FormatterBuilder.getStepDefinitionSnippetBuilder(options),
      ...options
    };
    return new Formatter(extendedOptions);
  }

  static getConstructorByType(type, options) {
    switch (type) {
      case 'event-protocol':
        return _event_protocol_formatter.default;

      case 'json':
        return _json_formatter.default;

      case 'progress':
        return _progress_formatter.default;

      case 'progress-bar':
        return _progress_bar_formatter.default;

      case 'rerun':
        return _rerun_formatter.default;

      case 'snippets':
        return _snippets_formatter.default;

      case 'summary':
        return _summary_formatter.default;

      case 'usage':
        return _usage_formatter.default;

      case 'usage-json':
        return _usage_json_formatter.default;

      default:
        return FormatterBuilder.loadCustomFormatter(type, options);
    }
  }

  static getStepDefinitionSnippetBuilder({
    cwd: cwd,
    snippetInterface: snippetInterface,
    snippetSyntax: snippetSyntax,
    supportCodeLibrary: supportCodeLibrary
  }) {
    if (!snippetInterface) {
      snippetInterface = 'synchronous';
    }

    let Syntax = _javascript_snippet_syntax.default;

    if (snippetSyntax) {
      const fullSyntaxPath = _path.default.resolve(cwd, snippetSyntax);

      Syntax = require(fullSyntaxPath);
    }

    return new _step_definition_snippet_builder.default({
      snippetSyntax: new Syntax(snippetInterface),
      parameterTypeRegistry: supportCodeLibrary.parameterTypeRegistry
    });
  }

  static loadCustomFormatter(customFormatterPath, {
    cwd: cwd
  }) {
    const fullCustomFormatterPath = _path.default.resolve(cwd, customFormatterPath);

    const CustomFormatter = require(fullCustomFormatterPath);

    if (typeof CustomFormatter === 'function') {
      return CustomFormatter;
    } else if (CustomFormatter && typeof CustomFormatter.default === 'function') {
      return CustomFormatter.default;
    }

    throw new Error(`Custom formatter (${customFormatterPath}) does not export a function`);
  }

}

exports.default = FormatterBuilder;