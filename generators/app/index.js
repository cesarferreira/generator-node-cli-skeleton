'use strict';
var Generator = require('yeoman-generator');
var kebabCase = require('lodash').kebabCase;

module.exports = Generator.extend({
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What do you want to name this module?',
      default: this.appname.replace(/\s/g, '-'),
      filter: x => kebabCase(x).toLowerCase()
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is the project description?'
    }];

    return this.prompt(prompts).then(
      (function (props) {
        // To access props later use this.props.someAnswer;
        this.props = props;
      }).bind(this)
    );
  },

  writing: function () {
    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    this.fs.copyTpl(
      `${this.templatePath()}/**`,
      this.destinationPath(),
      this.props
    );

    mv('_.eslintrc.json', '.eslintrc.json');
    mv('_.gitignore', '.gitignore');
    mv('_.travis.yml', '.travis.yml');
  },

  install: function () {
    this.spawnCommand('git', ['init']);

    const devPackages = ['eslint', 'xo'];
    this.yarnInstall(devPackages, {dev: true});

    const packages = ['chalk', 'meow', 'update-notifier'];
    this.yarnInstall(packages, {dev: false});
  }
});
