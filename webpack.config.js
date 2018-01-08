const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const {
  ACCESS_TOKEN,
} = process.env;

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: [
    path.resolve(__dirname, 'src/main.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env',
            'react',
            'stage-3',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ACCESS_TOKEN: `'${ACCESS_TOKEN}'`,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'defibs',
    }),
  ],
};
