"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _slave = _interopRequireDefault(require("./slave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function run() {
  const slave = new _slave.default({
    id: process.env.CUCUMBER_SLAVE_ID,
    sendMessage: m => process.send(m),
    cwd: process.cwd(),
    exit: status => process.exit(status)
  });
  process.on('message', m => slave.receiveMessage(m));
}