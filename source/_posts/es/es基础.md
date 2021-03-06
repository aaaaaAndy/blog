---
title: 基础
date: 2020-12-24 10:17:12
tags: [ES, JavaScript]
categories: ES
---

# ES基础

## 1. 名词解释

-   **`ECMA`**: `Ecma`国际`（Ecma International）`是一家国际性会员制度的信息和电信标准组织。原名为欧洲计算机制造商协会ECMA`（European Computer Manufacturers Association）`

-   **`ECMAScript`**:  ECMAScript 是标准化组织 ECMA`（Ecma International - European association for standardizing information and communication systems）`发布的脚本语言规范。

-   `**ECMA`第39号技术委员会 `(TC39)`**: 负责制定和审核`ECMA-262`标准，成员由业内的大公司派出的工程师组成，目前共25个人。该委员会定期开会，所有的邮件讨论和会议记录，都是公开的。

`ECMAScript`和`JavaScript`的关系是，前者是后者的规格，后者是前者的一种实现。日常场合，这两个词可以互换。

## 2. 发布规范

`ECMA`规范最终由[TC39](https://github.com/tc39)敲定。`TC39`由包括浏览器厂商在内的各方组成，他们开会推动JavaScript提案沿着一条严格的发展道路前进。 从提案到入选ECMA规范主要有以下几个阶段：

-   Stage 0: `strawman`——最初想法的提交。
-   Stage 1: `proposal`（提案）——由TC39至少一名成员倡导的正式提案文件，该文件包括API事例。
-   Stage 2: `draft`（草案）——功能规范的初始版本，该版本包含功能规范的两个实验实现。
-   Stage 3: `candidate`（候选）——提案规范通过审查并从厂商那里收集反馈
-   Stage 4: `finished`（完成）——提案准备加入`ECMAScript`，但是到浏览器或者`Nodejs`中可能需要更长的时间。

## 3. 历史版本

| 版本 | 发版日期 | 版本内容                                                     |
| :--: | :------: | ------------------------------------------------------------ |
| ES1  |  1997.6  | 首版                                                         |
| ES2  |  1998.6  | 格式修正，以使得其形式与`ISO/IEC16262`国际标准一致           |
| ES3  | 1999.12  | 强大的正则表达式，更好的词法作用域链处理，新的控制指令，<br />异常处理，错误定义更加明确，数据输出的格式化及其它改变 |
| ES4  |   放弃   | 尤其改动较大，`TC39`协会分歧较大，该版本放弃                 |
| ES5  | 2009.12  | 新增“严格模式`（strict mode）`”<br />增加了部分新功能,如`getters`及`setters`,支持`JSON`以及在物件属性上更完整的反射 |
| ES6  |  2015.6  | 多个新的概念和语言特性                                       |
| ES7  |   2016   | `Array.prototype.includes`和指数操作符，<br />因为改动小，也成为`ES6.1`，统称为`ES6` |
| ES8  |   2017   | `async/await`,`String padding`, `Object.values`,`Atomic`对象 |
| ES9  |   2018   | `promise.finally`,正则表达式相关                             |
| ES10 |   2019   | `BigInt`等多个特性                                           |
| ES11 |   2020   | `GlobalThis`等多个特性                                       |

ES6的第一个版本在2015年6月发布，正式名称是《ECMAScript2015标准》（简称ES2015），2016年6月，小幅度修订的《ECMAScript2016标准》（简称ES2016）如期发布，这个版本可以看作ES6.1，因为两者的差异非常小，所以统称为ES6。

## 2. ES脚手架

`babel-cli`: 命令行转码，可全局安装，但是每个项目node环境不同，所以需要在每个项目中安装
`babel-node`: babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境，可以直接运行ES6代码
`babel-register`: 改写require命令，每当使用require加载.js, .jsx, .es, .es6后缀名的文件，就会先用babel进行转码
`babel-core`: 调用babel的API进行转码
`babel-polyfill`: babel默认只转换JavaScript句法，而不转换新的api，此垫片可实现此功能









<!-- more -->
