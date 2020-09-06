# JS Reference VS Copy

## 當變數的值是原生型別 (Primitive) 時，Pass by value

Primitive

- String
- Number
- Boolean

```jsx
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100

let name = 'Luke';
let name2 = name;
console.log(name, name2); //Luke Luke
name = 'Lucy';
console.log(name, name2); // Lucy Luke
```

![JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_17.49.47.png](JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_17.49.47.png)

當變數是數字、字串、布林值的時候，將變數指派給另一變數（`let b = a` ）時，會將`a`的值複製給`b`，所以當`a`的值變更後，`b`不會跟著改變

## 當變數的值是物件型別 (Object) 時，行為是 Pass by reference

JavaScript 中常見的物件型別：

- Array
- Object

```jsx
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log(players, team);
```

![JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_17.47.35.png](JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_17.47.35.png)

當變數是陣列或物件的時候，將變數指派給另一變數（`let b = a` ）時，`b`會引用`a`的值，所以當`a`的值變更後，`b`會跟著改變

## 複製物件

如前面所述，物件並不會被複製，而是被引用，那該怎麼複製呢？

### Array

```jsx
const team2 = players.slice();
```

第一種方法是`Array.prototype.slice()`，`slice()` 回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy），而原本的陣列將不會被修改

```jsx
const team3 = [].concat(players);
```

第二種是`Array.prototype.concat()`，`concat()` 被用來合併兩個或多個陣列，此方法不會改變現有的陣列，而是回傳一個包含呼叫者陣列本身的值，作為代替的是回傳一個新陣列

```jsx
const team4 = [...players];
```

第三種是透過展開運算符，將原本的陣列內容分別複製到新的變數內，而這裡的新變數也正好是一個陣列

```jsx
const team5 = Array.from(players);
```

第四種是`Array.from()`，`Array.from()`會從類陣列（array-like）或是可迭代（iterable）物件建立一個新的 Array 實體

### Object

```jsx
const person = {
	name: 'Wes Bos',
	age: 80
};

const cap2 = Object.assign({}, person, { number: 99, age: 12 });
const cap3 = {...person};
```

一是`Object.assign()`，`Object.assign()`被用來複製一個或多個物件自身所有可數的屬性到另一個目標物件，回傳的值為該目標物件，最後還可以新增資料

二是展開運算符，也可以完成一樣的操作

然而`Object.assign()`只能複製第一層

![JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_20.41.52.png](JS%20Reference%20VS%20Copy%20faf61571b3f34c5389cd95585678cb6e/_2020-09-06_20.41.52.png)

要解決這個問題，可以使用其他函式庫

但今天我們要用原生的解法，將物件轉成字串，再轉回來

```jsx
const dev2 = JSON.parse(JSON.stringify(wes));
```