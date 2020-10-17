/* Get Our videoents */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = document.querySelector('.full');

console.log(document.querySelector('.full'))




// functions: 
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}


function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';     //to change text content;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


function makeFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}




//Event Listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener("mousemove", updateRange));

progress.addEventListener('click', scrub);


fullScreen.addEventListener('click', makeFullScreen)


document.body.onkeyup = function (e) {        //play or pause with space bar;
    if (e.keyCode === 32) {
        togglePlay()
    }
    else if (e.keyCode === 37) {
        video.currentTime += -5;
    }
    else if (e.keyCode === 39) {
        video.currentTime += 5;
    }

}