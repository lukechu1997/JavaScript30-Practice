# WebCam

## Step0

今天的練習需要進行一些前置作業

以往的操作都可以直接在瀏覽器上執行，但是今天需要取得使用者的攝影機權限，取得權限需要提供一個安全的來源（secure origin），而localhost也是屬於安全的來源

所以，今天的練習會需要一個localhost server，如果有慣用的server的話都可以使用，沒有的話，原作者也有提供一個package.json，可以用來開啟server，只要安裝Node.js就可以使用了

## Step1

```jsx
const video = document.querySelector('.player');

function getvideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play()
        })
        .catch(err => {
            console.error('OH NO!!!', err);
        });
}

getvideo();
```

首先，使用`mediaDevices.getUserMedia()`取得使用者的攝影機資料，這邊要這邊通常要使用`navigator.mediaDevices` 來獲取 `MediaDevices`

### [mediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

`mediaDevices.getUserMedia()`會提示使用者授權使用媒體輸入權限（攝影機、麥克風），透過媒體輸入創造媒體串流（MediaStream），媒體串流的內容包含影像軌（video track），以及音軌（audio track），還有其他種類的軌

它會回傳一個Promise物件，用於解析成媒體串流物件，如果使用者拒絕授權或是媒體輸入源不可用，它會回傳`NotAllowedError`或`NotFoundError`

### [navigator](https://developer.mozilla.org/zh-TW/docs/Web/API/Navigator)

Navigator 介面標示了用戶代理（user agent）的狀態與身份，它允許腳本查詢與註冊，以進行一些活動

接著就可以把媒體串流的資訊印出來

![WebCam%208920dc41265d456a9b5870d77ec15374/_2020-09-26_23.32.18.png](WebCam%208920dc41265d456a9b5870d77ec15374/_2020-09-26_23.32.18.png)

然後以`srcObject`將回傳的物件設為媒體來源，並且播放(`play()`)就完成了

### HTMLMediaElement.srcObject

`HTMLMediaElement`的`srcObject`屬性是用來設置與元素相關的媒體來源物件，該物件可以是[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream), [MediaSource](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), or [File](https://developer.mozilla.org/en-US/docs/Web/API/File)

### 注意！！

在影片中，原作者是用`video.src = window.URL.createObjectURL(localMediaStream);`這個方法是將localMediaStream轉換成瀏覽器可以理解URL，再指派給video作為媒體來源，但是這個方法已經停用了

已停用： [https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

新作法： [https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject)

## Step2

取得影像之後，就可以將畫面貼到畫布(canvas)上

```jsx
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}
```

首先，先將畫布的寬、高設為跟影像畫面相同，這樣之後就不怕失去畫面原有的比例

接著，以`setInterval()`將影像每16毫秒貼上畫布，這邊加上return是為了之後方便進行調整

### CanvasRenderingContext2D.drawImage()

drawImage()提供不同種方法將影像傳入畫布，這邊使用到的參數分別是影像的來源、影像左上角的X座標、影像左上角的Y座標、影像寬度、影像高度

## Step3

接下來要擷取畫面

```jsx
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    //get the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="handsome man" />`;
    strip.insertBefore(link, strip.firstChild);

    console.log(data);
}
```

首先，先選定`.snap`，這個class是一個快門聲的音效

接下來，透過`HTMLCanvasElement.toDataURL()`取得圖檔URL，然後創建一個`<a>`，並將連結(`href`)設為圖檔URL，屬性設為`download`，下載檔名為handsome

最後，在`<a>`插入`<img>`，然後再插入`.strip`，就可以預覽圖片，並且在點擊後下載

### HTMLCanvasElement.toDataURL()

`HTMLCanvasElement.toDataURL()`會回傳含有圖像和參數設置特定格式的 data URIs (預設 PNG)

### Node.insertBefore()

`Node.insertBefore()` 會將一個節點安插在參考節點之前，作為某個特定父節點之子節點

## Step4

接下來，要為畫布上的畫面加上一點特效

```jsx
function paintToCanvas() {
	// ...
	return setInterval(() => {
	    ctx.drawImage(video, 0, 0, width, height);
	    // take the pixels out
	    let pixels = ctx.getImageData(0, 0, width, height);
	    // mess with them
	    // pixels = redEffect(pixels);
	    pixels = rgbSplit(pixels);
	    // put them back
	    ctx.putImageData(pixels, 0, 0);
	  }, 16);
}
	
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100; //Red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; //Green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //Blue
    }
    return pixels;
}

function RGBSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; //Red
        pixels.data[i + 100] = pixels.data[i + 1]; //Green
        pixels.data[i - 150] = pixels.data[i + 2]; //Blue
    }
    return pixels; 
}
```

首先，要先取得畫布上每一個像素的資訊

```jsx
let pixels = ctx.getImageData(0, 0, width, height);
```

這邊會得到一個非常大的陣列-Uint8ClampedArray（8位無符號整型固定數組），這個陣列裡面的數值是以4個為一組，分別代表紅、綠、藍、透明度，透過改變這些顏色數值就可以做出一些濾鏡效果，像是上方範例的redEffect就是將畫面轉紅，RGBSplit則是將不同像素的數值向前或向後移動，來達到將分散畫面紅藍綠位置的效果

```jsx
ctx.putImageData(pixels, 0, 0);
```

最後只要把修改過的像素資料塞回畫布就完成了

## Step5

這邊要做的是綠幕效果

```jsx
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}
```

首先，選定畫面上的數值輸入器，把數值儲存下來

接下來，要去比對每一個像素的RGB值，如果值是落在輸入的區間的話，就把透明度設為0

這樣就可以做到綠幕的效果囉

是不是很簡單呢