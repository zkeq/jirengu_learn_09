const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const base = require('./webpack.config.base.js');

module.exports = {
  ...base,
  mode: "production", // "production" | "development" | "none"
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin(
      {
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
        ignoreOrder: false,
      }
    )
],
};