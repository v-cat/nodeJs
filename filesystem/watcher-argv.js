const fs = require('fs')//引入node.js内置的文件模块
const filename = process.argv[2];//process.argv[0]和 process.argv[1]分别是node 和watcher-argv.js的绝对路径
if (!filename) {
    throw Error('A file to watch must be specified!');
}
fs.watch(filename,()=>console.log(`File ${filename} change!`));
console.log(`Now watching ${filename} for changes...`)