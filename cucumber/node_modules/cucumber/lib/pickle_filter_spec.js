"use strict";

var _mocha = require("mocha");

var _chai = require("chai");

var _pickle_filter = _interopRequireDefault(require("./pickle_filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('PickleFilter', () => {
  (0, _mocha.describe)('matches', () => {
    (0, _mocha.beforeEach)(function () {
      this.input = {
        pickle: {
          locations: [],
          name: '',
          tags: []
        },
        uri: ''
      };
    });
    (0, _mocha.describe)('no filters', () => {
      (0, _mocha.beforeEach)(function () {
        this.pickleFilter = new _pickle_filter.default({
          featurePaths: ['features'],
          names: [],
          tagExpression: ''
        });
      });
      (0, _mocha.it)('returns true', function () {
        (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
      });
    });
    (0, _mocha.describe)('line filters', () => {
      (0, _mocha.beforeEach)(function () {
        this.pickleFilter = new _pickle_filter.default({
          featurePaths: ['features/a.feature', 'features/b.feature:1:2'],
          names: [],
          tagExpression: ''
        });
      });
      (0, _mocha.describe)('scenario in feature without line specified', () => {
        (0, _mocha.beforeEach)(function () {
          this.input.uri = 'features/a.feature';
        });
        (0, _mocha.it)('returns true', function () {
          (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
        });
      });
      (0, _mocha.describe)('scenario in feature with line specified', () => {
        (0, _mocha.beforeEach)(function () {
          this.input.uri = 'features/b.feature';
        });
        (0, _mocha.describe)('scenario line matches', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.locations = [{
              line: 1
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario line does not match', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.locations = [{
              line: 3
            }];
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
      (0, _mocha.describe)('scenario line using current directory path representation', () => {
        (0, _mocha.beforeEach)(function () {
          this.input.uri = './features/b.feature';
        });
        (0, _mocha.describe)('scenario line matches', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.locations = [{
              line: 1
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario line does not match', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.locations = [{
              line: 3
            }];
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
    });
    (0, _mocha.describe)('name filters', () => {
      (0, _mocha.describe)('should match name A', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: ['nameA'],
            tagExpression: ''
          });
        });
        (0, _mocha.describe)('scenario name matches A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.name = 'nameA descriptionA';
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario name does not match A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.name = 'nameB descriptionB';
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
      (0, _mocha.describe)('should match name A or B', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: ['nameA', 'nameB'],
            tagExpression: ''
          });
        });
        (0, _mocha.describe)('scenario name matches A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.name = 'nameA descriptionA';
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario name matches B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.name = 'nameB descriptionB';
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario name does not match A or B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.name = 'nameC descriptionC';
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
    });
    (0, _mocha.describe)('tag filters', () => {
      (0, _mocha.describe)('should have tag A', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: [],
            tagExpression: '@tagA'
          });
        });
        (0, _mocha.describe)('scenario has tag A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario does not have tag A', () => {
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
      (0, _mocha.describe)('should not have tag A', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: [],
            tagExpression: 'not @tagA'
          });
        });
        (0, _mocha.describe)('scenario has tag A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }];
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
        (0, _mocha.describe)('scenario does not have tag A', () => {
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
      });
      (0, _mocha.describe)('should have tag A and B', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: [],
            tagExpression: '@tagA and @tagB'
          });
        });
        (0, _mocha.describe)('scenario has tag A and B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }, {
              name: '@tagB'
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario has tag A, but not B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }];
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
        (0, _mocha.describe)('scenario has tag B, but not A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagB'
            }];
          });
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
        (0, _mocha.describe)('scenario does have tag A or B', () => {
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
      (0, _mocha.describe)('should have tag A or B', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features'],
            names: [],
            tagExpression: '@tagA or @tagB'
          });
        });
        (0, _mocha.describe)('scenario has tag A and B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }, {
              name: '@tagB'
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario has tag A, but not B', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagA'
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario has tag B, but not A', () => {
          (0, _mocha.beforeEach)(function () {
            this.input.pickle.tags = [{
              name: '@tagB'
            }];
          });
          (0, _mocha.it)('returns true', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
          });
        });
        (0, _mocha.describe)('scenario does have tag A or B', () => {
          (0, _mocha.it)('returns false', function () {
            (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
          });
        });
      });
    });
    (0, _mocha.describe)('line, name, and tag filters', () => {
      (0, _mocha.beforeEach)(function () {
        this.input.uri = 'features/b.feature';
      });
      (0, _mocha.describe)('scenario matches all filters', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features/b.feature:1:2'],
            names: ['nameA'],
            tagExpression: '@tagA'
          });
          this.input.pickle.locations = [{
            line: 1
          }];
          this.input.pickle.name = 'nameA descriptionA';
          this.input.pickle.tags = [{
            name: '@tagA'
          }];
        });
        (0, _mocha.it)('returns true', function () {
          (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(true);
        });
      });
      (0, _mocha.describe)('scenario matches some filters', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features/b.feature:1:2'],
            names: ['nameA'],
            tagExpression: 'tagA'
          });
          this.input.pickle.locations = [{
            line: 1
          }];
        });
        (0, _mocha.it)('returns false', function () {
          (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
        });
      });
      (0, _mocha.describe)('scenario matches no filters', () => {
        (0, _mocha.beforeEach)(function () {
          this.pickleFilter = new _pickle_filter.default({
            featurePaths: ['features/b.feature:1:2'],
            names: ['nameA'],
            tagExpression: '@tagA'
          });
          this.input.pickle.locations = [{
            line: 1
          }];
        });
        (0, _mocha.it)('returns false', function () {
          (0, _chai.expect)(this.pickleFilter.matches(this.input)).to.eql(false);
        });
      });
    });
  });
});