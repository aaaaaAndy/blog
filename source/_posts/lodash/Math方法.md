---
title: Math方法
tags: [JavaScript, math]
categories: JavaScript
date: 2020-07-21 16:42:20
---

# Math方法

## 加法

### 运算规则

1. 加法运算符只能用于原始数据类型, 对于对象类型的值,需要进行数据转换；
2. 在转换后,如果其中一个运算元出现原始数据类型是“字符串”类型值时， 则另一个运算元强制转换为字符串,然后做字符串的连接运算；
3. 在其他情况时，所有运算元都会转换为原始数据类型的“数字”类型值,然后作数字的相加。

### Number()转换规则

1. 如果是`Boolean`值,`true`和`false`将分别转换为1和0;
2. 如果是数字值,只是简单的传入和返回;
3. 如果是`null`值,返回0;
4. 如果是`undefined`,返回`NaN;`
5. 如果是字符串,遵循一下规则:
   1. 如果字符串截去开头和结尾的空白字符后,不是纯数字字符串,那么最终结果返回结果为`NaN`;
   2. 如果是字符串中只包含数字(包括前面带正号或负号的情况,则将其转换为十进制数值, 即`1`变成`1`，`123`会变成`123`，而`011`会变成`11`（前导的零被忽略了);
   3. 如果字符串中包含有效的浮点格式，如`1.1`，则将其转换为对应的浮点数值（同样也会忽略前导零）； 
   4. 如果字符串中包含有效的十六进制,例如`0xf`, 则将其转换为相同大小的十进制整数数值;
   5. 如果字符串是空的(不包含任何字符), 则将其转换为`0`;
   6. 如果字符串中包含上述格式之外的字符, 则将其转换为`NaN`.
6. 如果是对象, 则调用对象的`valueOf()`方法,然后依照前面的规则转换返回的值.如果转换的结果是`NaN`, 则调用对象的`toString()`方法,然后再次依照前面的规则转换返回的字符串值.

```javascript
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0
console.log(Number(NaN)) // NaN
console.log(Number('')) // 0
console.log(Number({})) // NaN
console.log(Number({a:1})) // NaN
console.log(Number([])) // 0
console.log(Number([1])) // 1
console.log(Number([1,2])) // NaN

console.log(String(undefined)) // 'undefined'
console.log(String(null)) // 'null'
console.log(String(NaN)) // 'NaN'
console.log(String({})) // '[object Object]'
console.log(String({a:1})) // '[object Object]'
console.log(String([])) // ''
console.log(String([1])) // '1'
console.log(String([1,2])) // '1,2'
```

<!-- more -->

