---
title: Object的那些函数
tags: [JavaScript, Object]
categories: JavaScript
date: 2018-12-23 20:02:06
---

在JavaScript中，万物皆对象!

# 1. 原型方法

![object-prototype](/images/object-prototype.png)

其中，constructor, toString, toLocalString, valueOf方法是Object原型的原始方法，鉴于万物皆对象的原则，所以在JavaScript中的其他类型都会存在着几种属性。

## 1. constructor

原型对象有一个constructor属性，指向该原型对象对应的构造函数。

```javascript
Object.prototype.constructor === Object;    // true
```

## 1. toString()

toString() 用来返回对象的字符串表示，如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象类型。鉴于此特性，可用来判断一个对象的具体类型。

```javascript
console.log(Object.prototype.toString.call(123))            //[object Number]
console.log(Object.prototype.toString.call('123'))          //[object String]
console.log(Object.prototype.toString.call(undefined))      //[object Undefined]
console.log(Object.prototype.toString.call(true))           //[object Boolean]
console.log(Object.prototype.toString.call({}))             //[object Object]
console.log(Object.prototype.toString.call([]))             //[object Array]
console.log(Object.prototype.toString.call(function(){}))   //[object Function]
```

## 2. toLocalString()

toLocaleString() 返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。它实际返回调用toString()的结果。

## 3. valueOf()

valueOf() 方法返回指定对象的原始值。

默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。

```javascript
var arr = [1, 2, 3];
console.log(arr.valueOf() === arr);     // true
```

## 4. isPrototypeOf()

测试一个对象是否存在于另一个对象的原型链上

```javascript
let obj = new Object();
Object.prototype.isPrototypeOf(obj);    // true
```

## 5. hasOwnProperty()

用来判断某个对象是否含有指定的属性，只有当属性存在于实例中时才返回true

```javascript
let obj = {
    name: 'aaa',
    age: 12
}
obj.hasOwnProperty('name');             // true
```

## 6. in 操作符

只要通过对象能够访问给定属性时就会返回 true ，无论属性存在于实例还是在原型中。

***该方式可与 hasOwnProperty() 方法结合使用来判断属性是存在于实例上还是原型上。***

```javascript
let obj = {
    name: 'aaa',
    age: 12
}
'name' in obj            // true 该属性存在于obj的实例中
'constructor' in obj     // true 该属性存在于obj构造函数的原型中
```

## 7. getOwnPropertyNames()

返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

```javascript
let obj = {
    name: 'aaa',
    age: 12
}
Object.getOwnPropertyNames(obj);        // ['name', 'age']
```

<!-- more -->


