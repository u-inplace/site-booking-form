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

const Booking = (name, entryFile, clean = false) => ({
    ...config,
    name,
    entry: { [name]: entryFile },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'booking/[name].js',
        clean
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'booking/[name].css',
            chunkFilename: '[id].css'
        })
    ]
})

module.exports = () => [
    Booking('availability', './src/booking/packages/availability.js'),
    Booking('confirmation', './src/booking/packages/confirmation.js'),
    Booking('cleaning', './src/booking/packages/cleaning.js', true),
    Booking('duration', './src/booking/packages/duration.js'),
    Booking('ironing', './src/booking/packages/ironing.js'),
    Booking('postal-code', './src/booking/packages/postalCode.js'),
    Booking('services', './src/booking/packages/services.js')
]
