require('shelljs/global')
const webpack = require('webpack')
const fs = require('fs')
const _ = require('lodash')
const {resolve} = require('path')

const r = url => resolve(process.cwd(), url)

const webpackConf = require('./webpack.conf')
const config = require(r('./mina.config'))
const assetsPath = r('./mina')

rm('-rf', assetsPath);
mkdir(assetsPath);

var renderConf = webpackConf

var entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(process.cwd(), './', `${i}.mina`)
  return entry
})

renderConf.entry = entry()
renderConf.entry.app = config.app

renderConf.output = {
  path: r('./mina'),
  filename: '[name].js'
}

var compiler = webpack(renderConf)
fs.writeFileSync(r('./mina/app.json'), JSON.stringify(config.json), 'utf8')
compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')
})

var shell = 'npm i babel-loader copy-webpack-plugin pug ramda regenerator-runtime wechat-mina-loader node-sass lodash babel-core babel-preset-env progress-bar-webpack-plugin shelljs st\n' +
  'yle-loader postcss-loader extract-text-webpack-plugin';