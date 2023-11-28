const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            api: path.join(__dirname, 'src/api'),
            modules: path.join(__dirname, 'src/modules'),
            store: path.join(__dirname, 'src/store')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'MarketsMap',
            template: './src/index.html'
        })
    ]
}