---
title: IntersectionObserver-无限滚动
date: 2020-08-22 13:42:31
tags: [IntersectionObserver, 滚动, scroll]
categories: JavaScript
---



# IntersectionObserver-无限滚动

日常需求中, 经常会遇到列表需要上拉加载下一页数据, 也就是一个无限滚动的效果, 过去我们的实现方案无外乎监听`scroll`的变化, 通过`scrollTop`, `scrollHeight`和 `clientHeight`来判断滚动的高度, 从而决定是否加载下一页的数据. 今天我们有了一个更好的方案: `IntersectionObserver`,这是一个

<!-- more -->

