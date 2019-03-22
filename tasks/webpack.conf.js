const {resolve} = require('path');
const r = url => resolve(__dirname, url);
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: false,
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  output: {
    path: r('../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      util: r('../utils/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          path: r('../'),
          dist: './dist'
        }
      }
    ]
  },
  plugins: [
    new UglifyjsPlugin(),
    //提取出来样式写入到.wxss中
    new MiniCssExtractPlugin({
      filename: '[name].wxss'
    }),
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json',
        },
        to: ''
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin()
  ],
}