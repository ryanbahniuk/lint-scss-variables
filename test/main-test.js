'use strict';

var path = require('path');
var assert = require('chai').assert;
var lintScssVariables = require('../src/main');

describe('LintScssVariables', function() {
  var variablePathOne;
  var variablePathTwo;
  var filePathOne;
  var filePathTwo;
  var incompletePath;

  context('when one variable path and one file path are given ', function() {
    context('when variables are unscoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables([variablePathOne], [incompletePath]);
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables([variablePathOne], [filePathOne]);
        });
      });
    });
  });

  context('when multiple variable paths and one file path are given', function() {
    context('when variables are unscoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables([variablePathOne, variablePathTwo], [incompletePath]);
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables([variablePathOne, variablePathTwo], [filePathOne]);
        });
      });
    });
  });

  context('when one variable path and multiple file paths are given', function() {
    context('when variables are unscoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables([variablePathTwo], [filePathOne, filePathTwo]);
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables([variablePathOne], [filePathOne, filePathTwo]);
        });
      });
    });
  });

  context('when multiple variable paths and multiple file paths are given', function() {
    context('when variables are unscoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'all-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables([variablePathOne, variablePathTwo], [filePathOne, incompletePath]);
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables([variablePathOne, variablePathTwo], [filePathOne, filePathTwo]);
        });
      });
    });
  });
});
