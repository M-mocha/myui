const utils = require("./utils");
const path = require("path");
const webpack = require("webpack");
const config = require("./config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");
const address = require("address");

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const Local = address.ip();

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: config.dev.devtool,
    devServer: {
        clientLogLevel: "warning",
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/,
                    to: path.posix.join(config.dev.assetsPublicPath, "index.html")
                }
            ]
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll
        },
        disableHostCheck: true // 是否禁用检查hostname
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        new webpack.NamedModulesPlugin(),
        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
        new webpack.NoEmitOnErrorsPlugin(),
        // 生产html文件
        new HtmlWebpackPlugin({
            filename: config.build.demo,
            template: "index.html",
            inject: true,
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: "./examples/index.html",
            inject: true,
            chunks: ["example"]
        }),
        // 复制静态文件
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, "../static"),
        //         to: config.dev.assetsSubDirectory,
        //         ignore: [".*"]
        //     }
        // ])
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [
                            `Your application is running here: `,
                            `http://${Local}:${port}`
                        ]
                    },
                    onErrors: config.dev.notifyOnErrors
                        ? utils.createNotifierCallback()
                        : undefined
                })
            );
            resolve(devWebpackConfig);
        }
    });
});
