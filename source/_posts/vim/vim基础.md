---
title: vim基础
tags: [vim]
categories: vim 
date: 2020-02-10 20:02:06
---

## vim牛逼

## 1. vim的几种模式

- 正常模式：也就是常说的命令模式，此时键盘上所有键皆为命令
- 插入模式：可以输入文本
- 可视化模式：正常模式下按v可进入，用来选择文本，V进入可视行模式，ctrl+v进入可视块模式
- 替换模式：正常模式下按R进入

## 2. 文件操作

## 3. 移动操作

#### 1. 上下左右移动

命令 | 功能
-|-
h或退格 | 将光标向左移动一个字符
l或空格 | 将光标向右移动一个字符
j | 将光标下移一行
k | 将光标上移一行
+或enter | 将光标移动到下一行第一个非空白字符
\- | 将光标移动到上一行第一个非空白字符 
w | 前移一个单词，将光标停在下一个单词的开头
W | 前移一个单词，但忽略一些标点
e | 前移一个单词，将光标停在下一个单词的结尾
E | 前移一个单词到结尾，如果结尾有标点，则移动到标点
b | 后退一个单词，光标停在上一个单词的开头
B | 后退一个单词到开头，但忽略一些标点
ge | 后退一个单词，将光标停在上一个单词结尾
gE | 后退一个单词到结尾，忽略标点

以上命令都可以配合n使用，比如上移3行用：3k

#### 2. 大范围移动

命令 | 功能
-|-
0 | 移动到行首
g0 | 移动到当前行行首
^ | 移动到行首第一个非空白字符处
g^ | 同^
nG | 移动到第n行
:n | 移动到第n行
$ | 移动到行尾
H | 移动到当前屏幕最顶一行
M | 移动到当前屏幕中间一行
L | 移动到当前屏幕最低一行
gg | 移动到文件头部
G | 移动到文件尾部

#### 3. 屏幕滚动

命令 | 功能
-|-
ctrl + y | 向上移动一行
ctrl + e | 向下移动一行
ctrl + u | 向上移动半屏
ctrl + d | 向下移动半屏
ctrl + b | 向上移动一屏
ctrl + f | 向下移动一屏
n% | 移动到文件n%位置 
zz | 将当前行移动到屏幕中央 
zt | 将当前行移动到屏幕顶端 
Zb | 将当前行移动到屏幕底端 

## 4. 插入文本

#### 1. 基本插入

| 命令           | 功能                                                         |
| -------------- | ------------------------------------------------------------ |
| i              | 在光标前插入；<br />一个小技巧：按8，再按i，进入插入模式，输入=， 按esc进入命令模式，就会出现8个=。 这在插入分割线时非常有用，如30i+<esc>就插入了36个+组成的分割线 |
| I              | 在当前行第一个非空字符前插入                                 |
| gI             | 在当前行第一列插入                                           |
| a              | 在光标后插入                                                 |
| A              | 在当前行最后插入                                             |
| o              | 在下面新建一行插入                                           |
| O              | 在上面新建一行插入                                           |
| :r    filename | 在当前位置插入另一个文件的内容                               |
| :[n]r filename | 在第n行插入另一个文件的内容                                  |
| :r !date       | 在光标处插入当前日期与时间（或者是normal模式下输入!!date）   |

#### 2. 改写插入

| 命令  | 功能                                            |
| ----- | ----------------------------------------------- |
| c[n]w | 改写光标后1(n)个词                              |
| c[n]l | 改写光标后n个字母                               |
| c[n]h | 改写光标前n个字母                               |
| [n]cc | 修改当前[n]行                                   |
| [n]s  | 以输入的文本替代光标之后1(n)个字符，相当于c[n]l |
| [n]S  | 删除指定数目的行，并以所输入文本代替之          |

## 5. 剪切复制

<!-- more -->
