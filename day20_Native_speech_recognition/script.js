window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
//as you are speaking, it will give you what you are saying as you are speaking

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    p.textContent = transcript;
    if(e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
    if(transcript.includes('unicorns')){
        console.log('unicorns!');
    }
    console.log(transcript);
});

recognition.addEventListener('end', recognition.start);

recognition.start();