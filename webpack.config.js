module.exports = {
    entry: './app/init.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFileName: 'tsconfig.json',
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js/,
                loaders: ['babel-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader'
                    },
                    esModule: true
                }
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        compress: true,
        port: 8081
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map'
};