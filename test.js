const path = require('path');
// 以下可选
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 以上可选

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "public"), // 要输出的目录
        filename: "[name].[contenthash].js", // 文件名
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    // 以下可选
    plugins: [new HtmlWebpackPlugin(
        {
            title: 'Webpack Demo',
            template: 'src/assets/index.html'
        })],
    // 以上可选
    module: {
        rules: [
            { // SASS Loader
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            { // LESS loader
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            { // STYLUS loader
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"],
            },
            { // FILE loader
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[contenthash].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};
