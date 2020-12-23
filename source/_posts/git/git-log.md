---
title: Git-log
tags: [git, log]
categories: git 
date: 2019-03-12 16:02:06
---

# Git-log

## 1. 基础命令

- 查看所有提交记录

```bash
git log
```

- 查看最近n次提交

```bash
git log -3      # 查看最近3次提交
```

- 查看指定文件名的提交记录

```bash
git log readme.txt
```

- 查看指定目录下所有文件的提交记录

```bash
git log dir/      # 查看dir目录下所有文件的提交鸡柳
```

- 查看指定分支下的提交记录

```bash
git log dev     # 查看dev分支下所有提交记录
```

- 查看指定tag下的提交记录

```bash
git log v2.0      # 查看v2.0tag下所有提交历史记录
```

- 查看某次提交之前的历史提交记录（包括commit自身）

```bash
git log eb1aab29a     # 查看commit id为eb1aab29a之前的历史提交记录
```

- 查看某两次提交之间的历史记录（包括两者）

```bash
git log eb1aab29a 335a360       # 查看两次提交之间的历史记录
```

- 查看某两次提交之间的历史记录（不包括第一个commit）

```bash
eit log eb1aab29a..335a360       # 查看两次提交之间的历史记录(不包括eb1aab29a提交)
```

## 2. --pretty 参数

通过不同的参数以不同的格式显示提交历史记录

（1）.oneline
（2）.short
（3）.medium（默认值）
（4）.full
（5）.fuller
（6）.email
（7）.raw
（8）.format（此参数比较复杂后面会单独介绍）

- oneline 在日志显示在一行

```bash
git log --pretty=oneline
```

- format 格式化显示

（1）.%H：提交对象（commit）的完整哈希字串
（2）.%h：提交对象的简短哈希字串
（3）.%T：树对象（tree）的完整哈希字串
（4）.%t：树对象的简短哈希字串
（5）.%P：父对象（parent）的完整哈希字串
（6）.%p：父对象的简短哈希字串
（7）.%an：作者（author）的名字
（8）.%ae：作者的电子邮件地址
（9）.%ad：作者修订日期（可以用 -date= 选项定制格式）
（10）.%ar：作者修订日期，按多久以前的方式显示
（11）.%cn：提交者(committer)的名字
（12）.%ce：提交者的电子邮件地址
（13）.%cd：提交日期
（14）.%cr：提交日期，按多久以前的方式显示
（15）.%s：提交说明

只显示历史记录的作者名字和电子邮件地址

```bash
git log --pretty=format:"%an %ae"
```

### 3. --after 参数

```bash
git log --after='2020-2-2'      # 查询2020年2月2号之后的提交记录
```

### 4. --before 参数

```bash
git log --before='2020-2-2'     # 查看2020年2月2号之前的提交记录
```

### 5. --author 参数

author参数不仅可以搜索作者，还可以搜索邮箱

```bash
git log --author='andy'       # 查询坐着为andy的提交记录
```

### 6. --grep 匹配提交信息

```bash
git log --grep 'add'      # 查询提交message中包含add字符串的提交记录
git log --grep='add'      # 查询提交message中包含add字符串的提交记录
git log --grep='add' -i     # 忽略大小写，（默认是区分大小写的）
git log --pretty=oneline --grep='add'       # 只在一行展示
```

### 7. -S 参数

```bash
git log -S 'add'      # 查询筛选内容中包含add文件的提交记录
```

### 8. 其他参数

（1）.-p ：查看提交时的补丁信息
（2）.--stat ：列出文件的修改行数
（3）.--sortstat：只显示--stat中最后行数修改添加移除的统计
（4）.--graph：以简单的图形方式列出提交记录
（5）.--abbrev-commit：仅显示 SHA-1 的前几个字符，而非所有的 40 个字符
（6）.--relative-date：使用较短的相对时间显示（"1 weeks ago"）
（7）.--name-only：仅在提交信息后显示已修改的文件清单
（8）.--name-status：显示新增、修改、删除的文件清单


<!-- more -->
