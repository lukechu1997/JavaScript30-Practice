# Console Tricks

## console.log()

```jsx
console.log('hello')
```

向Web控制台輸出一條訊息

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.30.46.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.30.46.png)

### 插入字串

```jsx
console.log('Hello I am a %s string!', '💩');
```

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.31.36.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.31.36.png)

[Untitled](https://www.notion.so/05a6bcde4b5c4702b3ce204ae7a56f4f)

### 加上css樣式

```jsx
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue')
```

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.32.07.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.32.07.png)

## console.warn()

```jsx
console.warn('OH NOOO');
```

向 Web 控制台輸出一條警告訊息

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.29.26.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.29.26.png)

## console.error()

```jsx
console.error('Shit!');
```

向 Web 控制台輸出一條錯誤訊息

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.33.38.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.33.38.png)

## console.info()

```jsx
console.info('Crocodiles eat 3-4 people per year');
```

向web控制台輸出一個通知信息，僅在Firefox，web控制台的日誌中的項目旁邊會顯示一個小的‘I‘圖標

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.34.33.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.34.33.png)

## console.assert()

```jsx
console.assert(1 === 2, 'That is wrong!');
```

如果判斷式為false，則回傳錯誤訊息；true，則不做回應

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.42.28.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.42.28.png)

## console.clear()

```jsx
console.clear();
```

清空web控制台訊息

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.44.24.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.44.24.png)

## console.dir()

```jsx
console.dir(p);
```

在控制台中顯示指定JavaScript物件的屬性，並通過類似文件樹樣式的交互列表顯示

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.46.35.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.46.35.png)

## console.group()

```jsx
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
dogs.forEach(dog => {
	//  console.group(`${dog.name}`);
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
```

在web控制台建立一個訊息分組，由`console.group(‘group name');`或`console.groupCollapsed(‘group name');`開始，直到 `console.groupEnd(‘group name');`結束

`console.groupCollapsed(‘group name');`會以縮合列表的方式呈現

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.57.52.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_15.57.52.png)

## console.count()

```jsx
console.count('Wes');
```

輸出 count() 被使用的次數，此函數接受一個可選參數 label

如果有 label，此函數輸出為那個指定的 label 和 count() 被使用的次數

如果 label 被忽略，此函數輸出 count() 在其所處位置上被使用的次數

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.04.39.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.04.39.png)

## console.time()

```jsx
console.time('fetching data');
    fetch('https://api.github.com/users/wesbos')
      .then(data => data.json())
      .then(data => {
        console.timeEnd('fetching data');
      });
```

啟動一個計時器來跟踪某一個操作的佔用時長，每一個計時器必須擁有唯一的名字，頁面中最多能同時運行10,000個計時器。當以此計時器名字為參數調用 `console.timeEnd()` 時，瀏覽器將以毫秒為單位，輸出對應計時器所經過的時間。

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.04.05.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.04.05.png)

## console.table()

```jsx
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
console.table(dogs);
```

將資料以表格方式呈現

![Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.07.10.png](Console%20Tricks%20e7c2e574de704c778b4534316eef0de1/_2020-08-23_16.07.10.png)

更多用法可參考下方連結

[https://developer.mozilla.org/zh-TW/docs/Web/API/Console](https://developer.mozilla.org/zh-TW/docs/Web/API/Console)