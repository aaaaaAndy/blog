---
title: ES6总结
tags: [JavaScript, ES6]
categories: JavaScript
date: 2018-03-10 20:02:06
hidden: true
---

# ES6总结

## 1. 背景

ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现。日常场合，这两个词可以互换。

ES6的第一个版本在2015年6月发布，正式名称是《ECMAScript2015标准》（简称ES2015），2016年6月，小幅度修订的《ECMAScript2016标准》（简称ES2016）如期发布，这个版本可以看作ES6.1，因为两者的差异非常小，所以统称为ES6。

## 2. ES脚手架

babel-cli: 命令行转码，可全局安装，但是每个项目node环境不同，所以需要在每个项目中安装
babel-node: babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境，可以直接运行ES6代码
babel-register: 改写require命令，每当使用require加载.js, .jsx, .es, .es6后缀名的文件，就会先用babel进行转码
babel-core: 调用babel的API进行转码
babel-polyfill: babel默认只转换JavaScript句法，而不转换新的api，此垫片可实现此功能

未完待续...

<!-- more -->
