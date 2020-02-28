const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
function shadow(e){
    // const width = hero.offsetWidth;
    // const height = hero.offsetHeight;
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;
    const walk = 100; //100 px
    if(this !== e.target) {
        //this is what your addeventlistener is on
        //e.target, what is being triggered
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    const xWalk = (x / width * walk) - (walk / 2);
    const yWalk = (y / height * walk) - (walk / 2);
    text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7)`;
    console.log(x, y)
}

hero.addEventListener('mousemove', shadow);