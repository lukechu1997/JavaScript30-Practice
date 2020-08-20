# Flex Panels Image Gallery

[repo](https://github.com/lukechu1997/JavaScript30-Practice/tree/master/05%20-%20Flex%20Panel%20Gallery)

DEMO

## Step1

css 設定 flex

圖片一開始會以下圖的方式排列

![Flex%20Panels%20Image%20Gallery%206bd4db2f961948d28f7d0fbe4c1bcd0b/_Users_lukechu_projects_JSPractice_JavaScript30_0520-20Flex20Panel20Gallery_index-START.html.png](Flex%20Panels%20Image%20Gallery%206bd4db2f961948d28f7d0fbe4c1bcd0b/_Users_lukechu_projects_JSPractice_JavaScript30_0520-20Flex20Panel20Gallery_index-START.html.png)

我們要將圖片轉成直向排列

```css
.panels {
	display: flex;
}
```

`display: flex;` 將 `.panels` 轉成flex container

`.panels`的子元素就可以使用[flex設定](https://www.oxxostudio.tw/articles/201501/css-flexbox.html)

```css
.panel {
	flex: 1;
	/*水平對齊*/
  justify-content: center;
	/*垂直對齊*/
  align-items: center;
  display: flex;
	/*排列方向*/
  flex-direction: column;
}
```

同一元素可以同時作為flex element以及flex container

接下來，要對文字部分做相同處理

```css
.panel>* {
	flex: 1 0 auto;
	display: flex;
	/*水平對齊*/
	justify-content: center;
	/*垂直對齊*/
	align-items: center;
}
```

`.panel>*` `>`指的是`.panel`下的子元素，`>*`即是指`.panel`的所有子元素

## Step2

```css
.panel>*:first-child {
	transform: translateY(-100%);
}

.panel.open-active>*:first-child {
  transform: translateY(0);
}

.panel>*:last-child {
  transform: translateY(100%);
}

.panel.open-active>*:last-child {
  transform: translateY(0);
}
```

透過改變文字區塊的Y軸，將文字移出畫面

`first-child` 可以選定子元素的第一個

`last-child` 則是選定子元素的最後一個

## Step3

```jsx
const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
}

function toggleActive(e) {
    console.log(e.propertyName);
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen))
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive))
```

`element.classList.toggle()` 

When only one argument is present: Toggle class value; i.e., if the class exists then remove it and return false, if not, then add it and return true. When a second argument is present: If the second argument is true, add specified class value, and if it is false, remove it.