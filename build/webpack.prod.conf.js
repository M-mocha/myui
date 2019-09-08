const path = require("path")
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin") // 一个优化压缩CSS的WebPack插件
const TerserJsPlugin = require('terser-webpack-plugin') // 压缩js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const baseWebpackConfig = require("./webpack.base.conf")
const utils = require("./utils")
const config = require("./config")

console.log(process.env.NODE_ENV)
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js?v=[chunkhash]'),
        chunkFilename: utils.assetsPath('js/[name].js?v=[chunkhash]')
    },
    devtool: config.build.devtool,    
    optimization: {
        minimizer: [
            new TerserJsPlugin({
                parallel: true,
                sourceMap: false,
                cache: '../build-catch/',
                terserOptions: {
                  compress: {
                    inline: 1, // https://github.com/mishoo/UglifyJS2/issues/2842
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true
                  },
                  output: {
                    comments: false
                  }
                }
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? { safe: true, map: { inline: false } }
                    : { safe: true }
            }),
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].css?v=[contenthash]'),
            chunkFilename: utils.assetsPath('css/[name].css?v=[contenthash]'),
            sourceMap: false
        }),
        // html模板打包
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './examples/index.html',
            inject: true, // 允许注入打包文件
            chunks: ['manifest', 'vendor', 'example'],
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true, // 折叠空白区域
                removeAttributeQuotes: true, // 删除属性引号
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true
            },
            chunksSortMode: 'dependency'
        }),
        new HtmlWebpackPlugin({
            filename: config.build.demo,
            template: 'index.html',
            inject: true, // 允许注入打包文件
            minify: {
                removeComments: true, // 删除注释
                collapseWhitespace: true, // 折叠空白区域
                removeAttributeQuotes: true, // 删除属性引号
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true
            },
            chunksSortMode: 'dependency'
        }),
        // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
        new webpack.HashedModuleIdsPlugin(),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              to: config.build.assetsSubDirectory,
              ignore: ['.*']
            }
        ]),
        // 打包进度
        // new webpack.ProgressPlugin({}),
    ]
})

module.exports = webpackConfig