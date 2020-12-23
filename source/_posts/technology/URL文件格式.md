---
title: URL文件格式
tags: ['URL', '网页']
categories: JavaScript
date: 2019-04-28 11:17:08
---

# 1. 全部配置
.url文件是一个指向URL（web文档）的文件，双击后可直接在浏览器打开

```
[DEFAULT]
BASEURL=

[InternetShortcut]
URL=
WorkingDirectory=
ShowCommand=
IconIndex=
IconFile=
Modified=
HotKey=
```

ShowCommand规定Internet Explorer启动后窗口的初始状态：7表示最小化，3表示最大化；如果没有ShowCommand这一项的话则表示正常大小。

IconFile和IconIndex用来为Internet快捷方式指定图标。

# 2. 基础配置

一个简单的Internet快捷方式只需要在[InternetShortcut]节中包含URL项就可以了

```
[InternetShortcut]
URL=http://www.baidu.com
```

<!-- more -->
