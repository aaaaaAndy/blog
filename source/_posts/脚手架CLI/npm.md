---
title: npm
tags: [npm]
categories: npm 
date: 2020-05-10 20:02:06
---

## 1. 什么是npm

> npm 为你和你的团队打开了连接整个 JavaScript 天才世界的一扇大门。它是世界上最大的软件注册表，每星期大约有 30 亿次的下载量，包含超过 600000 个 *包（package）* （即，代码模块）。
>
> npm 由三个独立的部分组成：
>
> - 网站: 是开发者查找包（package）、设置参数以及管理 npm 使用体验的主要途径.
> - 注册表（registry）: 是一个巨大的数据库，保存了每个包（package）的信息。
> - 命令行工具 (CLI) : 通过命令行或终端运行。开发者通过 CLI 与 npm 打交道。

## 2. 常用命令

#### 安装/卸载一个`npm`包

安装命令为 `install`, 卸载命令为 `uninstall`, 两者除了这个关键字,其他参数相同.

```bash
npm install <package_name>
npm install <package_name> --save  # 生产环境依赖性
npm install <package_name> --save-dev  # 开发环境依赖
npm install <package_name> -g  # 全局安装
```

#### 更新一个本地包

```bash
# 查找当前项目下所有非最新版的包,如果所有包都是最新版,则不提示下面格式的内容
# Package  Current  Wanted  Latest  Location
# chalk      3.0.0   3.0.0   4.1.0  ytian-cli-demo
npm outdated
npm outdated -g --depth=0  # 查找全局需要更新的包

# 在遵从版本语义化规则的前提下更新某个包
npm update <package_name>
npm update -g  # 全局更新
```

#### 切换`npm`源

```bash
# 查看npm源地址
npm config get registry

# 切换为官方源地址 https://registry.npmjs.org/
npm config set registry https://registry.npmjs.org/

# 切换为淘宝镜像
npm config set registry https://registry.npm.taobao.org
```

#### 查看安装目录

```bash
# 查看本地安装的目录
npm root

# 查看全局安装目录
npm root -g
```

#### 查看当前安装模块

```bash
npm ls
npm list
```

#### 查看模块(包)信息

```bash
npm info <package_name>
npm view <package_name>
```

#### 清除缓存

```bash
npm cache clean --force
```



## 3. package.json

`npm`通过`package.json`来管理本地安装的`npm`包:

* 列出项目中依赖的包
* 允许你使用版本语义化来管理每个依赖包的版本
* 使的每次`build`都是可复制的, 并且更方便与人协作.



#### 必需项

一个`package.json`中必须的两个配置字段为:

* `name`
* `version`

```json
{
  "name": "andy",
  "version": "1.0.0"
}
```

#### 创建一个`package.json`

##### 1. 通过命令行交互式创建

```shell
npm init
```

##### 2. 创建一个默认的package.json

```bash
npm init --yes
npm init -y
```

该命令将会根据当前目录现存信息生成一个默认的 `package.json`, 一个很大的特点是它会遍历` node_modules` 去找出当前已经安装的依赖包.

- `name`: the current directory name
- `version`: always `1.0.0`
- `description`: info from the readme, or an empty string `""`
- `main`: always `index.js`
- `scripts`: by default creates an empty `test` script
- `keywords`: empty
- `author`: empty
- `license`: [`ISC`](https://opensource.org/licenses/ISC)
- `bugs`: info from the current directory, if present
- `homepage`: info from the current directory, if present

## 4. `registry`

`registry `注册表是npm提供的一个查询服务, 官方的查询地址是[https://registry.npmjs.org/](https://registry.npmjs.org/), 这个网址后面跟上模块名就能得到一个`json`对象, 里边是该模块所有版本的信息, 比如可以尝试点击 [https://registry.npmjs.org/react](https://registry.npmjs.org/react).就能看到react所有版本的信息, 它跟下面的命令效果相似:

```bash
npm view react;
npm show react;
npm info react;
```

返回的`json`对象里,有一个`dist.tarball`属性, 是该版本压缩包的地址:

```json
"dist": {
  "shasum": '2a57c2cf8747b483759ad8de0fa47fb0c5cf5c6a',
  "tarball": 'http://registry.npmjs.org/react/-/react-0.14.6.tgz' 
},
```

到这个网址下载压缩包，在本地解压，就得到了模块的源码。`npm install`和`npm update`命令，都是通过这种方式安装模块的。

## 5. 模块的安装过程

1. 发出`npm install`命令

2. `npm` 向 `registry` 查询模块压缩包的网址
3. 下载压缩包,存放在`~/.npm`下
4. 解压压缩包到当前 `node_modules` 目录

注意，一个模块安装以后，本地其实保存了两份。一份是`~/.npm`目录下的压缩包，另一份是`node_modules`目录下解压后的代码。但是，运行`npm install`的时候，只会检查`node_modules`目录，而不会检查`~/.npm`目录。也就是说，如果一个模块在`～/.npm`下有压缩包，但是没有安装在`node_modules`目录中，npm 依然会从远程仓库下载一次新的压缩包。

## 6. 版本语义化 `semantic versioning`

`package.json`中的版本号一共有四个部分

- 主版本号：一般为 ***不兼容上个版本的大修改***
- 次版本号：一般为 ***增加了新功能，并且可以向后兼容***
- 修订版本号：一般为 ***有bug修复，并且可以向后兼容***
- 日期版本号加希腊字母版本号：希腊字母一共有五个[`base`, `alpha`, `beta`, `RC`, `release`]

```json
{
    "dependencies": {
        "aaa": ">=1.0.2 <2.1.2",	// 必须大于等于1.0.2版本且小于2.1.2版本
        "bbb": "2.3.1",	// 必须匹配这个版本
        "ddd": "~2.3.1",	// 约等于2.3.1，只更新最小版本，相当于2.3.X，即>=2.3.1 <2.4.0
        "ddd": "^2.3.1",	// 与2.3.1版本兼容，相当于2.X.X, 即>=2.3.1 < 3.0.0,不改变大版本号。
        "eee": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0", // 多种混合
        "fff": "http://asdf.com/asdf.tar.gz",   // 在版本上指定一个压缩包的url，当执行npm install 时这个压缩包会被下载并安装到本地。
        "ggg": "latest",	// 安装最新版本
        "hhh": "file:../dyl",	// 使用本地路径
        "iii": "git://github.com/user/project.git#commit-ish"	// 使用git URL加commit-ish
    }
}
```

<!-- more -->
