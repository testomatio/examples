"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapDefinitions = wrapDefinitions;

var _lodash = _interopRequireDefault(require("lodash"));

var _utilArity = _interopRequireDefault(require("util-arity"));

var _isGenerator = _interopRequireDefault(require("is-generator"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapDefinitions({
  cwd: cwd,
  definitionFunctionWrapper: definitionFunctionWrapper,
  definitions: definitions
}) {
  if (definitionFunctionWrapper) {
    definitions.forEach(definition => {
      const codeLength = definition.code.length;
      const wrappedFn = definitionFunctionWrapper(definition.code, definition.options.wrapperOptions);

      if (wrappedFn !== definition.code) {
        definition.unwrappedCode = definition.code;
        definition.code = (0, _utilArity.default)(codeLength, wrappedFn);
      }
    });
  } else {
    const generatorDefinitions = _lodash.default.filter(definitions, definition => _isGenerator.default.fn(definition.code));

    if (generatorDefinitions.length > 0) {
      const references = generatorDefinitions.map(definition => `${_path.default.relative(cwd, definition.uri)}:${definition.line}`).join('\n  ');
      const message = `
        The following hook/step definitions use generator functions:

          ${references}

        Use 'this.setDefinitionFunctionWrapper(fn)' to wrap them in a function that returns a promise.
        `;
      throw new Error(message);
    }
  }
}