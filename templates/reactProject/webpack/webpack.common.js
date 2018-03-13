const webpack = require('webpack');
const path = require('path');
const parentDir = path.join(__dirname, '../');

module.exports = {
  entry: [path.join(parentDir, 'index.js')],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /^(?!.*\.spec\.js$).*\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loder', 'less-loader'],
      },
    ],
  },
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.environment),
      },
    }),
  ],
};
