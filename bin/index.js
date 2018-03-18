#!/usr/bin/env node
/**
 * 前端脚手架
 * author xuqinggang
 * @date 2018-02-21 12:11
 */
const program = require('commander');
const inquirer = require('inquirer');
const path = require('path')
const chalk = require('chalk');
const packageJson = require('../package.json');
const createApp = require('./createApp');

program
    .description(chalk.blue(`
        脚手架
        es6+webpack
        es6+webpack+react
        es6+webpack+react+redux
        `))
    .usage(`${chalk.green('create <project-directory>')} [options]`)
    .option('-v, --version', '版本号', () => { console.log(packageJson.version) });

program
    .command('create [project name]')
    .description('创建新项目')
    .action(async (projectName) => {
        if (!projectName) {
            const inputRt = await inquirer.prompt({
                type: 'input',
                message: '请输入项目名称',
                name: 'projectName',
            });
            if (inputRt.projectName) {
                createApp(inputRt.projectName);
            } else {
                program.outputHelp();
            }
        } else {
            createApp(projectName);
        }
    })

program.parse(process.argv);
