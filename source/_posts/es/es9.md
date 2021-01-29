---
title: es9
date: 2020-12-24 10:16:07
tags: [ES, ES9, JavaScript]
categories: ES
---

## 1. 异步迭代

以串行的方式运行异步操作。

```javascript
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```

## 2. `Promise.finally()`

指定一个`Promise`的最终操作。

## 3. `Rest/Spread`属性

`ES6`引入了**Rest参数**和**扩展运算符能**。三个点仅用于数组。`ES9`为对象解构提供了和数组一样的展开操作符。

```javascript
const myObject = {
  a: 1,
  b: 2,
  c: 3
};

const { a, ...x } = myObject;
```

## 4. 正则表达式命名捕获组

ES2018允许命名捕获组使用符号`?<name>`，在打开捕获括号`(`后立即命名，示例如下：

```javascript
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match.groups.year,  // 2018
  month  = match.groups.month, // 04
  day    = match.groups.day;   // 30
```

## 5. 正则表达式反向断言

目前JavaScript在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中。例如从价格中捕获货币符号：

```javascript
const
  reLookahead = /\D(?=\d+)/,
  match       = reLookahead.exec('$123.89');

console.log( match[0] ); // $
```

ES2018引入以相同方式工作但是匹配前面的反向断言（lookbehind），这样我就可以忽略货币符号，单纯的捕获价格的数字：

```javascript
const
  reLookbehind = /(?<=\D)\d+/,
  match        = reLookbehind.exec('$123.89');

console.log( match[0] ); // 123.89
```

以上是 **肯定反向断言**，非数字`\D`必须存在。同样的，还存在 **否定反向断言**，表示一个值必须不存在，例如：

```javascript
const
  reLookbehindNeg = /(?<!\D)\d+/,
  match           = reLookbehind.exec('$123.89');

console.log( match[0] ); // null
```

## 6. 正则表达式dotAll模式

正则表达式中点`.`匹配除回车外的任何单字符，标记`s`改变这种行为，允许行终止符的出现，例如：

```javascript
/hello.world/.test('hello\nworld');  // false
/hello.world/s.test('hello\nworld'); // true
```

## 7. 正则表达式 `Unicode` 转义

到目前为止，在正则表达式中本地访问 Unicode 字符属性是不被允许的。ES2018添加了 Unicode 属性转义——形式为`\p{...}`和`\P{...}`，在正则表达式中使用标记 `u` (unicode) 设置，在`\p`块儿内，可以以键值对的方式设置需要匹配的属性而非具体内容。例如：

```javascript
const reGreekSymbol = /\p{Script=Greek}/u;
reGreekSymbol.test('π'); // true
```

此特性可以避免使用特定 Unicode 区间来进行内容类型判断，提升可读性和可维护性。

## 8. 非转义序列的模板字符串





<!-- more -->