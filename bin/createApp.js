const spawn = require('cross-spawn');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fse = require('fs-extra');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

// const App类型
const APPTYPE_ES6_WEBPACK = 'es6_webpack';
const APPTYPE_ES6_WEBPACK_REACT = 'es6_webpack_react';
const APPTYPE_ES6_WEBPACK_REACT_REDUX = 'es6_webpack_react_redux';

// 模板源目录
let sourceDir = '';
// 生成项目目的目录
let distDir = '';

async function createApp(projectName) {
    // 选择App类型
    const appType =  await selectAppType();

    // 模板源目录
    sourceDir = path.resolve(__dirname, '../', 'templates', appType);
    // 生成项目的目录
    distDir = path.resolve('./', projectName);

    // 拷贝选中的模板到目的目录
    copyTemplageToProject();

    // 修改生成项目的package.json里的name字段
    modifyPackageJsonName(projectName);
    execDependencesInstall(projectName);
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
function execDependencesInstall(projectName) {
    const allPromiseArr = [];
    process.chdir(projectName);

    spawn('npm', ['install'], { stdio: 'inherit' });

    // const packageJSON = require(path.join(distDir, 'package.json'));
    // const devDependencies = packageJSON.devDependencies;
    // const dependencies = packageJSON.dependencies;
    // if (devDependencies) {
    //     for (let dependenceName in devDependencies) {
    //         allPromiseArr.push(execEachDependenceInstall(dependenceName, '--save-dev'));
    //     }
    // }

    // if (dependencies) {
    //     for (let dependenceName in dependencies) {
    //         allPromiseArr.push(execEachDependenceInstall(dependenceName, '--save'));
    //     }
    // }

    // Promise.all(allPromiseArr)
    //     .then(() => {
    //         // spinner.succeed('项目依赖安装成功');
    //     })
    //     .catch((errArr) => {
    //         errArr.forEach((errItem) => {
    //             console.log('errxxxxxxxxxx')
    //             console.log(errItem);
    //             // spinner.fail('项目安装依赖失败');
    //         })
    //     })
    // const child = spawn('npm', ['install'], { stdio: 'inherit' });
    // child.on('close', code => {

    //     if (code !== 0) {
    //          console.log('Aborting installation.');
    //         reject({
    //             command: `${command} ${args.join(' ')}`,
    //         });
    //         return;
    //     }

    // });
}

// 模板目录直接拷贝到项目目录
function copyTemplageToProject() {
    const spinner = ora('拷贝项目模板').start();
    fse.copySync(sourceDir, distDir);
    spinner.succeed('模板拷贝结束');
}

// 修改项目里package.json的name属性
function modifyPackageJsonName(projectName) {
    let packageJsonStr = fs.readFileSync(path.join(distDir, 'package.json'), 'utf-8');
    packageJsonStr = packageJsonStr.replace(/{{projectName}}/g, projectName);
    fs.writeFileSync(path.join(distDir, 'package.json'), packageJsonStr);
}

// 单独执行每一个依赖安装
function execEachDependenceInstall(dependenceName, installEnv) {
    return new Promise((resolve, reject) => {
        console.log(chalk.green(`npm install ${dependenceName} ${installEnv}`));
        const child = spawn('npm', ['install', installEnv, dependenceName], { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
                let errmsg = chalk.red(`npm install ${dependenceName} has failed.`);
                console.log(errmsg);
                reject(errmsg);

                return;
            }

            let succmsg = chalk.green(`npm install ${dependenceName} has success.`);
            console.log(succmsg);
            resolve(succmsg);
        });
    })
}

module.exports = createApp;
