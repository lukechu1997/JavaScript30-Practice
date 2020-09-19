const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;
    const walk = 500;

    // if (this !== e.target) {
    //     x = x + e.target.offsetLeft;
    //     y = y + e.target.offsetTop;
    // }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    // text.style.textShadow = `
    //     ${xWalk}px ${yWalk}px 0 red,
    //     ${xWalk * -1}px ${yWalk}px 0 blue,
    //     ${xWalk}px ${yWalk * -1}px 0 green,
    //     ${xWalk * -1}px ${yWalk * -1}px 0 yellow
    // `;

    // console.log(width, height);
    // console.log(x, y);
}

hero.addEventListener('mousemove', shadow);