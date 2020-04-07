"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class UncaughtExceptionManager {
  static registerHandler(handler) {
    if (typeof window === 'undefined') {
      process.addListener('uncaughtException', handler);
    } else {
      window.onerror = handler;
    }
  }

  static unregisterHandler(handler) {
    if (typeof window === 'undefined') {
      process.removeListener('uncaughtException', handler);
    } else {
      window.onerror = undefined;
    }
  }

}

exports.default = UncaughtExceptionManager;