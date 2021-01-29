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

### 6.1 语法糖

`ES6`中支持`class`语法，不过，`ES6`的`class`不是新的对象继承模型，它只是原型链的语法糖表现形式，它的绝大部分功能，`ES5`都可以做到。新的`class`写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已。

```javascript
class Person {
  constructor() {
    console.log('i am andy');
  }
  
  run() {
    console.log('run');
  }
}

// 使用new命令对类进行实例化，跟构造函数的用法完全一致
const person = new Person(); // i am andy
person.run(); // run
```

构造函数的`prototype`属性，在`ES6`的类上面继续存在。事实上，类的所有方法都定义在类的`prototype`上。

### 6.2 属性不可枚举

另外，类内部所有定义的方法，都是不可枚举的，这点与`ES5`不一样，如果是以`ES5`定义的构造函数，则其内部的属性都是可枚举的：

```javascript
class Person {
  constructor() {
    console.log('andy');
  }
  
  run() {
    console.log('run');
  }
}

Object.keys(Person.prototype);  // []
Object.getOwnPropertyNames(Person.prototype); // ['constructor', 'run']
```

### 6.3 `constructor`方法

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，系统会自动加上一个默认的`constructor`方法。

`constructor`方法默认返回实例对象`this`，也可以指定返回另外一个对象。

```javascript
class Person {
  constructor() {
    return { name: 'andy' };
  }
}

const aa = new Person();
console.log(aa); // { name: 'andy' }
```

### 6.4 原型

与`ES5`一样，实例的属性除非显示定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。

```javascript
class Person {
  constructor(name, age) {
    // name和age定义在this对象上，即实例上
    this.name = name;
    this.age = age;
  }
  
  // run方法定义在原型上
  run() {
    console.log('run');
  }
}

const person = new Person('andy', 12);

person.hasOwnProperty('name'); // true
person.hasOwnProperty('age'); // true
person.hasOwnProperty('run'); // false

person.__proto__.hasOwnProperty('run'); // true
```

>   `__proto__`并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，目前虽然在很多现代浏览器的`JS`引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，可以使用`getPrototypeOf`方法来获取实例对象的原型，然后再来为原型添加方法/属性。

### 6.5 取值函数`(getter)`与存值函数`(setter)`

与`ES5`一样，在类内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  
  get name() {
    return this._name;
  }
  
  set name(name) {
    this._name = name;
  }
}
```

### 6.7 属性表达式

类的属性名，可以采用表达式：

```javascript
const action = 'run';

class Person {
  constructor() {}
  
