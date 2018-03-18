import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import webpackMerge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import path from 'path';

import webpackBaseConf from './webpack.config.base';
import baseConfig from './baseConfig';

// 添加css,js压缩
const webpackProConf = webpackMerge(webpackBaseConf, {
    output: {
        publicPath: baseConfig.publicPath,
        filename: 'js/[name].[chunkhash:8].js',
    },
    
    module: {
        // css压缩
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        'postcss-loader',
                    ]
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?minimize',
                        'postcss-loader',
                        'less-loader',
                    ],
                }),
            },
        ],
    },

    plugins: [
        // 生成asserts json
        new AssetsPlugin({
            filename: 'assets.json',
            path: path.resolve(baseConfig.rootDir, 'dist'),
            prettyPrint: true,
        }),
        
        // js压缩 经测试此插件压缩比webpack.optimize.UglifyJsPlugin插件效果好
        new UglifyJsPlugin({
            uglifyOptions: {
                cache: true,
                warnings: false,
                compress: {
                    warnings: false,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 死代码消除
                    dead_code: true,  
                },
                output: {
                    // 删除所有的注释
                    comments: false,
                    // 最紧凑的输出
                    beautify: false,
                },
            }
        }),
    ]
});

export default webpackProConf;
