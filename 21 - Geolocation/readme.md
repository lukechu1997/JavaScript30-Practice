# Geolocation

## Step0

今天的練習還是需要server，可以使用原作者提供的，也可以用自己習慣的喔

除了server之外，我們還會需要一個行動裝置，或者是模擬器，這樣我們才能進行測試，如果沒辦法準備的話，就簡單看過吧

## Step1

```jsx
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {
    console.log(data);
});
```

Web Apps 若需要使用者的位置，可透過 Geolocation API 取得相關資訊，而基於隱私權的考量，這些 Web Apps 均必須取得使用者的許可之後，才能發佈位置資訊

Geolocation API，是透過 navigator.geolocation 物件所發佈

### Geolocation Methods

- `getCurrentPosition()`

    獲取設備當前的位置

- `watchPosition()`

    這個方法是用來註冊一個處理的函式，當使用者的裝置位置更新時，這個函式所傳入的回呼函式(callback function) 就會自動被呼叫。

### Position

- `Coordinates.latitude` : 回傳一個十進位的 double 代表緯度
- `Coordinates.longitude` : 回傳一個十進位的 double 代表經度
- `Coordinates.altitude` : 回傳一個 double 代表距離海平面的高度，單位為公尺。如果無法提供這個值則回傳 null
- `Coordinates.accuracy` : 回傳一個 double 代表經緯度的精準值，單位為公尺
- `Coordinates.altitudeAccuracy` : 回傳一個 double 代表高度的精準度，單位為公尺。如果無法提供這個值則回傳 null
- `Coordinates.heading` : 回傳一個 double 代表裝置前進的方向，這個數值代表你偏離北方多少度，0度代表你向著正北方，照著順時針的方向遞增(90度代表正東方，270度代表正西方)，如果速度值為0度，則此值為 NaN。如果無法提供這個值則回傳 null
- `Coordinates.speed` : 回傳一個 double 代表速度，單位為公尺/秒，如果無法提供這個值則回傳 null

## Step2

```jsx
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
    console.error(err);
});
```

只要把回傳的數據帶入前端畫面就完成了

## References

[Position](https://developer.mozilla.org/zh-TW/docs/Web/API/GeolocationPosition)

[Coordinates](https://developer.mozilla.org/zh-TW/docs/Web/API/GeolocationCoordinates)

[Geolocation](https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation)