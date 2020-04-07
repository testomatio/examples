"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLocation = formatLocation;

function formatLocation(obj) {
  return `${obj.uri}:${obj.line}`;
}