const path = require('path')

let os = require('os')
let iptable = {}
let ifaces = os.networkInterfaces()

for (let dev in ifaces) {
    ifaces[dev].forEach(function (item, alias) {
        if (item.family == 'IPv4') {
            iptable[dev + (alias ? ':' + alias : '')] = item.address
        }
    })
}

const HOST = Object.values(iptable)[0]

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        host: HOST || 'localhost',
        port: '9999',
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true, // 编译错误的时候通知提示，需要friendly-errors-webpack-plugin 配合
        poll: false,
        useEslint: false,
        showEslintErrorsInOverlay: false, // eslint浏览器错误提示遮罩层
        devtool: 'cheap-module-eval-source-map', // Source Maps
        cssSourceMap: true, // css Source Maps
        cacheBusting: false, // vue debugg 提示
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        demo: path.resolve(__dirname, '../dist/demo.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        devtool: 'cheap-module-source-map',
        productionSourceMap: true,
        // 开启静态文件的Gzip压缩
        // 如果是true 的话  需要 npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // 打包完成显示包大小的状态分析
        // `npm run build --report`
        bundleAnalyzerReport: process.env.npm_config_report
    }
}