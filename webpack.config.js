// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = 'style-loader'

const config = {
    target: ['web', 'es5'],
    devtool: 'inline-source-map',
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

const calendarConfig = {
    ...config,
    name: 'calendarConfig',
    entry: './src/calendar/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Calendar.bundle.js',
        library: 'Calendar',
        sourceMapFilename: '[name].js.map'
    }
}

const stepsConfig = {
    ...config,
    name: 'stepsConfig',
    entry: './src/steps/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Steps.bundle.js',
        sourceMapFilename: '[name].js.map'
    }
}

module.exports = () => {
    // eslint-disable-next-line no-multi-assign
    calendarConfig.mode = stepsConfig.mode = isProduction ? 'production' : 'development'
    return [calendarConfig, stepsConfig]
}
