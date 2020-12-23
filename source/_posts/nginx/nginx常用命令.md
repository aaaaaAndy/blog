---
title: nginx常用命令
tags: [nginx]
categories: nginx 
date: 2020-04-05 17:45:02
---

## 1. 安装

#### 1. windows系统

去到[nginx官网下载页](https://nginx.org/en/download.html)下载对应版本即可

#### 2. MaxOS系统

```shell
$ brew install nginx
```

#### 3. Linux系统

- 通过rpm镜像源安装

```shell
$ rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
$ yum install -y nginx
```

- 手动解压安装

```shel
$ yum install pcre pcre-devel  
$ yum install zlib zlib-devel
$ yum install gcc-c++
$ yum install openssl openssl-devel
$ wget -c https://nginx.org/download/nginx-1.16.0.tar.gz
$ tar -zxvf nginx-1.16.0.tar.gz
$ cd nginx-1.16.0
$ ./configure  # 默认安装在/usr/local/nginx 
$ make && make install
$ ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/nginx
```



## 2. 卸载

主旨：删除nginx目录即可

- yun方式安装的nginx

```shell
$ yum remove nginx
```

- 手动卸载

```shell
$ rm -rf /etc/nginx/
$ rm -rf /usr/sbin/nginx
$ rm /usr/share/man/man1/nginx.1.gz
$ apt-get remove nginx*
```



## 3. 命令

#### 1. 常用命令

- nginx启动

```shell
$ nginx
$ ./nginx
$ nginx -c /etc/nginx/nginx.conf			# 指定配置文件的启动
```

- nginx关机

```shell
$ nginx -s stop			# 快读关闭nginx，不保存相关信息，立即结束web服务
$ nginx -s quit			# 平滑关闭nginx，保存相关信息，有安排地结束web服务，即处理完所有请求后再关闭
```

- 重启nginx服务

```shell
$ nginx -s reopen
```

- 平滑启动（即不关机重新加载配置文件）

```shel
$ nginx -s reload  // 全局任何一个位置都可以使用
$ ./nginx -s reload  // 需要在nginx/sbin目录下使用
```

- 查看进程号

```shell
$ ps -ef | grep nginx
```

- 杀死进程

```shell
$ kill -QUIT xxxid
```

- 校验配置文件是否正确

```shell
$ nginx -t /etc/nginx/nginx.conf
```

- 查看nginx版本信息

```shell
$ nginx -v			# 显示版本信息并退出
$ nginx -V			# 显示版本信息和配置信息并退出
```

- 查看帮助信息

```shell
$ nginx -h,-?
```



#### 2. 命令参数

| 参数  | 功能                                                         |
| ----- | ------------------------------------------------------------ |
| -?,-h | 打开帮助信息                                                 |
| -v    | 显示版本信息并退出                                           |
| -V    | 显示版本和配置选项信息，然后退出                             |
| -t    | 检测配置文件是否有语法错误，然后退出                         |
| -q    | 在检测配置文件期间屏蔽非错误信息                             |
| -s    | 给一个 nginx 主进程发送信号：stop（强制停止）, quit（优雅退出）<br />, reopen（重启）, reload（重新加载配置文件） |
| -p    | 设置前缀路径（默认是：/usr/share/nginx/）                    |
| -c    | 设置配置文件（默认是：/etc/nginx/nginx.conf）                |
| -g    | 设置配置文件外的全局指令                                     |

<!-- more -->
