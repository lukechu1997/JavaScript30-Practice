# HTML5 Canvas

## canvas

`<canvas>` 是一個 HTML 元素，我們可以利用程式腳本在這個元素上繪圖（通常是用 JavaScript）

### <canvas> 元素

它有點像 `<img>` 元素，其中的差異點在於 `<canvas>`沒有 src 和 alt 屬性，`<canvas>` 只有 width 與 height 這兩個屬性，這兩個屬性皆為非必須、能透過 DOM屬性設定；若是沒有設定 width 和 height 屬性，畫布寬預設值為 300 pixels、高預設值為 150 pixels，我們可以用 CSS 強制設定元素尺寸，但當渲染時，影像會縮放以符合元素的尺寸。

## Step1

```jsx
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d')

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

呼叫`document.getElementById()`來取得`<canvas>`元素，然後用`getContext()`取得渲染環境。

我們可以取得視窗的width和height，然後重設canvas的大小。

### 渲染環境(rendering context)

`<canvas>`產生一個固定大小的繪圖畫布，這個畫布上有一或多個渲染環境(rendering context)，我們可以用渲染環境來產生或操作顯示內容的渲染環境(rendering context)

## Step2

```jsx
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
```

strokeStyle 用於設置畫筆顏色

lineJoin 設置兩條直線交匯時，形成的邊角

- round: 圓角
- bevel: 斜角
- miter: 尖角，默認

lineCap 用於設置線條末端線帽的樣式

- butt: 線條的末端為平直的邊緣，默認
- round: 線條的末端為圓形的線帽，會使線條略長一點
- square: 線條的末端為方形的線帽，會使線條略長一點

## Step3

```jsx
let isDrawing = false;
let lastX = 0; //游標最後的Ｘ座標
let lastY = 0; //游標最後的Ｙ座標 
```

對繪製圖型所需的資訊進行初始設定

```jsx
function draw(e) {
    if (!isDrawing) return; // 滑鼠未點擊時停止偵測
    console.log(e);

    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    //draw
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; //解構賦值
}
```

`beginPath()`是 Canvas 2D API 通過清空子路徑列表開始一個新路徑的方法，當你想創建一個新的路徑時，使用此方法

`moveTo()`是 Canvas 2D API 將一個新的子路徑的起始點移動到(x，y)坐標的方法

`ineTo()`是 Canvas 2D API 使用直線連接子路徑的終點到x，y坐標的方法（並不會真正地繪製）

`stroke()`是 Canvas 2D API 使用非零環繞規則，根據當前的畫線樣式，繪製當前或已經存在的路徑的方法

**解構賦值 (Destructuring assignment)** 語法是一種 JavaScript 運算式，是一個在ES6的新特性，可以把陣列或物件中的資料解開擷取成為獨立變數

```jsx
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // 滑鼠未在canvas內
```

最後再加上事件監聽器就完成了

## Extra

幫繪出的線條加上一點裝飾

```jsx
let hue = 1;
let direction = true;

function draw(e) {
		//接續上方程式
		ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    if (hue > 360 || hue < 1) {
        direction = !direction;
    }
    if (direction) {
        hue++;
        console.log('++');
    } else {
        hue--;
        console.log('--');
    }
}
```

hsl(hue, saturation, lightness)H 為 hue(色相)、S 為 saturation(飽合度)、L 為 lightness(亮度)

效果可參考下方連結

參考：[https://mothereffinghsl.com/](https://mothereffinghsl.com/)