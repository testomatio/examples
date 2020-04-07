"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isStream = _interopRequireDefault(require("is-stream"));

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AttachmentManager {
  constructor(onAttachment) {
    this.onAttachment = onAttachment;
  }

  create(data, mediaType, callback) {
    if (Buffer.isBuffer(data)) {
      if (!mediaType) {
        throw Error('Buffer attachments must specify a media type');
      }

      this.createBufferAttachment(data, mediaType);
    } else if (_isStream.default.readable(data)) {
      if (!mediaType) {
        throw Error('Stream attachments must specify a media type');
      }

      return this.createStreamAttachment(data, mediaType, callback);
    } else if (typeof data === 'string') {
      if (!mediaType) {
        mediaType = 'text/plain';
      }

      this.createStringAttachment(data, {
        type: mediaType
      });
    } else {
      throw Error('Invalid attachment data: must be a buffer, readable stream, or string');
    }
  }

  createBufferAttachment(data, mediaType) {
    this.createStringAttachment(data.toString('base64'), {
      encoding: 'base64',
      type: mediaType
    });
  }

  createStreamAttachment(data, mediaType, callback) {
    const promise = new _bluebird.default((resolve, reject) => {
      const buffers = [];
      data.on('data', chunk => {
        buffers.push(chunk);
      });
      data.on('end', () => {
        this.createBufferAttachment(Buffer.concat(buffers), mediaType);
        resolve();
      });
      data.on('error', reject);
    });

    if (callback) {
      promise.then(callback, callback);
    } else {
      return promise;
    }
  }

  createStringAttachment(data, media) {
    this.onAttachment({
      data: data,
      media: media
    });
  }

}

exports.default = AttachmentManager;