const PATHS = require('../paths');
const commonConf = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  ...commonConf,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATHS.frontend.dist,
    compress: true
  },
  plugins: [...commonConf.plugins, new CleanWebpackPlugin()]
};
