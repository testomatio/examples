"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _data_table = _interopRequireDefault(require("./data_table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('DataTable', () => {
  (0, _mocha.describe)('table with headers', () => {
    (0, _mocha.beforeEach)(function () {
      this.dataTable = new _data_table.default({
        rows: [{
          cells: [{
            value: 'header 1'
          }, {
            value: 'header 2'
          }]
        }, {
          cells: [{
            value: 'row 1 col 1'
          }, {
            value: 'row 1 col 2'
          }]
        }, {
          cells: [{
            value: 'row 2 col 1'
          }, {
            value: 'row 2 col 2'
          }]
        }]
      });
    });
    (0, _mocha.describe)('rows', () => {
      (0, _mocha.it)('returns a 2-D array without the header', function () {
        (0, _chai.expect)(this.dataTable.rows()).to.eql([['row 1 col 1', 'row 1 col 2'], ['row 2 col 1', 'row 2 col 2']]);
      });
    });
    (0, _mocha.describe)('hashes', () => {
      (0, _mocha.it)('returns an array of object where the keys are the headers', function () {
        (0, _chai.expect)(this.dataTable.hashes()).to.eql([{
          'header 1': 'row 1 col 1',
          'header 2': 'row 1 col 2'
        }, {
          'header 1': 'row 2 col 1',
          'header 2': 'row 2 col 2'
        }]);
      });
    });
  });
  (0, _mocha.describe)('table without headers', () => {
    (0, _mocha.beforeEach)(function () {
      this.dataTable = new _data_table.default({
        rows: [{
          cells: [{
            value: 'row 1 col 1'
          }, {
            value: 'row 1 col 2'
          }]
        }, {
          cells: [{
            value: 'row 2 col 1'
          }, {
            value: 'row 2 col 2'
          }]
        }]
      });
    });
    (0, _mocha.describe)('raw', () => {
      (0, _mocha.it)('returns a 2-D array', function () {
        (0, _chai.expect)(this.dataTable.raw()).to.eql([['row 1 col 1', 'row 1 col 2'], ['row 2 col 1', 'row 2 col 2']]);
      });
    });
    (0, _mocha.describe)('rowsHash', () => {
      (0, _mocha.it)('returns an object where the keys are the first column', function () {
        (0, _chai.expect)(this.dataTable.rowsHash()).to.eql({
          'row 1 col 1': 'row 1 col 2',
          'row 2 col 1': 'row 2 col 2'
        });
      });
    });
  });
});