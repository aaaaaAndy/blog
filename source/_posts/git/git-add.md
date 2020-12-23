---
title: Git-add
tags: [git, add]
categories: git 
date: 2019-02-20 20:02:06
---

# Git-add

## 基本用法

### 添加一个文件

```bash
git add readme.txt
```

### 添加多个文件

```bash
git add readme.txt one.js
```

### 通配符进行匹配文件

```bash
git add *.html    # 添加后缀名为html的文件
```

### 添加一个目录

```bash
git add dir     # 添加目录dir下的所有文件
```

### 添加目录下的指定文件

```bash
git add dir/one.js
```

### 添加所有文件

```bash
git add .         # 提交新增，修改文件，不包括删除文件
git add -u        # 提交修改和删除文件，不会提交新文件
git add -A        # 提交新增，修改和删除文件
```

<!-- more -->
