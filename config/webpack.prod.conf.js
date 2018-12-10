'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const env = config.prodEnv;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  performance: {
    hints: false // 打包文件过大不警告
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {'javascriptEnabled': true}  // https://github.com/ant-design/ant-motion/issues/44
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name]-[id].[chunkhash:8].js'
  },
  // webpack4.0配置
  optimization: {
    minimizer: [
      // 压缩js文件
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // 设置为 true 可用于生成 source map调试
      }),
      // 压缩css文件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          discardComments: {removeAll: true},
          safe: true
        },
        canPrint: true
      })
    ],
    // 包清单
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks:{
      minChunks: 2,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../build/*'), {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    // webpack4 production mode 默认会将 process.env.NODE_ENV 的值设为 production
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 生成单独css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
      chunkFilename: 'css/[name]-[id].[chunkhash:8].css',
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'React webpack Demo',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true, // true->'head' || false->'body'
      minify: {
        // 删除Html注释
        removeComments: true,
        // 去除空格
        collapseWhitespace: true,
        // 去除属性引号
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['manifest', 'vendor', 'index'],
      hash: false,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // 复制自定义静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: path.resolve(__dirname, '../build/static'),
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
