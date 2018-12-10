'use strict'
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: ['babel-polyfill','./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    // publicPath: '/',
    libraryTarget: 'umd',
  },
  resolve: {
    // 自动解析文件扩展名(补全文件后缀)(从左->右)
    extensions: ['.js', '.jsx', '.json'],
    // 模块别名列表
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        enforce: 'pre',
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'eslint-loader', // 指定启用eslint-loader
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /fonts?/,
        options: {
          limit: 4096,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: /fonts?/,
        options: {
          limit: 4096,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
