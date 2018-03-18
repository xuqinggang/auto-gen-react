# auto-gen-react &middot; [![npm version](https://img.shields.io/npm/v/auto-gen-react.svg?style=flat)](https://www.npmjs.com/package/auto-gen-react)

## React相关项目生成脚手架

### 可生成多种项目类型:
1. es6+webpack
2. es6+webpack+react
3. es6+webpack+redux

### 高度灵活，自由配置
1. 对外完全暴露webpack相关配置
2. 分为三种环境：开发，测试，线上环境


### 生成项目目录及文件介绍
```
.
├── .babelrc // babelc配置
├── .eslintrc.js // eslint配置
├── .gitignore
├── README.md
├── build // webpack配置目录
│   ├── baseConfig.js // webpack基础配置对象
│   ├── webpack.config.base.js // webpack基本配置信息(后两个配置文件都是在这个文件基础上添加各自环境需要的配置)
│   ├── webpack.config.dev.babel.js // webpack开发环境需要的配置项
│   └── webpack.config.production.babel.js // webpack生产环境需要的配置项
├── package.json
├── postcss.config.js //postcss配置
├── src // 项目源目录
│   ├── application //应用(可能一个项目里存在多个单页应用)
│   │   └── App
│   │       ├── index.html
│   │       └── index.js // 该应用的入口文件
│   ├── components
│   ├── images //全局的image
│   ├── lib // 库目录
│   └── styles //全局样式文件
│       └── index.less
```

## Quick start
```
### 生成项目
npx auto-gen-react create myproject
cd myproject

### 开发环境运行
npm run dev

### 打包测试环境代码
npm run build_test

### 打包线上环境代码
npm run build_production
```
