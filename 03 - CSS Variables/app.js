const inputs = document.querySelectorAll('.controls input');

function handelUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); //設定css屬性值(屬性名, 屬性值)
}

inputs.forEach(input => input.addEventListener('change', handelUpdate)); //更改數值時觸發事件
inputs.forEach(input => input.addEventListener('mousemove', handelUpdate)); //滑鼠移動時觸發事件