var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
    })],
};
