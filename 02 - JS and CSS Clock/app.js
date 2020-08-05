const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();
    
    const second = now.getSeconds();
    const secondDeg = ((second / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondDeg}Deg)`;

    const min = now.getMinutes();
    const minDeg = ((min / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minDeg}Deg)`;
    
    const hours = now.getHours();
    const hoursDeg = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDeg}Deg)`;
}

setInterval(setDate, 1000);