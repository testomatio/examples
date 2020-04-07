"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("./"));

var _stream = _interopRequireDefault(require("stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('AttachmentManager', () => {
  (0, _mocha.describe)('create()', () => {
    (0, _mocha.beforeEach)(function () {
      this.onAttachment = _sinon.default.stub();
      this.attachmentManager = new _.default(this.onAttachment);
    });
    (0, _mocha.describe)('buffer', () => {
      (0, _mocha.describe)('with mime type', () => {
        (0, _mocha.beforeEach)(function () {
          this.attachmentManager.create(Buffer.from('my string'), 'text/special');
        });
        (0, _mocha.it)('adds the data and media', function () {
          (0, _chai.expect)(this.onAttachment).to.have.callCount(1);
          const attachment = this.onAttachment.firstCall.args[0];
          const encodedData = attachment.data;
          (0, _chai.expect)(encodedData).to.eql('bXkgc3RyaW5n');
          const decodedData = Buffer.from(encodedData, 'base64').toString();
          (0, _chai.expect)(decodedData).to.eql('my string');
          (0, _chai.expect)(attachment.media).to.eql({
            encoding: 'base64',
            type: 'text/special'
          });
        });
      });
      (0, _mocha.describe)('without media type', () => {
        (0, _mocha.it)('throws', function () {
          (0, _chai.expect)(() => {
            this.attachmentManager.create(Buffer.from('my string'));
          }).to.throw('Buffer attachments must specify a media type');
        });
      });
    });
    (0, _mocha.describe)('readable stream', () => {
      (0, _mocha.describe)('with mime type', () => {
        (0, _mocha.describe)('with callback', () => {
          (0, _mocha.beforeEach)(function (done) {
            const readableStream = new _stream.default.PassThrough();
            this.result = this.attachmentManager.create(readableStream, 'text/special', done);
            setTimeout(() => {
              readableStream.write('my string');
              readableStream.end();
            }, 25);
          });
          (0, _mocha.it)('does not return a promise', function () {
            (0, _chai.expect)(this.result).to.eql(undefined);
          });
          (0, _mocha.it)('adds the data and media', function () {
            (0, _chai.expect)(this.onAttachment).to.have.callCount(1);
            const attachment = this.onAttachment.firstCall.args[0];
            const encodedData = attachment.data;
            (0, _chai.expect)(encodedData).to.eql('bXkgc3RyaW5n');
            const decodedData = Buffer.from(encodedData, 'base64').toString();
            (0, _chai.expect)(decodedData).to.eql('my string');
            (0, _chai.expect)(attachment.media).to.eql({
              encoding: 'base64',
              type: 'text/special'
            });
          });
        });
        (0, _mocha.describe)('without callback', () => {
          (0, _mocha.beforeEach)(function () {
            const readableStream = new _stream.default.PassThrough();
            this.result = this.attachmentManager.create(readableStream, 'text/special');
            setTimeout(() => {
              readableStream.write('my string');
              readableStream.end();
            }, 25);
            return this.result;
          });
          (0, _mocha.it)('returns a promise', function () {
            (0, _chai.expect)(this.result.then).to.be.a('function');
          });
          (0, _mocha.it)('adds the data and media', function () {
            (0, _chai.expect)(this.onAttachment).to.have.callCount(1);
            const attachment = this.onAttachment.firstCall.args[0];
            const encodedData = attachment.data;
            (0, _chai.expect)(encodedData).to.eql('bXkgc3RyaW5n');
            const decodedData = Buffer.from(encodedData, 'base64').toString();
            (0, _chai.expect)(decodedData).to.eql('my string');
            (0, _chai.expect)(attachment.media).to.eql({
              encoding: 'base64',
              type: 'text/special'
            });
          });
        });
      });
      (0, _mocha.describe)('without media type', () => {
        (0, _mocha.it)('throws', function () {
          (0, _chai.expect)(() => {
            const readableStream = new _stream.default.PassThrough();
            this.attachmentManager.create(readableStream);
          }).to.throw('Stream attachments must specify a media type');
        });
      });
    });
    (0, _mocha.describe)('string', () => {
      (0, _mocha.describe)('with media type', () => {
        (0, _mocha.beforeEach)(function () {
          this.attachmentManager.create('my string', 'text/special');
        });
        (0, _mocha.it)('adds the data and media', function () {
          (0, _chai.expect)(this.onAttachment).to.have.callCount(1);
          const attachment = this.onAttachment.firstCall.args[0];
          (0, _chai.expect)(attachment.data).to.eql('my string');
          (0, _chai.expect)(attachment.media).to.eql({
            type: 'text/special'
          });
        });
      });
      (0, _mocha.describe)('without mime type', () => {
        (0, _mocha.beforeEach)(function () {
          this.attachmentManager.create('my string');
        });
        (0, _mocha.it)('adds the data with the default mime type', function () {
          (0, _chai.expect)(this.onAttachment).to.have.callCount(1);
          const attachment = this.onAttachment.firstCall.args[0];
          (0, _chai.expect)(attachment.data).to.eql('my string');
          (0, _chai.expect)(attachment.media).to.eql({
            type: 'text/plain'
          });
        });
      });
    });
    (0, _mocha.describe)('unsupported data type', () => {
      (0, _mocha.it)('throws', function () {
        (0, _chai.expect)(() => {
          this.attachmentManager.create({}, 'object/special');
        }).to.throw('Invalid attachment data: must be a buffer, readable stream, or string');
      });
    });
  });
});