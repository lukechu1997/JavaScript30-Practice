# CSS Variables

## Step1

```css
/* 宣告CSS全域變數 */
:root {
	--base: #ffc600;
	--spacing: 10px;
	--blur: 10px;
}

img {
	padding: var(--spacing);
	background: var(--base);
	filter: blur(var(--blur));
}

.hl {
	color: var(--base);
}
```

`:root` 是CSS偽類（pseudo-class），用於選取HTML根元素，也就是`<html>`，可以用來宣告CSS的全域變數。

CSS variables，建立方式是在變數名稱前加上`—-`；

使用時，在屬性值的地方使用關鍵字 `var( )`，括弧中填入變數

## Step2

```jsx
const inputs = document.querySelectorAll('.controls input');

function handelUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handelUpdate)); //更改數值時觸發事件
inputs.forEach(input => input.addEventListener('mousemove', handelUpdate)); //滑鼠移動時觸發事件
```

`element.dataset`，回傳元件的自訂資料屬性（data-*），物件形式

`style.setProperty()`，設定css屬性值（屬性名, 屬性值）

`Document.documentElement` 會回傳目前文件（document）中的根元素（Element），如：HTML 文件中的 <html> 元素。