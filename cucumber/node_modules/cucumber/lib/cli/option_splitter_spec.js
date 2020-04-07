"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _option_splitter = _interopRequireDefault(require("./option_splitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('OptionSplitter', () => {
  const examples = [{
    description: "doesn't split when nothing to split on",
    input: '../custom/formatter',
    output: ['../custom/formatter']
  }, {
    description: 'splits relative unix paths',
    input: '../custom/formatter:../formatter/output.txt',
    output: ['../custom/formatter', '../formatter/output.txt']
  }, {
    description: 'splits absolute unix paths',
    input: '/custom/formatter:/formatter/output.txt',
    output: ['/custom/formatter', '/formatter/output.txt']
  }, {
    description: 'splits absolute windows paths',
    input: 'C:\\custom\\formatter:C:\\formatter\\output.txt',
    output: ['C:\\custom\\formatter', 'C:\\formatter\\output.txt']
  }, {
    description: 'does not split a single absolute windows paths',
    input: 'C:\\custom\\formatter',
    output: ['C:\\custom\\formatter']
  }];
  examples.forEach(({
    description: description,
    input: input,
    output: output
  }) => {
    (0, _mocha.it)(description, () => {
      (0, _chai.expect)(_option_splitter.default.split(input)).to.eql(output);
    });
  });
});