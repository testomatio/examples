"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _keyword_type = _interopRequireWildcard(require("./keyword_type"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

(0, _mocha.describe)('KeywordType', () => {
  (0, _mocha.describe)('constants', () => {
    (0, _mocha.it)('exposes the proper constants', () => {
      (0, _chai.expect)(_keyword_type.default).to.include.keys(['EVENT', 'OUTCOME', 'PRECONDITION']);
    });
  });
  (0, _mocha.describe)('getStepKeywordType()', () => {
    (0, _mocha.describe)('keyword is Given', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'Given ',
          language: 'en'
        });
      });
      (0, _mocha.it)('returns precondition', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.PRECONDITION);
      });
    });
    (0, _mocha.describe)('keyword is When', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'When ',
          language: 'en'
        });
      });
      (0, _mocha.it)('returns event', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.EVENT);
      });
    });
    (0, _mocha.describe)('keyword is Then', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'Then ',
          language: 'en'
        });
      });
      (0, _mocha.it)('returns outcome', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.OUTCOME);
      });
    });
    (0, _mocha.describe)('keyword is And, no previous step', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'And ',
          language: 'en'
        });
      });
      (0, _mocha.it)('returns precondition', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.PRECONDITION);
      });
    });
    (0, _mocha.describe)('keyword is And, previous keyword type is event', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'And ',
          language: 'en',
          previousKeywordType: _keyword_type.default.EVENT
        });
      });
      (0, _mocha.it)('returns event', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.EVENT);
      });
    });
    (0, _mocha.describe)('keyword is But, no previous step', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'But ',
          language: 'en'
        });
      });
      (0, _mocha.it)('returns precondition', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.PRECONDITION);
      });
    });
    (0, _mocha.describe)('keyword is But, previous keyword type is outcome', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          keyword: 'But ',
          language: 'en',
          previousKeywordType: _keyword_type.default.OUTCOME
        });
      });
      (0, _mocha.it)('returns outcome', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.OUTCOME);
      });
    });
    (0, _mocha.describe)('keyword is unknown', () => {
      (0, _mocha.beforeEach)(function () {
        this.keywordType = (0, _keyword_type.getStepKeywordType)({
          index: 0,
          language: 'en',
          stepKeywords: ['other ']
        });
      });
      (0, _mocha.it)('returns precondition', function () {
        (0, _chai.expect)(this.keywordType).to.eql(_keyword_type.default.PRECONDITION);
      });
    });
  });
});