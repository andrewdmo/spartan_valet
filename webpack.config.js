// const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }

        ],
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    },
    target: 'node',
    resolve: {
        extensions: ['*', '.js', '.jsx'
        ]
    },
    output: {
        path: __dirname + '/dist/',
        publicPath:
            '/',
        filename:
            'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot:
            true
    },
};
