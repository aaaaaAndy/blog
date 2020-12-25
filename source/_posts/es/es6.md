---
title: es6
date: 2020-12-24 10:15:24
tags: [ES, ES6, JavaScript]
categories: ES
---

# ES6

## 1. `let`和`const`	

`var`是传统上的函数作用域。ES6`推荐使用`let`声明局部变量，`const`声明常量，两者都为块级作用域。

1.  `let`用法

    ```javascript
    var name = 'andy';
    
    {
      // let声明局部变量
      let name = 'qiqi';
      console.log(name);  // qiqi
    }
    
    console.log(name);  // andy
    ```

2.  `const`用法

    ```javascript
    const name = 'andy';
    name = 'qiqi';  // 报错，不可被修改
    
    const person = { name: 'andy' };
    person.name = 'qiqi';  // 可以被修改
    ```

由`const`声明的变量都会被认为是常量，即它的值被设置完成后就不能再修改了，但是如果`const`是一个对象，对象所包含的值是可以被修改的。抽象点说，就是对象所指向的地址没有变。

以下几点需要注意：

-   `let`关键字声明的变量不具备变量提升特性；
-   `let`和`const`声明只在最靠近的一个块中有效；
-   `const`在声明时必须被赋值

## 2. 函数相关

### 2.1 箭头函数

>   ES6中，箭头函数是函数的一种简写形式。使用括号包裹参数，跟随一个 =>，紧接着是函数体；

箭头函数的三个特点：

-   不需要`function`关键字来创建函数
-   可以省略`return`关键字
-   没有自己的`this`，继承当前上下文的`this`

```javascript
[1, 2, 3].map(x => x + 1);
```

### 2.2 函数默认值

在参数括号内直接设置默认值

```javascript
function Person(name = 'andy', age = 12) {
  this.name = name;
  this.age = age;
}
```

### 2.3 `Spread/Rest`操作符

```javascript
// restParams代表剩下所有的参数
function print(a, b, ...restParams) {
  console.log(restParams);
}

print(1, 2, 3, 4); // [3, 4]
```

## 3. 模板字符串

在`ES6`之前我们用`+`来拼接字符串，但是在`ES6`中，可以使用``反引号来使用模板字符串

```javascript
// ES5
var name = 'andy';
var age = '12'
var person = '我是' + name + '我今年' + age + '岁了'

// ES6
const name = 'andy';
const age = '12';
const person = `我是${name}我今年${age}岁了`;
```

## 4. 对象和数组的解构

1.  对象解构

    ```javascript
    const person = {
      name: 'andy',
      age: 11,
    }
    
    const { name, age } = person;
    console.log(name);  // andy;
    console.log(age):  // 12;
    ```

2.  数组解构

    ```javascript
    const persons = ['andy', 'qiqi'];
    const [boy, girl] = persons;
    console.log(boy);  // andy;
    console.log(girl);  // qiqi;
    ```

## 5. `for...in`和`for...of`

1.  `for...in`：用来遍历对象中的属性

    ```javascript
    // 对象的遍历
    const person = {
      name: 'andy',
      age: 12
    }
    
    for(let key in person) {
      console.log(key);  // name, age
    }
    
    // 数组的遍历
    const ages = [12, 13];
    
    for(let key in ages) {
      console.log(key);  // 0, 1
    }
    ```

2.  `for...of`：用来遍历一个迭代器

    ```javascript
    // 数组的遍历
    const ages = [12, 13];
    
    for(let key of ages) {
      console.log(key);  // 12, 13
    }
    ```

    `for...of`不能用来遍历对象，这是因为`ES6`中引入了`Iterator`，只有提供了`Iterator`接口的数据类型才可以使用`for...of`来循环遍历，而`Array`, `Set`, `Map`，某些类数组默认都提供了`Iterator`接口，所以它们可以使用`for...of`来进行遍历。

## 6. `class`

`ES6`中支持`class`语法，不过，`ES6`的`class`不是新的对象继承模型，它只是原型链的语法糖表现形式。

```javascript
class Person {
  constructor() {
    console.log('i am andy');
  }
  
  run() {
    console.log('run');
  }
}

const person = new Person(); // i am andy
person.run(); // run
```

有几点值得注意：

-   类的声明不会提升，如果要使用某个`class`，必须在使用之前定义它，否则会报错
-   在类中定义函数不需要使用`function`关键字
-   类可以通过`extends`继承一个父类，但是子类的`constructor`中需要执行`super()`函数

## 7. `module`

导入模块是通过`import...from...结构完成的`：

```javascript
import React from 'react';

export const name = 'andy';
```



## `Map`和`Set`



## `Proxy`



## `Reflect`

<!-- more -->

