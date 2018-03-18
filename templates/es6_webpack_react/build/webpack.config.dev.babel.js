import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackMerge from 'webpack-merge';

import webpackBaseConf from './webpack.config.base';
import baseConfig from './baseConfig';


const webpackDevConf = webpackMerge(webpackBaseConf, {

    output: {
        publicPath: baseConfig.publicPath,
    },
    
    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        port: baseConfig.port,
        host: baseConfig.host,
        proxy: baseConfig.proxy,
    },

    module: {
        rules: [
            //css && less rules
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                    ]
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ],
                }),
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
    ]
});

export default webpackDevConf;
