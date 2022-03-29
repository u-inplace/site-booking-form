// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const stylesHandler = 'style-loader'

const config = {
    entry: {
        Steps: './src/steps/main.js',
        Calendar: './src/calendar/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: '[name]'
    },
    target: ['web', 'es5'],
    devServer: {
        open: true,
        host: 'localhost'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader']
            }
        ]
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}
