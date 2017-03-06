'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var testTitle = 'someTitle';

describe('generator-contentful-react:app', function (done) {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        title: testTitle
      })
      .toPromise();
  });

  it('creates config files', function () {
    assert.file([
      'tslint.json',
      'yarn.lock',
      '.babelrc',
      '.gitignore',
      'package.json',
      'README.md'
    ]);
  });

  done();
});
