
    
    function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        if(!audio) return;
        audio.currentTime = 0; //rewind to start;
        audio.play();
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if(audio) {
            key.classList.add("playing");
        }
        
    }
    
    function removeTransition(e) {
        if(e.propertyName !== 'transform') return; // skip it if it's not a transition'
        this.classList.remove('playing');
    }

    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('transitionend', removeTransition);
    });
window.addEventListener('keydown', playSound);