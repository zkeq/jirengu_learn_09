var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      title: 'Webpack Demo',
      template: 'src/assets/index.html'
    }
  )],
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "[name].[contenthash].js"
} 
};