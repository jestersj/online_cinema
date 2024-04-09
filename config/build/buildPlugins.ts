import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from 'dotenv-webpack'
import {BuildOptions} from "./types/types";

export function  buildPlugins(options: BuildOptions): Configuration['plugins'] {
    return [
        new Dotenv({
            systemvars: true
        }),
        new HtmlWebpackPlugin({template: options.paths.html}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ]
}