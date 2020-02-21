const canvas = document.querySelector('canvas');
//we draw on the context and not on the actual html itself
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let hue = 0;
let direction = true;



function draw(e) {
    if(!isDrawing) return; //stops draw function from running when not moused down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 1) % 360;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    //start from
    ctx.lineTo(e.offsetX, e.offsetY);
    //go to
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}


canvas.addEventListener('mousedown', (e) => {    
    [lastX, lastY] = [e.offsetX, e.offsetY];
    isDrawing = true;
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);