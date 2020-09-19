# Text Shadow Mouse Move Effect

## Step1

第一步要做的是抓取滑鼠所在的位置

```jsx
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;
    
    console.log(width, height);
    console.log(x, y);
}

hero.addEventListener('mousemove', shadow);
```

首先要做的當然是選定元素跟綁定監聽器

接下來，要使用JS的解構賦值(Destructuring Assignment)，今天用的是物件解構

### 物件解構

> 解構賦值 (Destructuring assignment) 語法是一種 JavaScript 運算式，可以把陣列或物件中的資料解開擷取成為獨立變數

e.g.

```jsx
const { offsetWidth: width, offsetHeight: height } = hero;
//相當於
const width = hero.offsetWidth;
const height = hero.offsetHeight;
```

完成後就可以讀取滑鼠的座標

## Step2

![Text%20Shadow%20Mouse%20Move%20Effect%2084789fa12da749cfb7328ccfd25671f2/_2020-09-16_22.20.53.png](Text%20Shadow%20Mouse%20Move%20Effect%2084789fa12da749cfb7328ccfd25671f2/_2020-09-16_22.20.53.png)

做完第一步後，有沒有發現一個問題，當滑鼠經過某一個區域時，座標會突然變小？

這是因為當被監聽的元素有子元素的時候，它會回傳游標在子元素上的位置，如上圖的紅色區塊

```jsx
function shadow(e) {
    // ...   
    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }
}
```

所以要加上上面這段程式碼，它的作用是當游標的位置不在監聽的元素上，要為現在的座標加上子元素到父元素的距離

## Step3

最後一步是要幫文字加上陰影

```jsx
function shadow(e) {
    // ...   
		const walk = 500;
		const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 red,
        ${xWalk * -1}px ${yWalk}px 0 blue,
        ${xWalk}px ${yWalk * -1}px 0 green,
        ${xWalk * -1}px ${yWalk * -1}px 0 yellow
    `;
}

```

首先要定義陰影移動的最大距離，根據上面的範例程式碼，設定陰影移動的距離為500px

接下來就要計算陰影移動距離，這邊以座標和畫面寬、高算出陰影移動的比例後，要再減去最大移動距離的一半，這是因為陰影可移動的距離加總才會是可移動的最大距離，以上方程式碼為例，移動的範圍是+250~-250

最後再將計算完的結果作為陰影的參數套用就完成了

## References

[解構賦值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)