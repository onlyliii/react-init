'use strict'
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {'javascriptEnabled': true} // https://github.com/ant-design/ant-motion/issues/44
          }
        ]
      }
    ]
  },
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 开发模式下cheap-module-eval-source-map是最快的
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning', // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息
    host: HOST || config.dev.host,
    port: PORT || config.dev.port, // 端口
    // index: 'demo.html', // 索引文件的文件名
    open: true, // 打开浏览器
    hot: true, // 启用 webpack 的模块热替换
    compress: true, // 一切服务都启用gzip 压缩
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    proxy: {}, // 跨域代理
    contentBase: path.resolve(__dirname, '../src'), // 告诉服务器从哪里提供内容。只有在想要提供静态文件时才需要
    overlay: {
      warnings: false,
      errors: true
    }, // 在浏览器上全屏显示编译的errors或warnings
    publicPath: '/',
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    watchOptions: {
      poll: false,
    } // webpack 使用文件系统(file system)获取文件改动的通知
  },
  plugins: [
    // webpack4 development mode 默认会将 process.env.NODE_ENV 的值设为 development
    new webpack.DefinePlugin({
      'process.env': config.devEnv
    }),
    // 开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),
    // 不显示错误信息
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 配置html入口信息
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'React webpack Demo',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks:['index'],
      inject: true
    }),
    // 复制自定义静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: path.resolve(__dirname, '../assets'),
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
