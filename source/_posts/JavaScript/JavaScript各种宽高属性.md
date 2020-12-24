---
title: JS获得浏览器窗口尺寸
tags: [JavaScript, window]
categories: JavaScript
date: 2019-12-10 20:02:06
---



# JavaScript各种宽高属性

在`JavaScript`中存在各种宽高属性，如`height`, `clientHeight`, `innerHeight`,`outerHeight`等等，那么它们究竟有什么区别呢？



在了解这些属性的区别之前，我们需要先来了解`window`和`document`的区别：

## 1. `window`和`document`

-   `Window`对象表示浏览器打开的窗口，调用`window`对象上的方法可以省略`window`，如`console.log()`, `alert`等；
-   `Document`对象是`Window`对象的一部分，浏览器的`HTML`文档成为`Document`对象。

```javascript
window.location === document.location;  // true
```

## 2. `window`上的宽高





## 3. `window.screen`上的宽高



## 4. `document`上的宽高

### 4.1 `document.client`



### 4.2 `document.offset`



### 4.3. `document.scroll`



## 5. 常用方法

有三种方法获得浏览器尺寸

- 对于IE, chrome, firefox, opera, safari浏览器

```javascript
var wid = window.innerHeight;
var hei = window.innerWidth;
```

- 对于IE8, 7, 6, 5浏览器

```javascript
var wid = document.documentElement.clientWidth;
var hei = document.documentElement.clientHeight
```
- 或者

```javascript
var wid = document.body.clientWidth;
var hei = document.body.clientHeight;
```

在程序中，可以用或连接符把不同情况的处理方式连接起来。





<!-- more -->