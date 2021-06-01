---
title: git tag
date: 2020-08-08 11:08:44
tags: [git, tag]
categories: git
---

# git tag

> 像其他版本控制系统（VCS）一样，Git 可以给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ `v1.0` 、 `v2.0` 等等）。

## 标签分类

`Git`支持两种标签: 轻量标签(`lightweight`)和附注标签(`annotated`).

### 轻量标签

***轻量标签***很像一个不会改变的分支——它只是某个特定提交的饮用.

```bash
// 创建一个轻量标签
git tag xxx					
```

### 附注标签

***附注标签***是存储在`Git`数据库中的一个完整对象,他们是可以被校验的,其中包含打标签者的名字,电子邮件地址,日期时间,此外还有一个标签信息.

```bash
// 创建一个附注标签
git tag -a xxx -m xxxxxx		
```



## 相关命令

### 新建标签

```bash
// 新建一个默认关联到当前最新提交commit的标签
git tag xxx		

// 新建一个名字是xxx,描述是xxxxxx的标签
git tag -a xxx -m xxxxxx	

// 新建一个关联到commitID是88d434的标签
git tag xxx 88d434	

// 新建一个关联到commitID是88d434的标签,该标签名字是xxx,描述是xxxxxx
git tag -a xxx -m xxxxxx 88d434	 
```

### 删除标签

```bash
// 删除本地标签xxx
git tag -d xxx

// 将冒号前面的空值推送到远程标签名,从而高效的删除它
git push origin :refs/tags/xxx 			

// 另一种方式删除远程标签
git push opigin --delete xxx				
```

### 推送标签

标签和`commit`一样都只存储在本地,不会自动推送到远程,所以需要手动`push`到远程分支的.

```bash
// 将标签xxx推送到远程仓库
git push origin xxx		

// 将本地所有标签推送到远程仓库
git push origin --tags		
```

### 查看标签

```bash
// 查看所有标签
git tag			

// 过滤展示以v1开头的标签
git tag -l "v1*"					
```

### 检出标签

如果你想要查看某个标签所指向的文件本班,就可以使用`git checkout`命令, 这个命令有些不好的副作用.在此状态下入锅你做了某些更改并且提交他们,你的新提交将不属于任何分支,并且将无法访问.因此, 如果你要修复旧版本中的错误, 那么通常需要创建一个新分支.

```bash
// 检出标签xxx
git checkout xxx					
```

<!-- more -->