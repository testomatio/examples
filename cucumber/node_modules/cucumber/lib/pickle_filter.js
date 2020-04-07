"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _cucumberTagExpressions = _interopRequireDefault(require("cucumber-tag-expressions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FEATURE_LINENUM_REGEXP = /^(.*?)((?::[\d]+)+)?$/;

class PickleFilter {
  constructor({
    featurePaths: featurePaths,
    names: names,
    tagExpression: tagExpression
  }) {
    this.featureUriToLinesMapping = this.getFeatureUriToLinesMapping(featurePaths || []);
    this.names = names || [];

    if (tagExpression) {
      this.tagExpressionNode = (0, _cucumberTagExpressions.default)(tagExpression || '');
    }
  }

  getFeatureUriToLinesMapping(featurePaths) {
    const mapping = {};
    featurePaths.forEach(featurePath => {
      const match = FEATURE_LINENUM_REGEXP.exec(featurePath);

      if (match) {
        const uri = _path.default.resolve(match[1]);

        const linesExpression = match[2];

        if (linesExpression) {
          if (!mapping[uri]) {
            mapping[uri] = [];
          }

          linesExpression.slice(1).split(':').forEach(line => {
            mapping[uri].push(parseInt(line));
          });
        }
      }
    });
    return mapping;
  }

  matches({
    pickle: pickle,
    uri: uri
  }) {
    return this.matchesAnyLine({
      pickle: pickle,
      uri: uri
    }) && this.matchesAnyName(pickle) && this.matchesAllTagExpressions(pickle);
  }

  matchesAnyLine({
    pickle: pickle,
    uri: uri
  }) {
    const lines = this.featureUriToLinesMapping[_path.default.resolve(uri)];

    if (lines) {
      return _lodash.default.size(_lodash.default.intersection(lines, _lodash.default.map(pickle.locations, 'line'))) > 0;
    }

    return true;
  }

  matchesAnyName(pickle) {
    if (this.names.length === 0) {
      return true;
    }

    return _lodash.default.some(this.names, name => pickle.name.match(name));
  }

  matchesAllTagExpressions(pickle) {
    if (!this.tagExpressionNode) {
      return true;
    }

    return this.tagExpressionNode.evaluate(_lodash.default.map(pickle.tags, 'name'));
  }

}

exports.default = PickleFilter;