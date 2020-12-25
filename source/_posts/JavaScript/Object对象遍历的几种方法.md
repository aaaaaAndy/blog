---
title: Object对象遍历的几种方法
date: 2020-12-25 13:24:05
tags: [JavaScript, Object, for-of]
categories: JavaScript
---

# Object对象遍历的几种方法

本文以下面对象为例：

```javascript
const person = {
  name: 'andy',
  age: 12
};
```

## 1. `Object.keys`

`forEach`原本只是用来遍历数组对象，所以需要先获取对象的所有`key`，再行遍历。需要注意的是

`Object.keys`获取参数对象自身的（不含继承的）所有可枚举属性（不含`Symbol`属性）的`key`值：

```javascript
Object.keys(person).forEach((key) => {
  console.log(key);
})

// name
// age
```

## 2. `Object.values`

`Object.values`返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值：

```javascript
Object.values(person).forEach(value => {
  console.log(value);
})

// andy
// 12
```

## 3. `Object.entries`

`Object.entries`返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```javascript
Object.entries(person).forEach((arr) => {
  console.log(arr);
})

// ['name', 'andy']
// ['age', 12]
```

## 4. `getOwnPropertyNames`

`getOwnPropertyNames`返回包含对象自身的所有属性（不含`Symbol`属性，但是包含不可枚举属性）

```javascript
Object.getOwnPropertyNames(person).forEach(key => {
  console.log(key);
})

// name
// age
```

## 5. `Reflect.ownKeys`

`Reflect.ownKeys`返回对象自身的所有属性，包括`symbol`属性，不可枚举属性等：

```javascript
Reflect.ownKeys(person).forEach(key => {
  console.log(key);
})

// name
// age
```

##  6. `for...in`

`for...in`获取对象自身的和继承的可枚举属性（不含`Symbol`属性）：

```javascript
for (let key in person) {
  console.log(key);
}
// name
// age
```

如果要遍历对象自身的属性，可以使用`hasOwnProperty`方法进行二次判断：

```javascript
for(let key in person) {
  if(person.hasOwnProperty(key)) {
    console.log(key)
  }
}

// name
// age
```

## 7. `for...of`

`for...of`支持数组和类数组的对象遍历，但是不能支持所有的对象遍历。这是因为`ES6`引入了`Iterator`接口，包含此接口的数据结构皆能够被`for...of`遍历，所以我们可以稍加改造，让`for...of`可以遍历所有的对象。 

```javascript
person[Symbol.iterator] = function() {
	let index = 0;
  let self = this;
  let keys = Object.keys(self);
  
  return {
    next() {
      if (index < keys.length) {
        return {
          value: self[keys[index++]],
          done: false
        }
      } else {
        return {
          value: undefined,
          done: true
        }
      }
    }
  }
}
```

仔细观察上面代码，你会发现其实`[Symbol.iterator]`函数是一个`Generator`函数，那么就可以简化一下：

```javascript
person[Symbol.iterator] = function* () {
  let keys = Object.keys(this);
  
  for (let i = 0; i < keys.length; i++) {
    yield keys[i];
  }
}
```

对于上面只返回了`key`的代码还可以进一步优化：

```javascript
person[Symbol.iterator] = function* () {
  let keys = Object.keys(this);
  
  for (let i = 0; i < keys.length; i++) {
    yield [keys[i], this[keys[i]]]
  }
}

// 遍历结果
for(let [key, value] of person) {
  console.log(key, value);
}

// name, andy
// age, 12
```



<!-- more -->