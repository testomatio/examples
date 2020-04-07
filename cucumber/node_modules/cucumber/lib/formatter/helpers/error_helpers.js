"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = formatError;

var _assertionErrorFormatter = require("assertion-error-formatter");

function formatError(error, colorFns) {
  return (0, _assertionErrorFormatter.format)(error, {
    colorFns: colorFns
  });
}