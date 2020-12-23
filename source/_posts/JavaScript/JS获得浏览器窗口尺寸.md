---
title: JS获得浏览器窗口尺寸
tags: [JavaScript, window]
categories: JavaScript
date: 2019-12-10 20:02:06
---

## 有三种方法获得浏览器尺寸

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
