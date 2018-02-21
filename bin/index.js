/**
 * 前端脚手架
 * author xuqinggang
 * @date 2018-02-21 12:11
 */
const program = require('commander');
const inquirer = require('inquirer');
const path = require('path')

const createApp = require('./createApp');
// const outputVersion = () => {
//     console.log(packageJson.version);
// };
// program
//     .description('快站前端工具')
//     .option('-v, --version', '输出版本号', outputVersion);

program
    .command('create [project-name]')
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

program.parse(process.argv)
