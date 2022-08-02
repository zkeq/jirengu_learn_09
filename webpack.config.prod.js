const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const base = require('./webpack.config.base.js');

module.exports = {
  ...base,
  mode: "production", // "production" | "development" | "none"
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: "../",
          },
        }, 
        "css-loader"],
      },
    ],
  },
  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin(
    {
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
      ignoreOrder: false,
    }),
    new OptimizeCSSAssetsPlugin({})
],
};