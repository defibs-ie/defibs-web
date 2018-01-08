const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const {
  ACCESS_TOKEN,
  NODE_ENV,
} = process.env;

const API_URL = NODE_ENV === 'production'
  ? process.env.API_URL_PRODUCTION
  : process.env.API_URL_DEVELOPMENT;

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
  resolve: {
    extensions: ['.js', '.jsx'],
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
      API_URL: `'${API_URL}'`,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'defibs',
    }),
  ],
};
