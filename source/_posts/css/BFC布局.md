---
title: BFC布局
tags: [css, BFC]
categories: css 
date: 2018-08-20 20:02:06
---

# BFC布局

## 1. 概念

在解释 BFC 之前，我们先介绍 Box、Formatting Context的概念。

### 1. Box

Box 是 CSS 布局的对象和基本单位， 就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。

### 2. Formatting context

Formatting context （格式化上下文） 是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用

### 3. BFC

BFC，即Block Formatting Contexts（块级格式化上下文），它属于上述定位方案的普通流。***具有BFC特性的元素可以看做是隔离了的独立容器，容器里面的元素不会再布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性***。也就是说，可以把BFC，理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

# 2. 规则

* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

# 3. 触发BFC

* body根元素
* 浮动元素：float除none以外的值
* 绝对定位元素：position（absolute、fixed）
* display为inline-block、table-cells、flex
* overflow除了visible以外的值（hidden、auto、scroll）（常用）

# 4. BFC常见应用

## 1. 阻止外边距折叠

margin塌陷问题：在标准文档流中，块级标签之间竖直方向的margin会以大的为准，这就是margin的塌陷现象。可以用overflow：hidden产生BFC来解决。

1. 非 BFC 布局

```html
<div class="block"></div>
<div class="block"></div>
```

```css
.block{
    width: 100px;
    height: 100px;
    background-color: gray;
    margin: 100px;
}
```

效果如下，两个容器外边距都是100px，但是实际上两个容器之间的边距总共只有100px

![bfc-1](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-1.png)

2. 将每一个 block 放入一个 BFC 容器中，（其实将一个 block 元素放入 BFC 容器中也行）

```html
<div class="container">
    <div class="block"></div>
</div>
<div class="container">
    <div class="block"></div>
</div>
```

```css
.container{
    overflow: hidden;       
}
.block{
    width: 100px;
    height: 100px;
    background-color: gray;
    margin: 100px;
}
```

给 container 添加了 overflow: hidden; 属性之后，该元素就变成了 BFC 容器，其内部的元素将不会影响到外部元素。

![bfc-2](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-2.png)

## 2. 清除浮动

1. 浮动的元素会脱离普通文档流，也就撑不起来父元素的高度

```html
<div class="container">
    <div class="block"></div>
    <div class="block"></div>
</div>
```
```css
.container{
    background-color: gainsboro;
    border: 1px solid gainsboro;
}
.block{
    width: 100px;
    height: 100px;
    background-color: gray;
    float: left;
}
```

如下，我们给了父元素边框 1px 的宽度，由此可以看到，内部元素添加浮动属性之后，父元素的高度只剩下了上下两个边框的高度。

![bfc-3](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-3.png)

2. 添加属性使得父元素变为 BFC 容器，解决浮动引起的问题

```html
<div class="container">
    <div class="block"></div>
    <div class="block"></div>
</div>
```
```css
.container{
    background-color: gainsboro;
    border: 1px solid gainsboro;
    overflow: hidden;       // 新增
}
.block{
    width: 100px;
    height: 100px;
    background-color: gray;
    float: left;
}
```

结果如下：

![bfc-4](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-4.png)

## 3. 防止元素被浮动元素覆盖

1. 一个浮动元素覆盖了正常文档流元素

```html
<div class="float"></div>
<div class="block"></div>
```
```css
.float{
    width: 50px;
    height: 50px;
    float: left;
    background-color: gray;
}
.block{
    width: 100px;
    height: 100px;
    background-color: gainsboro;
}
```

效果如下：

![bfc-5](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-5.png)

2. 变为 BFC 容器

给正常流元素添加 overflow: hidden; 触发其成为 BFC 容器。

```html
<div class="float"></div>
<div class="block"></div>
```
```css
.float{
    width: 50px;
    height: 50px;
    float: left;
    background-color: gray;
}
.block{
    width: 100px;
    height: 100px;
    overflow: hidden;   // hidden
    background-color: gainsboro;
}
```

效果如下：

![bfc-6](https://raw.githubusercontent.com/aaaaaAndy/picture/main/images/bfc-6.png)

该方法可用于自适应两栏布局。

<!-- more -->
