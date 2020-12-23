---
title: JavaScript同步与异步
tags: [JavaScript]
categories: JavaScript 
date: 2019-07-11 20:02:06
---

## 1. 定义

JavaScript是一个***单线程***的语言，就像一条流水线，但也仅仅是一条流水线，不能同时进行多个任务和流程。它之所以是单线程，与它的用途有关，作为浏览器的脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM，这决定了它只能是单线程的，否则会带来很复杂的同步问题。

所谓***同步***和***异步***做事情的时候都是只有一条流水线，同步和异步的差别就在于这条流水线上各个流程的执行顺序不同。

所有任务可以分成两种，同步和异步：
* 同步任务（synchronous）：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。
* 异步任务（asynchronous）：不进入主线程、而进入"任务队列"（task queue）的任务，只有等主线程任务执行完毕，"任务队列"开始通知主线程，请求执行任务，该任务才会进入主线程执行。

## 2. 同步

JavaScript中大部分都是同步编程：

```javascript
// for循环就是同步编程，只有循环结束后，才会继续执行下面的代码
for (var i = 0; i < 10000; i++) {
    console.log(i); 
} 

console.log('over');
```

```javascript
while (true) {
    
} 

console.log('over');    // 永远不会执行，因为上面的循环是死循环，循环永远不会结束。
```

## 3. 异步

JavaScript只有在以下四种情况下是异步的：
* 定时器： setTimeout 和 setInterval
* 事件绑定
* Ajax读取数据
* 回调函数

### 1. 定时器

```javascript
setTimeout(() => {
    console.log(111);
}, 0);

console.log(222);
```

以上代码会先输出222再输出111，尽管设置了定时器的延时是0，但是箭头函数还是会被放入一个队列中，等待下一个执行机会，而主线程的代码只会在有空闲的时候才会去查看队列中是否有需要执行的函数，具体来说，其运行机制如下：

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

### 2. 事件绑定

```javascript
$(selector).click(function() {
  console.log('click');
})
```

只要指定过这些事件的回调函数，这些事件发生时就会进入任务队列，等待主线程读取。

### 3. Ajax读取函数

```javascript
// Ajax内部实现
xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'http://www.baidu.com', true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(data) {
  if (xmlhttp.readyState === 4) {
      console.log(data);
  } 
}
```

XMlHttpRequest对象发起请求，设置回调函数用来处理xmlhttp的readystatechnage事件。然后执行xmlhttp的send方法。在xmlhttp运行中，当其属性readyState改变时readystatechange事件就会被触发，只有在xmlhttp从远端服务器接收响应结束时回调函数才会触发执行。也就是如下：

### 4. 回调函数

回调函数即是那些被主线程挂起来的函数，异步任务必须指定回调函数，当主线程开始执行异步任务时，就是执行对应异步任务的回调函数。例如定时器中传入的匿名函数，事件绑定传入的匿名函数，还有Ajax中的success, complete指定的函数等。

<!-- more -->
