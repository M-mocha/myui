const {scanner} = require('./utils/fsTools')
const path = require('path')
const fs = require('fs')

const filePath =  path.resolve(__dirname, `../src/mdComponents.js`)
const watcher = scanner(path.resolve(__dirname, '../src/pages'), process.env.NODE_ENV === 'development')

const cut = (absPath) => absPath.replace(path.resolve(__dirname, '../src') + '/', '')
const relativePath = absPath => path.relative(path.resolve(__dirname, '../src'), absPath)

const autoWrite = (filelist = []) => {
    filelist = filelist.filter(item => (/.vue$/.test(item) || /.md$/.test(item)))
    const mds = filelist.map(item => `{path: '${cut(item)}', component: resolve => require(['${relativePath(item)}'], resolve)}`).join(',');
    fs.writeFileSync(filePath, `module.exports = [${mds}]`)
}


watcher.onFinish((filelist) => {
    autoWrite(filelist);
});
watcher.onChange(({filelist, type}) => {
    if (/add/.test(type) || /del/.test(type)) {
        autoWrite(filelist);
    }
})

module.exports = watcher
