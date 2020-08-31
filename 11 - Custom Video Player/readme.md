# Custom HTML5 Video Player

## Step1

暫停／播放影片

```jsx
//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');

//build functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';//與下方if else相同
    video[method]();
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

//hook up the event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

首先是對點擊畫面播放／暫停影片

先選定要監聽事件的元素，然後綁定事件監聽器

在togglePlay()中，判定媒體是否處於暫停狀態；點擊後改變現在媒體播放的狀態。

這邊使用`element[method]();`的寫法，來操作媒體

```jsx
//build functions
function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

//hook up the event listeners
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
```

更改播放／暫停按鈕

綁定監聽器觸發function的時機是偵測到媒體播放或暫停

## Step2

快進／快退

```jsx
//get elements
const skipBtns = player.querySelectorAll('[data-skip]');

//build functions
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

//hook up the event listeners
skipBtns.forEach(btn => btn.addEventListener('click', skip));
```

選定有`data-skip`屬性的元素，點擊該元素後觸發function

## Step3

音量／播放速度

```jsx
//get elements
const ranges = player.querySelectorAll('.player__slider');

//build functions
function handelRangeUpdate() {
    video[this.name] = this.value;
    // console.log(this.name, this.value);
}

//hook up the event listeners
ranges.forEach(range => range.addEventListener('change', handelRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handelRangeUpdate));
```

選定元素，當數值更動，變更媒體相對應的屬性（音量／播放速度）

## Step4

進度條

```jsx
//get elements
const progressBar = player.querySelector('.progress__filled');

//build functions
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//hook up the event listeners
video.addEventListener('timeupdate', handleProgress);
```

選定元素，當播放時間更動時，更新進度條長度

## Step5

跳轉

```jsx
const progress = player.querySelector('.progress');

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

（進度條的Ｘ軸/進度條長度）＊媒體總長，得出要跳轉的時間

