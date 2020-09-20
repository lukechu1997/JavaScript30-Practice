# Tally String Times with Reduce

## Step1

今天使用的資料來源是原作著提供的列表，時間資料在列表的`data-time`屬性

```jsx
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
```

第一步就是要取得含有資料的列表，這邊先選定具有`data-time`屬性的元素，但是透過querySelectorAll()取得的不是陣列(Array)而是NodeList，所以要將NodeList轉換成陣列

轉換的方式有兩種：

- 擴展運算子 Spread Operator
- Array.from()

    > `Array.from()`會從類陣列（array-like）或是可迭代（iterable）物件建立一個新的 Array 實體

## Step2

接下來要把取得的時間數據做加總

```jsx
const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, secs] = timeCode.split(":").map(parseFloat)
        return (mins * 60) + secs;
    })
    .reduce((total, vidSeconds) => total + vidSeconds);
```

首先，用之前學過的map()方法取得陣列中的data-time，data-time在這邊還是字串

接下來，再把時間字串的分跟秒拆開，並由parseFloat()函式轉換成浮點數

轉換完成後，再以reduce()加總就完成第一步了

## Step3

做完上面的步驟，就可以取得加總後的秒數

```jsx
let secondsLeft = seconds;

const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```

這邊用到的是`Math.floor()`以及基本的算術運算

### Math.floor()

`Math.floor()` 函式會回傳小於等於所給數字的最大整數

### 算術運算符

- `+` : 加號，將數值相加
- `-` : 減號，將數值相減
- `*` : 乘號，將數值相乘
- `/` : 除號，將數值相除
- `%` : 餘，取得餘數