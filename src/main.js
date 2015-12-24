'use strict';

var fs = require('fs');
var assert = require('chai').assert;
var scssToJson = require('scss-to-json');
var assign = require('object-assign');

function getDefinedVariables(variableFiles) {
  var variables = {};

  variableFiles.forEach(function(variableFile) {
    var parsed = scssToJson(variableFile.src, {
      scope: variableFile.scope,
      dependencies: variableFile.dependencies
    });
    variables = assign(variables, parsed);
  });

  return Object.keys(variables);
}

function getFileContents(scssFiles) {
  var fileContents = '';

  scssFiles.forEach(function(scssFile) {
    fileContents += fs.readFileSync(scssFile);
  });

  return fileContents;
}

function getUsedVariables(fileContents) {
  return fileContents.match(/(\$\w+)/g);
}

function LintScssVariables(variableFiles, scssFiles) {
  var definedVariables = getDefinedVariables(variableFiles);
  var fileContents = getFileContents(scssFiles);
  var usedVariables = getUsedVariables(fileContents);

  definedVariables.forEach(function(definedVariable) {
    var message = 'The variable ' + definedVariable + ' is defined but not used.';
    assert.isTrue(usedVariables.indexOf(definedVariable) > -1, message);
  });
}

module.exports = LintScssVariables;
