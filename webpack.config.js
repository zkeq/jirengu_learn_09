const base = require('./webpack.config.base.js');

module.exports = {
  ...base,
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  mode: "development", // "production" | "development" | "none"
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  }
};