[![Build Status](https://travis-ci.org/ryanbahniuk/lint-scss-variables.svg?branch=master)](https://travis-ci.org/ryanbahniuk/lint-scss-variables)

# lint-scss-variables

> A utility for linting the use of SCSS variables.

This package takes paths to your variable files and the rest of your repository and checks to see if any defined variables are unused. It will throw an error in this case and print out the variable name. Under the hood, this package uses the [scss-to-json](https://www.npmjs.com/package/scss-to-json "scss-to-json") package to parse SCSS variables.

This package takes raw arrays of file paths in order to allow maximum freedom to integrate it into your build process. If you have a Grunt workflow and want to pass in globs, you can use the associated [grunt package](https://www.npmjs.com/package/grunt-lint-scss-variables "grunt-lint-scss-variables").

## Installation

Install via npm:

 ```sh
npm install lint-scss-variables
 ```

## Input and Output

This package returns a function that takes two arguments: an array of variable file objects and an array of file paths to check for use of those variables. The format for the objects in the variables array is determined by the [scss-to-json](https://www.npmjs.com/package/scss-to-json "scss-to-json") package. Check out the instructions on that package for details.

```js
var path = require('path');
var lintScssVariables = require('lint-scss-variables');
var variablePath = path.resolve(__dirname, 'variables.scss');
var filePath = path.resolve(__dirname, 'main.scss');

lintScssVariables(
  [
    {
      path: variablePath
      scope: '%scope' \\ optional
      dependencies: [] \\ optional
    }
  ],
  [
    filePath
  ]
)
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it. Continuous Integration is handled by [Travis](https://travis-ci.org/ryanbahniuk/lint-scss-variables "Travis").

## License

MIT © Ryan Bahniuk

[ci]:      https://travis-ci.org/ryanbahniuk/lint-scss-variables
[npm]:     https://www.npmjs.com/package/lint-scss-variables
