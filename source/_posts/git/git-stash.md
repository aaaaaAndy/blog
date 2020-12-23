---
title: Git-stash
tags: [git, stach]
categories: git
date: 2019-09-11 20:02:06
---

# Git-stash

我们经常会遇到这样一种情况, 当我们做到需求做到一半,有人反馈了一个bug,这时我们不得不切换到另一个分支上去解决这个bug,而我们这一期的需求还没有做完,又不想提交,于是我们就设想有这样一个功能, 可以把我们的工作进度临时保存在本地,等我们解决完bug回来再取出这期需求,`git stash`就是帮我们做这样事情的一个命令 



## 1. 功能

备份当前工作区的内容到git栈中，并从最近的一次提交中读取相关内容，让工作区保证和上次commit的内容一致

## 2. 用途

主要用户临时保存当前工作进度，会把暂存区和工作区的改动保存起来。执行完这个命令后，在运行`git status`命令，就会发现当前是一个干净的工作区，没有任何改动。使用`git stash save 'message...'`可以添加一些注释

## 3. 常用命令

- 保存当前工作区的内容，并切换到上一次commit时的相关内容

```bash
git stash       # 保存当前工作内容，但保存message贼长，一般信息未保存线上某个分支到本地某个分支
git stash save 'xxx'    # 保存当前工作内容，且该条记录message为xxx
git stash push -m 'xxx';    # 保存当前工作内容，且该条记录message为xxx，与上一条命令相同，只是命令必须带参数-m
```

- 显示git栈内所有备份，可以利用这个列表来决定从从哪个地方恢复

```bash
git stash list

# 执行结果如下
# stash@{0}: On dev_20200320_153058: test33
# stash@{1}: On dev_20200320_153058: test22
# stash@{2}: On dev_20200320_153058: test11
```

- 显示做了哪些改动

```bash
git show    # 显示做了哪些改动，默认show第一个存储
git show stash@{1}    # 显示id为1的记录做了哪些改动,
```

- 从git栈中读取内容

```bash
git stash pop   # 将git栈中保存的最新一条修改记录弹出，即恢复之前的工作装填，并删除git栈中对应记录
git stash apply     # 将git栈中保存的最新一条修改记录弹出，但不删除git栈中对应记录
git stash apply stash@{1}   # 将git栈中对应id为stash@{1}的记录应用到工作区，但不删除git栈中的记录
```

- 删除git栈中对应记录

```bash
git stash drop stash@{1}    # 删除对应的记录
```

- 清空git栈

```bash
git stach clear
```

## 4. 骚操作

- 暂存部分文件
1. add 那些你不想备份的文件（例如： git add file1.js, file2.js）
2. 调用 git stash –keep-index。只会备份那些没有被add的文件。
3. 调用 git reset 取消已经add的文件的备份，继续自己的工作。

<!-- more -->
