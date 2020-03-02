const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.log(`Oh No!!!`, err);
    });
}
//gets video from webcam and puts it in the video div

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take out the pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        // put in the altered pixels back into the canvas 
        ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    //played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i] += 100;//r
        pixels.data[i + 1] -= 50;//g
        pixels.data[i + 2] += 0.5;//b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 100] = pixels.data[i+1];
        pixels.data[i - 150] = pixels.data[i+2];
    }
    return pixels;
}

function greenScreen(pixels) {
    
}

getVideo();
video.addEventListener('canplay', paintToCanvas);