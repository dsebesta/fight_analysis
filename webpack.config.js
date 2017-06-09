var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader'},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'sass-loader',
                        options: {
                            includePaths:  [
                                path.resolve(__dirname, 'node_modules'),
                                path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
                                path.resolve(__dirname, './src/css')
                            ],
                        }
                    }],
                    publicPath: '/dist'
                })
            }

            // { test: /\.scss$/, use: ['css-loader', 'sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")'] }

        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'build.min.css',
            allChunks: true,
        })
    ]
};