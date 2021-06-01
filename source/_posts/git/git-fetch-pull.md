---
title: git pull & git fetch
date: 2020-08-08 13:17:27
tags: [git, fetch]
categories: git
---

# git pull & git fetch

与`git fetch`经常做对比的就是`git pull`了.

## 基本概念

> `git fetch`：Download objects and refs from another repository
>  `git pull` ：Fetch from and integrate with another repository or a local branch

`git fetch`从远程分支获取最新版本到本地,并不会自动`merge`.

`git pull`从远程分支获取最新版本到本地,并且`merge`,所以实际上`git pull`执行了两个步骤: 

1. `git fetch`将`FETCH_HEAD`的内容取下来
2. `git merge FETCH_HEAD`

所以我们常说`git pull` = `git fetch` + `git merge`

## 常用命令

### 获取远程分支

只有`git fetch`真正读区远程的分支,然后再本地创建远程分支的一个拷贝.这个拷贝的名字叫`origin/xxx`

```bash
// 获取远程所有的更新到本地
git fetch

// 获取特定分支
git fetch origin master

// 获取特定分支并在本地创建一个新分支
git fetch origin master:temp
```

### 对比远程分支的拷贝

```bash
git diff origin/xxx
```

### 合并远程分支的拷贝

```bash
git merge origin/xxx
```



<!-- more -->