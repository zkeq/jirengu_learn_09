var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // "production" | "development" | "none"
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [new HtmlWebpackPlugin(
    {
      title: 'Webpack Demo',
      template: 'src/assets/index.html'
    }
  ), new MiniCssExtractPlugin(
    {
      filename: "[name].css",
      chunkFilename: "[id].css",
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