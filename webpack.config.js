const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

const config = {
    entry: {
        main: [
            './src/app/app.js',
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
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        // Transfer Files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
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
