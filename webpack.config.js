// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const config = {
    target: ['web', 'es5'],
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
        host: 'localhost'
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                options: {
                    plugins: ['lodash']
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: false }
                    }
                ]
            }
        ]
    }
}

const calendarConfig = {
    ...config,
    name: 'calendarConfig',
    entry: { Calendar: './src/calendar/main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: 'Calendar'
    }
}

const bookingConfig = {
    ...config,
    name: 'bookingConfig',
    entry: { Booking: './src/booking-slider/main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}

const StepPackage = (name, entryFile, clean = false) => ({
    ...config,
    name,
    entry: { [name]: entryFile },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean
    }
})

module.exports = () => [
    calendarConfig,
    bookingConfig,
    StepPackage('StepAvailability', './src/booking-flow/packages/availability.js'),
    StepPackage('StepPostalCode', './src/booking-flow/packages/postalCode.js'),
    StepPackage('StepServices', './src/booking-flow/packages/services.js'),
    StepPackage('StepIroning', './src/booking-flow/packages/ironing.js'),
    StepPackage('StepCleaning', './src/booking-flow/packages/cleaning.js'),
    StepPackage('StepDuration', './src/booking-flow/packages/duration.js')
]
