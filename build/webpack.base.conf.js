require('./watcher')
const path = require('path')
const utils = require('./utils')
const config = require('./config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const hljs = require('highlight.js')
const HappyPack = require('happypack') // 开启多线程
const os = require('os')
const {wrapTagPlugin} = require('./utils/markdownTools')

let happyThreadPool =  HappyPack.ThreadPool({size: os.cpus().length})

function resolve (dir) {
    return path.resolve(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js',
        example: './examples/src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'examples': resolve('examples'),
            'components': resolve('src/components'),
            'pages': resolve('src/pages'),
            'styles': resolve('src/styles')
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            ...utils.cssLoaders(),
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('examples')],
                options: {
                    //   cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}'
                }
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happy-babel-js',
                exclude: /node_modules/,
                include: resolve('src')
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                    {
                        loader: 'vue-markdown-loader/lib/markdown-compiler',
                        options: {
                            raw: true,
                            use: [
                                [wrapTagPlugin, {mode: 'both'}]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}