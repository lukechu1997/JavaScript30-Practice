# JavaScript Drum Kit

[repo](https://github.com/lukechu1997/JavaScript30-Practice/tree/master/01%20-%20JavaScript%20Drum%20Kit)

## Step1

```jsx
window.addEventListener("keydown", function (e) {
	console.log(e);
});
```

新增事件讀取器，當按下鍵盤時 （keydown），觸發後續function。

## Step2

```jsx
window.addEventListener("keydown", function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if (!audio) return; //終止函式
    audio.currentTime = 0; //重設音效時間
    audio.play(); //播放音效
    key.classList.add('playing'); //增加class
});
```

新增選擇器，選定HTML元素

### 字串模板(Template literals)

以``封閉，並以${ }添加參數，可在字串中直接加入參數，不必用"+"連接

### data-* attribute

在HTML加入自訂屬性，e.g. data-key, data-item

### 音訊控制

透過js控制音檔或是影片檔，可參考[w3school](https://www.w3schools.com/tags/ref_av_dom.asp)

### 操作class

element.classList

透過js操作HTML tag的class，操作方法可參考[MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)

## Step3

```jsx
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```

為class為key的元素加上事件讀取器，`document.querySelectorAll('.key')`選定所有元素，因為選擇結果為node list，所以用forEach迴圈，個別加上事件讀取器，當transitionend事件觸發，執行後續function

### CSS過渡事件

css transition 觸發，e.g. transitionend，可參考[MDN](https://developer.mozilla.org/zh-TW/docs/Web/Events)

## Step4

```jsx
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;//略過掉其他 propertyName 不是 transform 的物件
    this.classList.remove('playing');//移除class
}
```

## 注意

最後才引入js腳本，因為如果腳本在元素被渲染前載入，則會倒導致選擇器(selector)選不到元素