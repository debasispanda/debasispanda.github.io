var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');
module.exports = {
    entry: './bundle.config.js',
    output: {
        path: path.resolve(__dirname, 'dist/css'),
        filename: 'vendors.css.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new ExtractTextPlugin('vendors.bundle.min.css'),
        new OptimizeCssAssetsPlugin()
    ]
}