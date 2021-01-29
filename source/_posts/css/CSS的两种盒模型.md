---
title: CSS的两种盒模型
tags: [css, 盒模型]
categories: css 
date: 2018-09-12 22:02:06
---

# CSS的两种盒模型

在最近的工作中，经常遇到给元素设置了 padding 之后元素就超出了原来设定的宽高，就不得不加一个 box-sizing: border-box; 使得元素的内边距在其内部展示，但是对于为什么要使用该属性还是不太熟悉，故学习了一下并简单记录。

在前端的 CSS 工作模式中，每个元素都可以看做是一个盒子，这就是我们所说的盒模型、之所以会初上上述的问题是因为现存有两种盒模型：

* W3C的标准盒模型
* IE的盒模型

## 1. W3C的标准盒模型

![box-1](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129114533.jpeg)

***在标准的盒子模型中，`widh`指content部分的宽度***

## 2. IE的盒模型

![box-2](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/20210129114707.jpeg)

***在IE盒子模型中，width表示content+padding+border这三个部分的宽度***

## 3. 切换盒模型

如果想要切换盒模型也很简单，这里需要借助css3的box-sizing属性

````css
  box-sizing: content-box;       // 是W3C盒子模型
  box-sizing: border-box;        //  是IE盒子模型
````

***box-sizing的默认属性是content-box***

<!-- more -->
