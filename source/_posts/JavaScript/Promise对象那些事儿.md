---
title: Promise对象那些事儿
tags: [JavaScript, Promise]
categories: JavaScript
date: 2019-10-01 20:02:06
---

Promise是异步编程的一种解决方案，比传统的解决方案————回调函数和事件————更合理和更强大。所谓promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，promise是一个对象，从它可以获取异步操作的消息。

Promise对象有以下两个特点
* (1). 对象的状态不受外界的影响。Promise有三种状态：pending(进行中)、fulfilled(已成功)和rejected(已失败)。只有异步操作的结果，可以决定当前是哪一种状态，任何操作都无法改变这种状态
* (2). 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise的状态改变，只有两种可能，从pending变为fulfilled和从pending变为rejected.

# 1. 基本用法

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject,它们是两个函数，由JavaScript引擎提供，不用自己部署：

* resolve函数的作用是，将Promise的状态从未完成变为成功，并将异步操作的结果，作为参数传递出去
* reject函数的作用是，将Promise的状态，从未完成变为失败，并将异步操作的结果，作为参数传递出去

注意调用resolve或者reject并不会终止程序的执行，其后面的代码依然可以继续执行

```javascript
// 生成实例
const promise = new Promise(function (resolve, reject) {
    // ... some code

    if (true) {
        resolve(value)
    } else {
        reject(value)
    }
})

// 调用
promise.then(function (value) {
    // success
}, function (error) {
    // failure
})
```

封装一个异步加载图片和异步Ajax请求的例子

```javascript
// 异步加载图片
function loadImgAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = function() {
            resolve(img);
        }
        img.onerror = function() {
            reject(new Error('load image error'));
        }
    })
}

// 异步Ajax请求
const getJSON = function (url) {
    const promise = new Promise((resolve, reject) => {
        const handle = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.state === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
        const client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handle;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    });
    return promise;
}
```

在上面例子中，resolve函数和reject函数都带有参数。其中，resolve函数的参数除了正常的值以外，还可能是另一个Promise实例，如下：

```javascript
const p1 = new Promise((resolve, reject) => {
    // ...code
})
const p2 = new Promise((resolve, reject) => {
    // ...code
    resolve(p1);
})
```

上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

## 2. Promise.prototype.then()

Promise实例具有then方法，该方法第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例），因此可以采用链式写法：

```javascript
getJSON("/post.json").then(function(json) {
    return json.post;
}).then(function(post) {
    // ...
})
```

采用链式的then,可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象，这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```

上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。

## 3. Promise.prototype.catch()

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。

如果Promise状态已经变成resolved，再抛出错误是无效的。如下代码：Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
```

如果Promise状态已经变成resolved，再抛出错误时无效的。因为Promise的状态一旦改变，就不会再改变了。

Promise对象的错误哦具有“冒泡”性质，会一直向后传递，知道被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

一般来说，不要在then方法里面定义reject状态的回调函数（即then的第二个函数），总是使用catch方法

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

## 4. Promise.prototype.finally

finally方法用于指定不管Promise对象最后的状态如何，都会执行的操作。该方法是ES2018引入标准的。

该方法一般用于处理最后的操作，如清除缓存，关闭连接等。

```javascript
promise.then(result => {
    // ...
}).catch(error => {
    // ...   
}).finally(() => {
    // ...
})
```

finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

finally本质上是then方法的特例。

```javascript
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

## 5. Promise.all()

Promise方法用于将多个Promise实例，包装成一个新的Promise实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```
p的状态由p1、p2、p3决定，分成两种情况。

* （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

* （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

## 6. Promise.race()

Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

## 7. Promise.resolve()

将现有对象转为Promise对象

```javascript
Promise.resolve('foo')  
// 等价于
new Promise(resolve => resolve('foo'));
```

当参数是一个Promise实例时，该方法原封不对地返回这个实例；当参数是一个thenable对象时，它会将其转为Promise对象，然后立即执行thenable对象的then方法；当参数不是具有then方法的对象，或者根本不是对象，它会返回一个新的Promise对象，状态为resolved；当其参数为空时，直接返回一个resolved状态的Promise对象。

## 8. Promise.reject()

与上类似，该方法会返回一个新的Promise实例，该实例的状态为rejected。



# 原理

<!-- more -->
