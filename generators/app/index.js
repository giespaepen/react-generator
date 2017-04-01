'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('react') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Please provide a title for your website',
        default: 'My Site'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // Copy the package and set it up
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        title: this.props.title.toLowerCase().split(' ').join('_')
      }
    );

    // Copy the readme
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        title: this.props.title
      }
    );

    // Copy the other config files
    var otherConfigFiles = [
      '__tslint.json',
      '__yarn.lock',
      '_babelrc',
      '_gitignore'
    ];

    for (var i = 0; i < otherConfigFiles.length; i++) {
      var configFile = otherConfigFiles[i];
      this.fs.copy(
        this.templatePath(configFile),
        this.destinationPath(configFile.replace(/_/g, '.').replace(/\.\./g, ''))
      );
    }

    // Now we copy the vscode settings
    this.fs.copy(
      this.templatePath('_vscode/*.*'),
      this.destinationPath('.vscode')
    );

    // Then copy the rest of the source
    this.fs.copy(
      this.templatePath('src/**/*.*'),
      this.destinationPath('src')
    );
  },

  install: function () {
    // Install yarn
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });

    // Install yarn
    this.spawnCommandSync('yarn', ['install']);

    // Initialize the repository
    this.spawnCommandSync('git', ['init']);

    // Compile the server
    this.spawnCommandSync('tsc', [], {cwd: 'src/server'});
  }
});
