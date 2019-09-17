'use strict'
const path = require('path')
const config = require('../config')
const packageConfig = require('../../package.json')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduct = process.env.NODE_ENV === 'production'

exports.assetsPath = function (dir) {
    const assetsSubDirectory = isProduct ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, dir)
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')
  
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || ''
      })
    }
  }

exports.cssLoaders = () => {
    const styleLoader = isProduct ? MiniCssExtractPlugin.loader : 'vue-style-loader'
    return [
        {
            test: /\.s?css$/,
            use: [
                styleLoader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'fast-sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                styleLoader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
    ]
}