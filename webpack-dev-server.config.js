const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css'
});

const config = {
    // Entry points to the project
    entry: {
        main: [
            // only- means to only hot reload for successful updates
            'webpack/hot/only-dev-server',
            './src/app/app.js',
        ],
    },
    // Server Configuration options
    devServer: {
        contentBase: 'src/www', // Relative directory for base of server
        hot: true, // Live-reload
        inline: true,
        port: 3009, // Port Number
        host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
        historyApiFallback: true,
    },
    devtool: 'eval', // '#cheap-module-source-map', eval
    output: {
        path: path.resolve(__dirname, 'build'), // Path of output file
        filename: 'app.js',
    },
    plugins: [
        // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
        extractPlugin
    ],
    resolve: {
        // root: path.join(__dirname, './src'),
        extensions: ['.js', '.less', '.css', '.scss']
        //modules: [path.resolve(__dirname, "vendor"), "node_modules"],
    },
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
            //     test: /\.(eot|svg|ttf|woff|woff2)$/,
            //     use: extractPlugin.extract({
            //         use: ['style-loader', 'css-loader']
            //     })
            // },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/]
            },

            // {
            //     test: /\.css$/,
            //     loader: "style-loader!css-loader!less-loader!postcss-loader",
            //
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.less$/,
            //     loader: "style-loader!css-loader!less-loader!postcss-loader!less",
            //     exclude: [/node_modules/, /public/]
            // },
            // {
            //     test: /\.styl$/,
            //     loader: "style-loader!css-loader!postcss-loader!styl$",
            //     exclude: [/node_modules/, /public/]
            // },
            {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            // { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap') },
            // // Font Definitions
            // { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
};

module.exports = config;
