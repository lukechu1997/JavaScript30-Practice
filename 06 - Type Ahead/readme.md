# Ajax Type Ahead

## Step1

將獲取的資料加入陣列

```jsx
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))
```

`fetch()` 會回傳 promise 物件

將promise物件解析後，以[展開運算符(Spread Operator)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)將資料分別傳入陣列

## Step2

輸入文字處理

```jsx
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // 將文字轉換成正規表達式
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    console.log(matchArray);
}

const searchInput = document.querySelector('.search');
const suggestion = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

`new RegExp(wordToMatch, 'gi');` 建構子函式 正則表達式標誌

[正則表達式標誌](https://www.notion.so/7bb399c7db7644b9b7c9ebcb24a2a368)

## Step3

顯示查詢結果

```jsx
function displayMatches() {
    // console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        return `
            <li>
                <span class="name">${place.city}, ${place.state}</span>
                <span class="population">${place.population}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}
```

## Step4

美化顯示

```jsx
//數字加上逗號
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    // console.log(this.value);
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}
```