import path from 'path';

// 运行环境（代码的运行环境）根据运行环境设置不同的NODE_ENV
const runEnv = process.env.RUN_ENV || 'production';

const config = {
    // 各环境公共的配置
    common: {
        distPath: './dist',
        rootDir: path.resolve(__dirname, '..'),
        includePaths: path.resolve(__dirname, '../src'),
    },
    // 本地开发环境
    dev: {
        port: 8888,
        host: '10.0.120.35',
        proxy: {
            '/api/v1': {
                target: 'http://11.11.111.111',
                headers: {
                    host: 'baidu.com',
                },
            },
        },
        publicPath: '/',
        nodeEnv: 'dev',
    },
    // 远程测试环境
    test: {
        publicPath: '/xx/xxx/',
        nodeEnv: 'production',
    },
    // 线上生产环境
    production: {
        publicPath: '//static-xxx.file.xxx.com/projectname/',
        nodeEnv: 'production',
    },
};

export default Object.assign({}, config.common, config[runEnv]);
