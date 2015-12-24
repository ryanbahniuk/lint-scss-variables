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
  var dependencyPath;

  context('when one variable path and one file path are given ', function() {
    context('when variables are unscoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'unscoped-one.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne
              }
            ],
            [filePathOne]
          );
        });
      });
    });

    context('when variables are scoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-one.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              }
            ],
            [filePathOne]
          );
        });
      });
    });

    context('when variables have dependencies', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-one.scss');
        dependencyPath = path.resolve(__dirname, 'fixtures', 'variables', 'dependency.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne]
          );
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
          lintScssVariables(
            [
              {
                path: variablePathOne
              },
              {
                path: variablePathTwo
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne
              },
              {
                path: variablePathTwo
              }
            ],
            [filePathOne]
          );
        });
      });
    });

    context('when variables have dependencies', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-two.scss');
        dependencyPath = path.resolve(__dirname, 'fixtures', 'variables', 'dependency.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              },
              {
                path: variablePathTwo,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              },
              {
                path: variablePathTwo,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne]
          );
        });
      });
    });

    context('when variables are scoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              },
              {
                path: variablePathTwo,
                scope: '%scope'
              }
            ],
            [incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              },
              {
                path: variablePathTwo,
                scope: '%scope'
              }
            ],
            [filePathOne]
          );
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
          lintScssVariables(
            [
              {
                path: variablePathTwo
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });
    });

    context('when variables are scoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-one-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathTwo,
                scope: '%scope'
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });
    });

    context('when variables have dependencies', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-one-two.scss');
        dependencyPath = path.resolve(__dirname, 'fixtures', 'variables', 'dependency.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathTwo,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne, filePathTwo]
          );
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
          lintScssVariables(
            [
              {
                path: variablePathOne
              },
              {
                path: variablePathTwo
              }
            ],
            [filePathOne, incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne
              },
              {
                path: variablePathTwo
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });
    });

    context('when variables are scoped', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'scoped-two.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'all-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              },
              {
                path: variablePathTwo,
                scope: '%scope'
              }
            ],
            [filePathOne, incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                scope: '%scope'
              },
              {
                path: variablePathTwo,
                scope: '%scope'
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });
    });

    context('when variables have dependencies', function() {
      beforeEach(function() {
        variablePathOne = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-one.scss');
        variablePathTwo = path.resolve(__dirname, 'fixtures', 'variables', 'has-dependents-two.scss');
        dependencyPath = path.resolve(__dirname, 'fixtures', 'variables', 'dependency.scss');
        filePathOne = path.resolve(__dirname, 'fixtures', 'files', 'all-one.scss');
        filePathTwo = path.resolve(__dirname, 'fixtures', 'files', 'all-two.scss');
        incompletePath = path.resolve(__dirname, 'fixtures', 'files', 'incomplete-one.scss');
      });

      it('throws when a defined variable is not being used', function() {
        assert.throws(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              },
              {
                path: variablePathTwo,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne, incompletePath]
          );
        });
      });

      it('does not throw when all defined variables are being used', function() {
        assert.doesNotThrow(function() {
          lintScssVariables(
            [
              {
                path: variablePathOne,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              },
              {
                path: variablePathTwo,
                dependencies: [
                  {
                    path: dependencyPath
                  }
                ]
              }
            ],
            [filePathOne, filePathTwo]
          );
        });
      });
    });
  });
});