  [action]() {
    console.log('run');
  }
}
```

### 6.8 静态方法

`static`用来定义类的静态方法，类的静态方法不会被实例所继承，只能通过类直接调用。如果静态方法中有`this`，则此`this`指向这个类，而不是其实例，

子类可以继承父类的静态方法。

静态方法可以与非静态方法重名。

### 6.9 类的继承

`Class`可以通过`extends`关键字实现继承，这比`ES5`通过修改原型链实现继承要清晰和方便。

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的梳理属性和方法。如果不调用`super`方法，子类就得不到 `this`对象。

如果`super`作为对象，用在静态方法之中，这是`super`将指向父类，而不是父类的原型对象。



有几点值得注意：

-   类内部默认就是严格模式，所以不需要使用`use strict`指定运行模式；
-   类的声明不会提升，如果要使用某个`class`，必须在使用之前定义它，否则会报错；
-   在类中定义函数不需要使用`function`关键字；
-   类可以通过`extends`继承一个父类，但是子类的`constructor`中需要执行`super()`函数；
-   类必须使用`new`关键字创建实例，不可直接执行，这点与`ES5`的构造函数不同；
-   

## 7. `module`

在`ES6`之前，`JavaScript`一直没有模块`(module)`体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。不过社区指定了一些模块加载方案，最主要的有`CommonJS`和`AMD`两种，前者用于服务器，后者用于浏览器。在`ES6`中提供了一个标准的模块加载方案，主要通过`export`和`import`实现：

### 7.1 加载时机（编译时or运行时）

#### 7.1.1 运行时加载

`CommonJS`和`AMD`模块，都只能在运行时确定模块的依赖关系。比如，`CommonJS`模块就是对象，输入时必须查找对象属性：

```javascript
// CommonJS模块
let { stat, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let readfile = _fs.readfile;
```

上面代码实质是整体加载`fs`模块，生成一个对象`_fs`，然后再从这个对象上面读取3个方法。这种加载成为“**运行时加载**”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

#### 7.1.2 编译时加载

`ES6`模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。`ES6`模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入：

```javascript
// ES6模块
import { stat, readfile } from 'fs';
```

上面代码的是实质是从`fs`模块加载两个方法，其他方法不加载。这种加载成为“**编译时加载**”，或者静态加载，即`ES6`可以在编译时就完成模块加载，效率要比`CommonJS`模块的加载方式高。当然，这也导致了没法引用`ES6`模块本身，因为它不是对象。

除了静态加载带来的各种好处，`ES6`模块还有以下好处：

-   不再需要`UMD`模块格式了，将来服务器和浏览器都会支持`ES6`模块格式。目前，通过各种工具库，其实已经做到了这一点。
-   将来浏览器新`API`就能用模块格式提供，不再必须做成全局变量或者`navigator`对象的属性。
-   不再需要对象作为命名空间，未来这些功能可以通过模块提供。

`ES6`的模块自动采用严格模式，不管你有没有在模块头部加上`'use strict'`

### 7.2 `export`

`export`命令主要用于规定模块的对外接口。

```javascript
// 方法1
export var name = 'andy';
export var age = 12;
```

```javascript
// 方法2
var name = 'andy';
var age = 12;

export { name, age };
```

上面两种`export`的使用方法都是正确的，`ES6`都会将当前文件视为一个模块，里边使用`export`对外暴露了两个变量。从可读性上来说更推荐方法2的写法，因为这种写法把所有的输出同一放文件最后，能一目了然看到当前文件都输出了哪些变量。

不只是变量，`export`也可用于输出方法和类：

```javascript
function run() {
  // code...
}

export { run };
```

```javascript
class Person {
  // code ...
}

export { Person };
```

通常情况下，`export`输出的变量或者方法名就是该文件模块对外暴露的属性，但是也可以用`as`关键字进行重命名。

```javascript
function v1() {};
function v2() {};

export {
	v1 as getAge,
  v2 as getName,
  v2 as getInfo,
}
```

另外，`export`输出的变量，与其对应的值是动态绑定关系，即通过该变量，可以获取到模块内部实时的值。这一点与`CommonJS`完全不同，`CommonJS`输出的是值的缓存，不存在动态更新。

最后，`export`模块只能放模块顶层，不能放入块级作用域或者方法中，否则会报错，这是因为处于条件代码块之中的`export`，没法做静态优化。

```javascript
function getName() {
  export var name = 1;
}

getName();
// 会报错
```

### 7.3 `import`

`import`命令主要用于引入其他模块提供的功能。使用`export`进行导出的接口，在其他文件中可以使用`import`进行引入。需要注意的是`import`引入的接口名必须与`export`导出的接口名一致，否则会报错，当然，也可以通过`as`关键字进行重命名：

```javascript
// 正常引入
import { getNamem, age } from 'person';

// 通过as关键字进行重命名
import { getName as getInfo } from 'person';
```

上面代码，通过`import`导入的`age`是一个属性接口，是只读的，如果在当前文件修改`age`的值是不被允许的，但是如果`age`是一个对象的话，是可以修改其属性的，不过需要注意的一点是，这里的修改会反应到`person`模块中，当其他模块引入了`age`这个接口后，也会获取更新后的值，所以这种做法是不被推荐的。除非你想做一些全局变量。

注意：`import`命令具有提升效果，会提升到整个模块的头部，首先执行：

```javascript
foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为`import`的执行早于`foo`。这种行为的本质是，`import`命令是编译阶段执行的，在代码之前。也正是因为`import`是静态执行，所以不能使用变量和表达式，这些只能在运行时才能拿得到结果的语法解构。

最后，`import`语句会执行所加载的模块，如下：

```javascript
import 'lodash';
import 'lodash'
```

上面的代码仅仅执行`lodash`模块，但是不输入任何值。如果多次重复执行同义句`import`，那么只会执行一次，而不会执行多次，即`import`是一个单例模式（`Singleton`）。

### 7.4 模块的整体加载

除了指定某项输入值，还可以整体加载一个模块，要使用`*`指定一个对象，所有的输出值都会加载到这个对象上。

```javascript
import * as person from 'person';
```

### 7.5 `export default`

`export default`用于为模块指定默认输出，

```javascript
export default function getName() {
  // code ...
}
```

上面的代码未当前文件模块默认导出了一个方法`getName`，由此方法进行导出，引入的时候不用关心接口名，可以直接重命名：

```javascript
import getUserName from 'person';
```

本质上，一个模块只能有一个`export default`，这也是为了通过`export default`导出的接口不需要使用大括号的原因。另一个本质是通过`export default`导出的接口默认接口名为`default`，即使是`export default`后边跟了方法名或者变量名，其与不跟的情况是一样的，所以在外部引入的时候可以随意重命名该接口。

一个模块文件只能有一个`export default`，但是同时可以存在多个`export`，所以引入时可以同时引入：

```javascript
export default React;
export {
	Component,
  createRef,
}
```

```javascript
import React, { Component } from 'react';
```

### 7.6 `export`与`import`结合

```javascript
// 方法1
export { getName, getAge } from 'person';

// 可以理解为
import { getName, getAge } from 'person';
export { getName, getAge };
```

上面代码方法1中，`export`与`import`结合使用，需要注意的是，此种引入导出方法，`getName`与`getAge`并没有在此文件中引入，只是对外转发了这两个方法，所以此文件不能使用者两个方法。

1.  模块的接口改名，可以采用下面方法：

```javascript
export { getAge as getInfo } from 'person';
```

2.  模块的整体输出：

```javascript
export * from 'person';
```

3.  默认接口的写法如下：

```javascript
export { default } from 'person';
```

4.  具体接口名改为默认接口：

```javascript
export { getName as default } from 'person';
```

5.  默认接口改为具体接口名：

```javascript
export { default as getName } from 'person';
```

6.  整体导出改为接口名：

    在`ES2020`之前，这种`import`语句，没有复合写法：

```javascript
import * as personMethod from 'person';
```

`ES2020`补上了这种写法:

```javascript
export * as personMethod from 'person';

// 等同于
import * as personMethod from 'person';
export { personMethon };
```

### 7.7 模块的继承

模块也是可以继承的。

```javascript
export * from 'circle';
export var name = 'andy';
export default function getName(){}
```

## 8. `Map`和`Set`

### 8.1 `Map`

#### 8.1.1  基本用法

`ES6`提供了一个新的数据结构`Set`，它类似于数组，但是成员的值都是唯一的，没有重复值。

```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(3);

console.log(set.size);
```

```javascript
const set = new Set([1, 2, 3, 4, 5]);
const docSet = new Set(document.querySelectorAll('div'));
```

向`Set`加入值的时候，不会发生类型装换，所以5和'5'是两个不同的值。`Set`内部判断两个值是否相等，使用的算法类似于'==='运算符，主要区别是向`Set`加入值时认为`NaN`等于自身，而精确相当运算认为`NaN`不等于`NaN`，另外，两个对象总是不等的。

#### 8.1.2 `Set`实例的属性和方法

-   `Set.prototype.constructoy`： `Set`的构造函数；
-   `Set.prototype.size`：返回`Set`实例的成员总数；
-   `Set.prototype.add(value)`：添加某个值，返回`Set`解构本身；
-   `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功；
-   `Set.prototype.has(value)`：返回一个布尔值，表示该值是否是`Set`的成员；
-   `Set.prototype.clear()`：删除所有成员，没有返回值；
-   `Set.prototype.keys()`：返回键名的遍历器；
-   `Set.prototype.values()`：返回兼职的遍历器；
-   `Set.prototype.entries()`：返回键值对的遍历器；
-   `Set.prototype.forEach()`：使用回调函数遍历每个成员；

由于`Set`解构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。

### 8.2 `WeakSet`

#### 8.2.1 含义

`WeakSet`解构与`Set`类似，也是不重复的值的集合，但是，它与`Set`有两个区别：

1.  `WeakSet`的成员只能是对象，而不能是其他类型的值；
2.  `WeakSet`中的对象都是弱引用，即垃圾回收机制不考虑`WeakSet`对该对象的引用。如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

鉴于`WeakSet`的特殊机制，所以其内部只适合临时存放一组对象，或者跟对象绑定的信息（比如DOM节点信息） ，只要这些对象在外部小时，它在`WeakSet`里面的引用就会自动消失。所以`WeakSet`的成员是不适合应用的，因为它随时会消失。另外，由于`WeakSet`内部有多少个成员，取决于内部垃圾回收机制什么时候运行，运行前后的成员数可能是不同的，而垃圾回收机制何时运行是不可预测的，所以`ES6`规定`WeakSet`不可遍历。

#### 8.2.2 方法

-   `WeakSet.prototype.add(value)`：向`WeakSet`实例添加一个成员；
-   `WeakSet.prototype.delete(value)`：删除一个成员；
-   `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在`WeakSet`实例之中。

### 8.3 `Map`

#### 8.3.1 基础含义

`JavaScript`的对象，本质上是键值对的集合，但是传统上只能用字符串作为`key`值。而`ES6`解除了这种限制，它的键值可以为任何类型的值，实现了真正意义上的值-值的集合。

```javascript
const map = new Map();
const obj = { name: 'andy' };

map.set(obj, 'person');
map.get(obj); // person

map.has(obj); // true
map.delete(obj); // true
map.has(obj); // false
```

`Map`构造函数接受数组以及任何具有`Iterator`接口的数据结构作为参数，生成一个新的`Map`实例。

1.  数组作为参数

```javascript
const items = [
  ['name', 'andy'],
  ['age', 12]
];

const map = new Map(items);
```

2.  `set`实例作为参数

```javascript
const set = new Set([
  ['name', 'andy'],
  ['age', 12]
])

const map = new Map(set);
```

3.  `map`实例作为参数

```javascript
const params = new Map();
params.set('namd', 'andy');
params.set('age', 12);

const map = new Map(params);
```

由上可知，`Map`的键实际上跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞的问题。`Map`同样将`NaN`视为同一个键。

#### 8.3.2 方法

-   `Map.prototype.size`：返回`Map`解构的成员总数；
-   `Map.prototype.set(key, value)`：设置一组键值对；
-   `Map.prototype.get(key)`：返回`key`对应的`value`值；
-   `Map.prototype.has(key)`：判断是否在当前`map`对象中；
-   `Map.prototype.delete(key)`：删除某个`key`值；
-   `Map.prototype.clear()`：清除整个`map`；
-   `Map.prototype.keys()`：返回键名的遍历器；
-   `Map.prototype.values()`：返回键值的遍历器；
-   `Map.prototype.entries()`：返回所有成员的遍历器；
-   `Map.prototype.forEach()`：遍历`Map`的所有成员；

`Map`转为数组最方便的方法，就是使用扩展运算符(...)

#### 8.3.3 数据结构互相转换

1. `Map`转为数组

    ```javascript
    const map = new Map([
      ['name', 'andy'],
      ['age', 12]
    ]);
    
    console.log([...map]);
    ```

2. 数组转为`Map`

    ```javascript
    const map = new Map([
      ['name', 'andy'],
      ['age', 12]
    ]);
    ```

3. `Map`转对象

    如果所有`Map`的键都是字符串，它可以无损地转为对象。

    ```javascript
    function mapToObj(map) {
    	var result = {};
    
    	for (let [key, value] of map) {
    		result[key] = value;
    	}
    
    	return result;
    }
    
    var map = new Map([
    	['name', 'andy'],
    	['age', 12]
    ])
    
    var bb = mapToObj(map);
    ```

4. 对象转`Map`

    对象转`Map`可以通过`Object.entries`，当然也可以自己实现一个转换函数。

    ```javascript
    // 方法一
    const person = { name: 'andy', age: 1 };
    const map = new Map(Object.entries(person));
    
    // 方法二
    function objToMap(obj) {
    	var map = new Map();
    
    	for (let key of Object.keys(obj)) {
    		map.set(key, obj[key]);
    	}
    
    	return map;
    }
    ```

5. `Map`转`JSON`

    `Map`转为`JSON`要区分两种情况，一种情况是，`Map`的键名都是字符串，这时可以选择转为对象`JSON`，另一种情况是，`Map`的键名有非字符串，这时可以选择转为数组`JSON`。

    ```javascript
    function mapToJSON(map) {
      return JSON.stringify(mapToObj(map));
    }
    ```

    ```javascript
    function mapToJSON(map) {
      return JSON.stringify([...map]);
    }
    ```

6. `JSON`转`Map`

    正常情况下，`JSON`都可以转为`Map`。

    ```javascript
    function JSONToMap(json) {
      return objToMap(JSON.parse(json));
    }
    ```

### 8.4 `WeakMap`

#### 8.4.1 含义

`WeakMap`与`Map`解构类似，也是用于生成键值对的集合。他们也有两个区别点

1.  `WeakMap`只接受对象作为键名（`null`除外），其他类型不接受。
2.  `WeakMap`的键名所指向的对象，不计入垃圾回收机制。

`WeakMap`的设计目的在于，有时我们想在对啊ing上面存放一些数据，但是这会行程对于这个对啊ing的引用。一旦不再需要这个对象，我们要必须删除这个应用，否则垃圾回收机制就不会释放其占用的内存。

它最适用的情况还是`DOM`的处理

```javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

#### 8.4.2 语法

`WeakMap`与`Map`在API上的区别主要有两个；

1.  没有遍历操作，即没有`keys`，`values`，`entries`方法，也没有`size`属性，这也是因为不知道何时才会运行垃圾回收机制，其内部的数量有可能会变化。
2.  无法清空，即不支持`clear`方法

#### 8.4.3 `API`

`WeakMap`只有四个方法可以用：

1.  `get()`
2.  `set()`
3.  `has()`
4.  `delete()`

## 9. `Proxy`

### 9.1 基础

`Proxy`用于修改某些默认的操作行为。可以理解为，在目标对象之前架设一层“拦截”，外接对该对象的访问，都必须经过这层拦截。`Proxy`这个词原意是代理，用在这里表示由他来“代理”某些操作，可以译为“代理器”。

```javascript
const obj = new Proxy({}, {
	get(target, propKey, receiver) {
		console.log('get:', target, propKey);
		return Reflect.get(target, propKey, receiver);
	},
	set(target, propKey, value, receiver) {
		console.log('set:', target, propKey, value, receiver);
		Reflect.set(target, propKey, value);
	}
})
```

`Proxy`对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法，其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数用来定制拦截行为。

### 9.2 拦截操作

`Proxy`支持的拦截操作一共有13中：

-   `get(target, propKey, receiver)`：拦截对象属性的读取；
-   `set(target, propKey, value, receiver)`：拦截对象属性的设置；
-   `has(target, propKey)`：拦截`propKey in proxy`的操作，返回一个布尔值；
-   `delete(target, propKey)`：拦截`delete proxy[propKey]`的操作，返回一个布尔值；
-   `ownKeys(target)`：拦截`Object.getOwnPropertyNames(proxy)`，`Object.getOwnPropertySymbols(proxy)`，`Object.keys(proxy)`， `for...in`循环，返回一个包含目标对象所有自身属性的数组；
-   `getOwnPropertyDescriptor(target, propKey)`：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象；
-   `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc)`，`Object.defineProperties(proxy, propDescs)`，返回一个布尔值；
-   `preventExtensions(target)`：拦截`Object.preventExtensions(proxy)`，返回一个布尔值；
-   `getPrototypeOf(target)`：拦截`Object.getPrototypeOf(proxy)`，返回一个对象；
-   `setPrototypeOf(target, proto)`：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值;
-   `isExtensible(target)`：拦截`Object.isExtensible(proxy)`，返回一个布尔值;
-   `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
-   `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

### 9.3 优势

在`Proxy`出世之前，我们用`Object.defineProperty`来实现一个对象操作的拦截。`Proxy`相对于`Object.defineProperty`可谓是一个升级版，那么它究竟有什么优势呢：

1.  支持数组，`Proxy`本身支持对数组的拦截，不需要再对数组进行重载，省去了众多`hack`；

    ```javascript
    let arr = [1,2,3]
    let proxy = new Proxy(arr, {
        get (target, key, receiver) {
            console.log('get', key)
            return Reflect.get(target, key, receiver)
        },
        set (target, key, value, receiver) {
            console.log('set', key, value)
            return Reflect.set(target, key, value, receiver)
        }
    })
    proxy.push(4)
    // 能够打印出很多内容
    // get push     (寻找 proxy.push 方法)
    // get length   (获取当前的 length)
    // set 3 4      (设置 proxy[3] = 4)
    // set length 4 (设置 proxy.length = 4)
    ```

2.  针对对象，`Proxy`针对的是整个对象，而非对象中的某个属性，所以也就不需要对`keys`进行遍历；

    ```javascript
    let obj = {
      name: 'Eason',
      age: 30
    }
    let handler = {
      get (target, key, receiver) {
        console.log('get', key)
        return Reflect.get(target, key, receiver)
      },
      set (target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
      }
    }
    let proxy = new Proxy(obj, handler)
    proxy.name = 'Zoe' // set name Zoe
    proxy.age = 18 // set age 18
    ```

3.  嵌套支持，本质上，Proxy 也是不支持嵌套的，这点和 Object.defineProperty() 是一样的。因此也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回，代码如下：

    ```javascript
    let obj = {
      info: {
        name: 'eason',
        blogs: ['webpack', 'babel', 'cache']
      }
    }
    let handler = {
      get (target, key, receiver) {
        console.log('get', key)
        // 递归创建并返回
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key, receiver)
      },
      set (target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
      }
    }
    let proxy = new Proxy(obj, handler)
    // 以下两句都能够进入 set
    proxy.info.name = 'Zoe'
    proxy.info.blogs.push('proxy')
    ```

4.  `Proxy`提供了比`Object.defineProperty`更多的拦截方法，扩展了很多功能。

## 10. `Reflect`

### 10.1 基础

`Reflect`对象与`Proxy`对象一样，也是`ES6`为了操作对象而提供的新`API`。

`Reflect`对象的设计目的有以下几个：

1.  将`Object`对象的一些明显属于语言内部的方法，放到`Reflect`上，现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只在`Reflect`对象上部署。也就是说，从`Reflect`对象上可以拿到语言内部的方法；
2.  修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`；
3.  让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。
4.  与`Proxy`对象的方法一一对应。只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

