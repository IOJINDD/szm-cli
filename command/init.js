'use strict'
const exec = require('child_process').exec // 创建异步进程
const co = require('co') // 异步流程控制工具
const prompt = require('co-prompt') // 传统的命令行只能单行一次性地输入所有参数和选项，使用这个工具可以自动提供提示信息，并且分步接收用户的输入，体验类似npm init时的一步一步输入参数的过程。
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
    co(function *() {
        let tplName = yield prompt('选择模板名称：')
        let projectName = yield prompt('项目名称：')
        let gitUrl
        let branch
        if (!config.tpl[tplName]) {
            console.log(chalk.red);
            process.exit()
        }
        gitUrl = config.tpl[tplName].gitUrl
        branch = config.tpl[tplName].branch
        let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`
        console.log(chalk.white('\n Start generating...'))
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                process.exit()
            } 
            console.log(chalk.green('\n ✅ 生成成功！'))
            console.log('\n cd ${projectName} && npm install \n')
            process.exit()
        })
    })
}
