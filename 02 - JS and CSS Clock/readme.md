# CSS + JS Clock

[repo](https://github.com/lukechu1997/JavaScript30-Practice/tree/master/02%20-%20JS%20and%20CSS%20Clock)

[DEMO](https://lukechu1997.github.io/JavaScript30-Practice/02%20-%20JS%20and%20CSS%20Clock/)

## Step1

CSS

![CSS%20+%20JS%20Clock%207dee3d8d8d8b45af8412a11b404da802/_2020-07-30_21.37.29.png](CSS%20+%20JS%20Clock%207dee3d8d8d8b45af8412a11b404da802/_2020-07-30_21.37.29.png)

![CSS%20+%20JS%20Clock%207dee3d8d8d8b45af8412a11b404da802/_2020-07-30_21.39.49.png](CSS%20+%20JS%20Clock%207dee3d8d8d8b45af8412a11b404da802/_2020-07-30_21.39.49.png)

```css
.hand {
	transform-origin: 100%;
	transform: rotate(90deg);
}
```

元件預設旋轉軸在中心（transform-origin: 50%），將transform-origin設為100%可以把旋轉中心底移至元件最右側，最後再將指針元件旋轉90度，即完成第一步

## Step2

```jsx
const secondHand = document.querySelector('.second-hand');

function setDate() {
    const now = new Date(); //建立Date物件
    
    const second = now.getSeconds(); //取得現在秒數
    const secondDeg = ((second / 60) * 360) + 90; //計算指針角度
    secondHand.style.transform = `rotate(${secondDeg}Deg)`; //為選定的元素加上transform
}
```

1. 選定秒針（.second-hand）
2. 新增function 
3. 增加Date物件 new Date()

    建立一個 JavaScript Date 物件來指向某一個時間點。Date 物件是基於世界標準時間（UTC） 1970 年 1 月 1 日開始的毫秒數值來儲存時間。

4. 取得現在時間秒數 .getSeconds()
5. 為指針加上計算完的角度

## Step3

```jsx
//setInterval(function, time in millisecond
setInterval(setDate, 1000);
```

週期性觸發function