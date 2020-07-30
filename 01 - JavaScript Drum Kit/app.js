function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if (!audio) return; //終止函式
    audio.currentTime = 0; //重設音效時間
    audio.play(); //播放音效
    key.classList.add('playing');
    // console.log(e.keyCode);
}


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
//新增事件讀取器，讀取keydown事件
window.addEventListener("keydown", playSound);
