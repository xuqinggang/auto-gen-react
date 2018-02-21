const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

// const 项目类型
const APPTYPE_ES6_WEBPACK = 'es6_webpack';
const APPTYPE_ES6_WEBPACK_REACT = 'es6_webpack_react';
const APPTYPE_ES6_WEBPACK_REACT_REDUX = 'es6_webpack_react_redux';

// 模板源目录
let sourceDir = '';
// 生成项目目录
let genDir = '';

async function createApp(projectName) {
    const appType =  await selectAppType();
    // 模板源目录
    sourceDir = path.resolve(__dirname, '../', 'templates', appType);
    // 生成项目的目录
    genDir = path.resolve('./', projectName);

    copyTemplageToProject();
    modifyPackageJsonName(projectName);
    execInstallDependences(projectName);
}

// 选择模板类型
async function selectAppType() {
    const selectRt = await inquirer.prompt({
        type: 'list',
        message: '项目类型',
        choices: [
            APPTYPE_ES6_WEBPACK,
            APPTYPE_ES6_WEBPACK_REACT,
            APPTYPE_ES6_WEBPACK_REACT_REDUX,
        ],
        name: 'type',
    });

    return selectRt.type;
}

// 执行package.json依赖安装
function execInstallDependences(projectName) {
    process.chdir(projectName);
    spawn('npm', ['install']);
}

// 模板目录直接拷贝到项目目录
function copyTemplageToProject() {
    fse.copySync(sourceDir, genDir);
}

// 修改项目里package.json的name属性
function modifyPackageJsonName(projectName) {
    let packageJsonStr = fs.readFileSync(path.join(genDir, 'package.json'), 'utf-8');
    packageJsonStr = packageJsonStr.replace(/{{projectName}}/g, projectName);
    fs.writeFileSync(path.join(genDir, 'package.json'), packageJsonStr);
}

module.exports = createApp;
