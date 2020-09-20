# Sort Without Articles

## 範例資料

```jsx
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
```

## Step1

```jsx
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

const ordered = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);

console.log(ordered);
```

在排序開始之前，要先移除冠詞(Articles)，這邊用到的是[正規表達式](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions)，^表示從字串的開頭開始比對，i表示的是忽略大小寫，將冠詞以空字串取代掉之後，再以trim()將字串前後的空白消掉

最後，排序的部分就以之前提過的sort()完成，sort()也可以直接完成照字母先後排序

## Step2

```jsx
document.querySelector('#bands').innerHTML = ordered.map(band => `<li>${band}</li>`).join('')
```

最後，只要將排序過的陣列以innerHTML插入顯示畫面就完成了