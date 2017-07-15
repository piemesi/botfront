const webpack = require('webpack');
const path = require('path');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

// const UglifyJS = require("uglify-es");
const BabiliPlugin = require("babili-webpack-plugin");
const babiliOptions = {}
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

const config = {
    entry: {
        main: [
              './src/app/app.js',
            // './src/app/entrypoint.js',
        ],
    },
    // Render source-map file for final build
    devtool: 'source-map',
    // output config
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'app.js', // Name of output file
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // Minify the bundle
        new BabiliPlugin(babiliOptions),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        // }),
        // Transfer Files
        // new TransferWebpackPlugin([
        //     {from: 'www' },
        // ], path.resolve(__dirname, 'src')),
        new CopyWebpackPlugin([
                // {output}/file.txt
                { from: 'src/www' }]),
        extractPlugin
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.less$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.css/,
                use: extractPlugin.extract({
                    use: ['style-loader', 'css-loader']
                })
            },

            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            // {
            //     test: /\.css$/,
            //     loader: "style-loader!css-loader!postcss-loader",
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!postcss-loader!less",
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.styl$/,
            //     loader: "style-loader!css-loader!postcss-loader!less",
            //     exclude: [/node_modules/, /public/]
            // },
        ],
    },
};

module.exports = config;
