---
title: JavaScript实现Vue的双向绑定
tags: [JavaScript, Vue]
categories: JavaScript
date: 2020-01-23 20:02:06
---

```html
<div>
    <input type="text" id="input">
    <div id="show"></div>
</div>
```
```javascript
var obj = {};

Object.defineProperty(obj, 'txt', {
    configurable: true,
    enumerable: true,
    get: function () {
        return obj;
    },
    set: function (newValue) {
        document.getElementById('input').value = newValue;
        document.getElementById('show').innerText = newValue;
    }
});

document.addEventListener('keyup', function (e) {
    obj.txt = e.target.value;
});
```

<!-- more -->
