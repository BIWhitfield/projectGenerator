#!/usr/bin/env node

const inquirer = require('inquirer');
const cmd = require('node-cmd');
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

const CURR_DIR = process.cwd();

clear();
console.log(chalk.yellow(figlet.textSync('PROJECT GENERATOR', { horizontalLayout: 'full' })));

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];

  if (files.directoryExists(`${CURR_DIR}/${projectName}`)) {
    console.log(chalk.red(`Already a folder called ${projectName}!`));
    process.exit();
  }

  const templatePath = `${__dirname}/templates/${projectChoice}`;

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  console.log(chalk.green('Creating project directory...'));
  createDirectoryContents(templatePath, projectName);

  console.log(chalk.green('NPM installing in new project directory'));
  cmd.run(`cd ${projectName} && npm i`);

  console.log(chalk.green('Opening VS Code'));
  cmd.run(`cd ${projectName} &&code .`);

  console.log(chalk.blue('HAPPY CODING!'));
});

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      if (file === '.npmignore') file = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}
