---
title: webpack基础
tags: [webpack, 工具, 打包]
categories: webpack
date: 2020-03-29 09:53:31
---

webpack是一个现代JavaScript应用程序的静态模块打包器。当webpack处理程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle

webpack四个核心概念

- 入口（entry）
- 输出（output）
- loader
- 插件（plugins）



## 1. 入口（entry）

#### 1. 单个入口

```javascript
module.exports = {
  entry: '../src/index.js'
}

// 对象语法
module.exports = {
  entry: {
    main: '../src/index.js'
  }
}
```

#### 2. 多个入口

```javascript
module.exports = {
  entry: {
    main: '../src/index.js',
    app: '../src/app.js'
  }
}
```

#### 3. 分离应用程序(app)和第三方库（vendor）入口

```javascript
module.exports = {
  entry: {
    app: '../src/index.js',
    vendor: '../vendor/index.js'
  }
}
```

## 2. 输出（output）

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个`入口`起点，但只指定一个`输出`配置。

#### 1. 基础用法

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

#### 2. 多个入口

如果配置创建了多个单独的 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用[占位符(substitutions)](https://www.webpackjs.com/configuration/output#output-filename)来确保每个文件具有唯一的名称。

```javascript
module.exports = {
  entry: {
    app: '../src/app.js',
    search: '../src/search.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
}
```

## 3. mode

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化.



在配置中提供mode参数

```javascript
module.exports = {
  mode: 'production'
}
```



从CLI参数中传递

```shell
webpack --mode=development
```

## 4. loader

loader用于对模块的源代码进行转换，loader对非JavaScript文件进行预处理，将其转换为JavaScript能加载的模块，如将内联图像转换为data URL。



对不同类型的非JavaScript文件进行处理应该先安装对应的loader。

```shell
npm install css-loader --save-dev
npm install ts-loader --save-dev
```



在应用程序中，有三种使用loader的方式：

#### 1. webpack配置

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
}
```

#### 2. 内联

```javascript
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

#### 3. 使用CLI参数

```shell
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

## 5. plugins

插件目的在于解决 [loader](https://www.webpackjs.com/concepts/loaders) 无法实现的**其他事**

```javascript
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: '../src/index.html' })
  ]
}
```

<!-- more -->
