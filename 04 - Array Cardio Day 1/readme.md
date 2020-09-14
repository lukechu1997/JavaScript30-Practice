# Array Cardio Day 1

[repo](https://github.com/lukechu1997/JavaScript30-Practice/tree/master/04%20-%20Array%20Cardio%20Day%201)

## filter()

```jsx
const fifteen = inventors.filter(function (inventor) {
	if(inventor.year > 1500 && inventor.year < 1600){
		return true; //保留符合條件的物件
	}
});
```

`filter()` 會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列

此處使用的是ES6的箭頭函式，將上方變數簡化成下方變數

```jsx
const fifteen = inventors.filter(inventor => (inventor.year > 1500 && inventor.year < 1600));
console.table(fifteen);
```

最後 `console.table()`可以將結果以表格形式呈現

## map()

```jsx
const fullname = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.table(fullname);
```

`map()` 會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。

## sort()

```jsx
const ordered = inventors.sort(function (a, b){
	if(a.year > b.year){
		return 1;
	} else {
		return -1;
	}
});
//簡化後
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
```

`sort()` 會原地（in place）對一個陣列的所有元素進行排序，並回傳此陣列，預設的排序順序是根據字串的 Unicode 編碼位置（code points）而定。

### Ex.1

```jsx
// Sort the inventors by years lived
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const oldest = inventors.sort((a, b) => {
    const firstGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return firstGuy < nextGuy ? 1 : -1;
});
```

### Ex.2

```jsx
// Sort the people alphabetically by last name
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// Sort the people alphabetically by last name
const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
});
```

## reduce()

```jsx
const totalYears = inventors.reduce((total, inventor) => {
	return total + (inventor.passed - inventor.year);
}, 0);
console.log(totalYears);
```

`reduce()` 將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值

### Ex.

```jsx
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

const transportation = data.reduce((obj, item) => {
    if(!obj[item]){
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
}, {});

console.log(transportation);
```