console.log('Watching dirs...')
const path = require('path')
const chokidar = require('chokidar')
const fs = require('fs')
const routeList = []

const watcher = chokidar.watch(path.resolve(__dirname, '../src/pages'), {
    ignored: /(^|[\/\\])\../
})

watcher
.on('addDir', (itemPath) => {
    let routeName = itemPath.split(path.sep).pop()
    if (routeName !== 'pages' && routeName !== 'index') {
        routeList.push(`'${routeName}'`)
        fs.writeFileSync(path.resolve(__dirname, '../src/route-list.js'), `module.exports = [${routeList}]`)
    }
})
.on('unlinkDir', (itemPath) => {
    let routeName = itemPath.split(path.sep).pop()
    const itemIndex = routeList.findIndex((val) => {
        return val === `${routeName}`
    })
    routeList.splice(itemIndex, 1)
    fs.writeFileSync(path.resolve(__dirname, '../src/route-list.js'), `module.exports = [${routeList}]`)
})

module.exports = watcher
