const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
    e.stopPropagation(); // stop bubbling up!
    console.log(this.classList.value);
}

document.body.addEventListener('click', logText)

divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: true // unbinds itself 
}));

button.addEventListener('click', () => {
    console.log('click');
}, {
    once: true
});


//unbinding is: div.removeEventListener('click');
//capture true, run on the way down