# Slide in on Scroll

## Step1

```jsx
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
	console.log(e);
}

window.addEventListener('scroll', debounce(checkSlide));
```

首先要來介紹一下`debounce`這個function，當我們捲動畫面時，事件監聽器就會被觸發，從頭捲到尾可能就會觸發幾十次事件，所以我們加上`debounce`，用來限制function觸發的次數

## Step2

```jsx
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        //圖片的一半位置
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
    });
}
```

我們要取得每張圖片的中間位置，來判定畫面是否過了中線，然後顯示

`window.scrollY` 畫面向下捲動的像素值

`window.innerHeight` 視窗高度

![https://developer.mozilla.org/@api/deki/files/213/=FirefoxInnerVsOuterHeight2.png](https://developer.mozilla.org/@api/deki/files/213/=FirefoxInnerVsOuterHeight2.png)

`element.height` 圖片高度

所以我們可以算出圖片進入畫面的位置

```jsx
const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
```

還有判定的條件

```jsx
const isHalfShown = slideInAt > sliderImage.offsetTop;
```

`element.offsetTop` 元素距離外層容器上方的距離

p.s. 圖片外層只有一層父元素，所以可以直接使用

## Step3

```jsx
const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        //圖片的一半位置
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        //圖片的底部
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPass = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPass){
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}
```

接下來是圖片消失的位置，當圖片底部高於視窗頂部時，圖片消失

因此得出以下結果

```jsx
const imageBottom = sliderImage.offsetTop + sliderImage.height;
const isNotScrolledPass = window.scrollY < imageBottom;
```

最後，當滿足圖片出現的條件時，加上active class