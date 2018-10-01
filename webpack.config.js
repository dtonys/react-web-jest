const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const TimeFixPlugin = require('time-fix-plugin');


const PATHS = {
  entry: path.resolve(__dirname, 'src', 'client.js'),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};
const config = {
  output: {
    path: PATHS.dist,
    publicPath: '/',
  },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    PATHS.entry,
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js/,
        include: PATHS.src,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new TimeFixPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
module.exports = config;
