const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const parentDir = path.join(__dirname, '../');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
  },
});
