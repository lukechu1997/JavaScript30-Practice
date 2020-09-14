# Local Storage

## Step1

```jsx
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = [];

function addItem(e) {
    e.preventDefault();
}

addItems.addEventListener('submit', addItem)
```

首先，今天要監聽的事件是submit(提交)，當我們按下enter或是按下提交按鈕，瀏覽器都會執行提交動作

接下來，每當我們進行提交的時候，瀏覽器都會重新導向一次，所以使用`preventDefault()`來取消預設動作

### Event.preventDefault()

`preventDefault()`告訴user agent，如果此事件沒有被顯式處理，它默認的動作也不應該照常執行，此事件還是繼續傳遞，除非碰到事件監聽器調用`stopPropagation()` 或`stopImmediatePropagation()`，才停止傳遞

```jsx
function addItem(e) {
    e.preventDefault();
		const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    this.reset();
}
```

然後是建立要新增的物件，這裡可以使用ES6的物件縮寫(Object Shorthand)

### 物件縮寫 Object Shorthand

原本的寫法：

```jsx
const item = {
    text: text,
    done: false
};
```

使用物件縮寫：

```jsx
const item = {
    text,
    done: false
};
```

而取得輸入字串時使用的`this`，可以幫助縮小`querySelector()`搜尋的範圍

最後再以`reset()`重置表單輸入的內容

### HTMLFormElement.reset()

`reset()` 可以重置一個表單內的所有表單元件的值到初始狀態

## Step2

接下來要做的是在畫面上插入新增的項目

```jsx
function populateList(plates = [], plateList) {
    plateList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}
```

這邊建立一個function，要傳入兩個參數：

- plates: 儲存所有項目的陣列
- plateList: 插入列表的位置

這個function要在HTML插入一個大字串來顯示列表，所以這邊使用innerHTML，來設置HTML

### element.innerHTML

Element 的`innerHTML`屬性可以獲取或設置元素中包含的HTML或XML標記，，也可以單純的將字串寫入 HTML Code 的某一個部分

最後，`map()`會回傳一個陣列，所以要用`join()`來將陣列整合成字串，然後再加到前面的function執行

```jsx
function addItem(e) {
		//...接續上方程式
    populateList(items, itemsList);
}
```

### Extra

```css
.plates input {
  display: none;
}
.plates input + label:before {
  content: "⬜️";
  margin-right: 10px;
}

.plates input:checked + label:before {
  content: "🌮";
}
```

本練習的原作者在列表上加了一點小巧思，當checkbox未被勾選時，它會有一個空白的icon，勾選後會變成一個墨西哥捲餅，這邊有興趣的人也可以試試

## 表單的 label

當使用傳統的 HTML 表單元素建立表單時，提供控制用的標籤（label）以及將標籤與對應表單元素建立關聯是非常重要的，當 screen reader （例如瀏覽器、電子郵件……等等）瀏覽一個頁面時，screen reader 會顯示 form controls ，但若沒有標示 control 和 label 之間的關聯， screen reader 沒法知道哪個 label 是對應哪個 control

## Step3

最後我們要進入本日的重點—localStorage

```jsx
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
		//...接續上方程式
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}
```

在這邊實作的部分，首先要取得localStorage的內容，如果不存在，則建立一個空陣列；在更新資料陣列後，將localStorage更新

### Storage

Web Storage API 中的 Storage 介面提供了存取特定 domain session 及本機儲存的方法，它能夠對存取的資料進行新增、刪除、修改，在操作上，如果是對象是 domain session storage ，會呼叫 `Window.sessionStorage`；而若是 local storage，則呼叫 `Window.localStorage`

方法

- `Storage.key()`

    當傳入一數字 n，會返回 storage 裡第 n 個值的 key 值

- `Storage.getItem()`
當傳入一 key 值,，會返回 storage 裡此 key 值對應的 value
- `Storage.setItem()`

    當傳入 key 及 value 的值，會在 storage 裡新增此 key 及 value 值，若 key 已存在，則會把值更新成傳入的 value

- `Storage.removeItem()`

    當傳入一 key 值,，會把此 key 從 storage 裡刪除

- `Storage.clear()`

    執行此方法，會刪除所有在 storage 裡的 key

### Window.localStorage

localStorage 為一唯讀屬性,，此屬性允許存取目前文件(Document)隸屬網域來源的 Storage 物件，其儲存資料的可存取範圍為跨瀏覽頁狀態(Browser Sessions)，localStorage 的儲存資料並無到期的限制

### Window.sessionStorage

sessionStorage 為一唯讀屬性，此屬性能允許存取當前來源的 Storage 物件，存放在 sessionStorage 的資料則會在頁面 session 結束時清空，只要頁面(頁籤)沒被關閉或者還原(restore)，資料就會保存，開啟新頁籤或視窗會產生一個新的sessionStorage


# Event Delegation

```jsx
const checkBoxes = document.querySelectorAll('input');
checkBoxes.forEach(input => input.addEventListener('click', () => console.log('hi')));
```

完成列表渲染後，需要幫<input>加上一個function，讓我們可以在點擊後更改它的狀態，這個時候可能會用上方範例程式碼的方法，為每一個<input>綁上事件監聽器

但是這樣做會遇到一個問題，每當列表更新後，事件監聽器就會失效

所以，我們將事件監聽器綁定父元素上

![Event%20Delegation%20a13cad396905412b94440aa21d9f29c0/_2020-09-14_10.35.11.png](Event%20Delegation%20a13cad396905412b94440aa21d9f29c0/_2020-09-14_10.35.11.png)

```jsx
const itemsList = document.querySelector('.plates');

function toggleDone(e) {
    // 跳過不是input的元素
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
}

itemsList.addEventListener('click', toggleDone);
```

每當點擊任何一個`<li>`的時候，其實也點擊了`<ul>`，因為`<ul>`把所有的`<li>`都包住了，所以不管`<li>`如何更動，我們都可以捕捉到點擊事件

### Event Bubbling

Event Bubbling是指每當在DOM觸發一個事件，事件會觸發元素的事件處理器(event handler)，再到父元素事件處理器

### Event Delegation

事件委派(Event Delegation)則是運用了Event Bubbling的一種設計模式，將事件處理器綁在目標元素的父元素上進行處理，如此可以減少事件監聽器的數量

### Element.matches()

`matchs()` 檢查是否由提供的選擇器字串選擇元素

## References

[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

[Event Delegation 事件委派](https://cythilya.github.io/2015/07/08/javascript-event-delegation/)

[[教學] 瀏覽器事件：Event Bubbling, Event Capturing 及 Event Delegation](https://shubo.io/event-bubbling-event-capturing-event-delegation/)