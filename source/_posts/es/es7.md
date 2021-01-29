---
title: es7
date: 2020-12-24 10:15:32
tags: [ES, ES7, JavaScript]
categories: ES
---

`ES7`又称`ES2016`，它只添加了两个小特性来说明标准化过程：

## 1. `Array.prototype.includes()`

`includes()`用来判断一个数组是否包含一个指定值，如果包含则返回`true`，否则返回`false`

下面两个表达式是等价的：

```javascript
arr.includes(x)
arr.indexOf(x) >= 0
```

## 2. 指数操作符

在`ES7`中引入了指数操作符`**`，该操作符与`Math.pow(..)`具有等效的计算结果。

```javascript
console.log(2**10); // 1024
```





<!-- more -->