"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFileNameInCucumber = isFileNameInCucumber;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _stackChain = _interopRequireDefault(require("stack-chain"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const projectRootPath = _path.default.join(__dirname, '..');

const projectChildDirs = ['src', 'lib', 'node_modules'];

function isFileNameInCucumber(fileName) {
  return _lodash.default.some(projectChildDirs, dir => _lodash.default.startsWith(fileName, _path.default.join(projectRootPath, dir)));
}

class StackTraceFilter {
  filter() {
    this.currentFilter = _stackChain.default.filter.attach((_err, frames) => {
      if (this.isErrorInCucumber(frames)) {
        return frames;
      }

      const index = _lodash.default.findIndex(frames, this.isFrameInCucumber.bind(this));

      if (index === -1) {
        return frames;
      }

      return frames.slice(0, index);
    });
  }

  isErrorInCucumber(frames) {
    const filteredFrames = _lodash.default.reject(frames, this.isFrameInNode.bind(this));

    return filteredFrames.length > 0 && this.isFrameInCucumber(filteredFrames[0]);
  }

  isFrameInCucumber(frame) {
    const fileName = frame.getFileName() || '';
    return isFileNameInCucumber(fileName);
  }

  isFrameInNode(frame) {
    const fileName = frame.getFileName() || '';
    return !_lodash.default.includes(fileName, _path.default.sep);
  }

  unfilter() {
    _stackChain.default.filter.deattach(this.currentFilter);
  }

}

exports.default = StackTraceFilter;