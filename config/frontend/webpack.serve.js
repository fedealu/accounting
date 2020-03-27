const PATHS = require('../paths');
const commonConf = require('./webpack.common');

module.exports = {
  ...commonConf,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: PATHS.frontend.dist,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 5000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:4000/api/',
        secure: false
      }
    }
  }
};
