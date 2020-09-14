# Key Sequence Detection

```jsx
const pressed = [];
const secretCode = 'lukechu';

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

    if (pressed.join('').includes(secretCode)) {
        console.log('tada!!');
    }
    console.log(pressed);
});
```

首先，先建立一個陣列，用來儲存輸入的key

再來，對整個視窗綁定事件監聽器，當使用者敲擊按鍵後(keyup)，將敲擊的案件存到先前建立的陣列中

我們需要比對的字串長度只需要跟secretCode的長度相同，所以可以使用`splice()`，第一項引數若是負的則會由後往前數

最後，只要比對由陣列組成的字串是否與secretCode相同就完成了