---
title: git奇技淫巧
date: 2020-08-08 11:08:36
tags: [git]
categories: git
---



# git奇技淫巧

### 查看远程仓库地址

```bash
git remote –v
```

### 删除远程仓库

```bash
git remote -d origin
```

### 查看当前状态

```bash
git status
```

### 撤销文件修改

```bash
git checkout test.txt
```

### 取消暂存文件

```bash
git reset test.txt
```

### 查看分支

```bash
git branch			//带*的为当前分支
```

### 新建一个分支

```bash
git branch dev 			//从当前分支新建分支
```

### fetch

```bash
git fetch     			//拉取所有分支的更新，但不执行合并
```



<!-- more -->