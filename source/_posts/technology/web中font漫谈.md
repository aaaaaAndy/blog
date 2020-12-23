---
title: web中font漫谈
tags: ['浏览器']
categories: 浏览器
date: 2018-08-17 21:08:11
---

日常前端开发中，少不了与字体打交道。一般小网站的开发中只需要使用系统默认字体即可，但需要制作特殊效果的网站避免不了第三方字体的引入！

# 1. 系统默认字体如何使用
1. web-safe字体
不同设备的系统默认字体是不相同的，不同系统之间的字体更是不同，比如Mac、windows，他们各自的系统字体不相同，但是有几种字体是他们共同支持的：

![sys-font](/images/sys-font.png)

web安全字体有20种左右，网上到处都是这类总结，点击此处查看web安全字体。

2. 前端字体兼容写法
原文链接：<http://caibaojian.com/css-font.html>

字体的分类有很多种，可以参考这个 WikiTypeface·

不过计算机上其实并没有把种类分得那么细致，在 CSS 中有5个基本款

 * serif, sans-serif, monospace, cursive, fantasy.

 * serif 衬线字体，如 Big Caslon, 宋体

 * sans-serif 非衬线字体，如 Helvetica, 黑体

 * monospace 等宽字体，如 Menlo

 * cursive 手写体，如 Comic Sans MS

 * fantasy 幻想体，如 Bodoni Ornaments

接下来我们来看一看 CSS 中字体的 Fallback 机制：

```css
font-family: 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', sans-serif;
```

这段 CSS 代码中的字体的 Fallback 可以看下图。

![font-comp](/images/font-comp.png)

这个 fallback 的规则可以总结为：

```javascript
(hasFont && isInUnicodeTable) ? 'Current Font' : 'Next Font'
```
就这样一直找匹配的字体，直到系统默认，所以一般都把系统默认的5类字体放到 font-family 定义的最后来写。

那么一个国际化的站点应该如何设置多语种的字体呢？其先后顺序如何设定？这里强烈推荐 Airbnb 作为参考

```css
[lang^="zh"] body{font-family:"Hiragino Sans GB”,"华文细黑","STHeiti","微软雅黑", "Microsoft YaHei",SimHei,"Helvetica Neue”,Helvetica,Arial, sans-serif !important}
```
作为一个 web 开发者，你理应对 Windows, Mac OS, Linux 家族等常用操作系统里的系统字体有足够的了解，特别是中文。在这里，我们假设目标网站要同时给予 windows 用户和 mac 用户最好的字体体验，于是我们可以这样声明：

```css
Font-family: Helvetica, Tahoma, Arial, STXihei, “华文细黑”, “Microsoft YaHei”, “微软雅黑”, sans-serif
```
这句声明都做到哪些事情呢？让我们一一说明（括号内代表其对应的目标操作系统）：·

对于英文字符，首先查找Helvetica(Mac)，然后查找Tahoma(Win)，都找不到就用Arial(Mac&Win)；若是以上三者都缺失，则使用当前默认的sans-serif字体(操作系统或浏览器指定)；

对于中文字体，我们已经了解其规则了。华文细黑(Mac)，微软雅黑(Win)是这两个平台的默认中文字体。

# 2. 第三方字体如何引入
@font-face用来引入设计师喜欢的任意字体，引入字体后字体文件存放在web服务器上，它会在需要时被自动下载到用户的计算机上。

语法：

![font-import](/images/font-import.png)

font-face
由于各个浏览器对'@font-face'规则支持的字体格式不同，所以需要考虑其兼容性。各个浏览器支持的字体格式如下：

* Webkit/Safari(3.2+) 

TrueType/OpenType TT (.ttf) 、OpenType PS (.otf)；

* Opera (10+) 

TrueType/OpenType TT (.ttf) 、 OpenType PS (.otf) 、 SVG (.svg)；

* Internet Explorer 

自ie4开始，支持EOT格式的字体文件；ie9支持WOFF；

* Firefox(3.5+) 

TrueType/OpenType TT (.ttf)、 OpenType PS (.otf)、 WOFF (since Firefox 3.6)

* Google Chrome 

TrueType/OpenType TT (.ttf)、OpenType PS (.otf)、WOFF since version 6

由上面可以得出：.eot + .ttf /.otf + svg + woff = 所有浏览器的完美支持

兼容性写法如下：

```css
// 声明webfont
@font-face {
    font-family: 'pinghei';
    src: url('../font/pinghei.eot');
    src: url("../font/pinghei.eot?#iefix") format('embedded-opentype'),
        url('../font/pinghei.woff') format('woff'),
        url("../font/pinghei.ttf") format('truetype'),
        url("../font/pinghei.svg") format('svg');
    font-weight: normal;
    font-style: normal;
}

// 使用指定字体
.test{
    font-family: 'pinghei';
}

```

<!-- more -->


