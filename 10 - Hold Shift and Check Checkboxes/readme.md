# Hold Shift to Check Multiple Checkboxes

## Step1

```jsx
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handelCheck));
```

選定元素，並綁定事件監聽器

## Step2

```jsx
let lastChecked;

function handelCheck(e) {
    // console.log(e);
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log('check');
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }

    lastChecked = this;
}
```

首先，建立一個變數`inBetween`來判定選定的checkbox是否在想要的區間內，而`lastChecked`會標記上一個選定的checkbox

當shift鍵和check觸發時，會進入一個迴圈，當被讀取的元素是被選定的元素或上次點選的元素，`inBetween`會改變狀態

最後當`inBetween`為`true`，checkbox會被選擇