'use strict';
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');



module.exports = {
    // entry: './entry.js',
    entry: './app/index.ts',
    output: {
        filename: "bundles.js",
        path: distDir,
    },
    devServer: {
        contentBase: distDir,
        port: 60800,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Better Book Bundle Builder'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000",
            }
        ]
    }
}