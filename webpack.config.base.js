var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  plugins: [new HtmlWebpackPlugin(
    {
      title: 'Webpack Demo',
      template: 'src/assets/index.html'
    }
  )],
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "[name].[contenthash].js"
  },
  optimization: {
    runtimeChunk: 'single',
  },
};