### 10.2 静态方法

-   `Reflect.apply(target, thisArg, args)`
-   `Reflect.construct(target, args)`
-   `Reflect.get(target, name, receiver)`
-   `Reflect.set(target, name, value, receiver)`
-   `Reflect.defineProperty(target, name, desc)`
-   `Reflect.deleteProperty(target, name)`
-   `Reflect.has(target, name)`
-   `Reflect.ownKeys(target)`
-   `Reflect.isExtensible(target)`
-   `Reflect.preventExtensions(target)`
-   `Reflect.getOwnPropertyDescriptor(target, name)`
-   `Reflect.getPrototypeOf(target)`
-   `Reflect.setPrototypeOf(target, prototype)`

## 11. `Promise`

### 11.1 基础

所谓`Promise`，简单说是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise`是一个对象，从它可以获取异步操作的消息。

```javascript
const promise = new Promise(function(resolve, reject) {
 
  if (){
    resolve(value);
  } else {
    reject(error);
  }
});
```

### 11.2 方法

-   `Promise.all()`

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

-   `Promise.race()`

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

-   `Promise.allSettled()`

`Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。该方法由 [ES2020](https://github.com/tc39/proposal-promise-allSettled) 引入。

-   `Promise.any()`

ES2021 引入了[`Promise.any()`方法](https://github.com/tc39/proposal-promise-any)。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

## `Generator`函数

<!-- more -->

