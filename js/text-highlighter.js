// Javascript text highlighter
/*jshint esversion: 6 */

// CONST VARIABLES
const captions = document.getElementsByClassName('captions');

// lET VARIABLES
let video = document.getElementsByClassName('video');
let videoTime;

// EVENT LISTENERS

video[1].addEventListener('timeupdate', () => {
  videoTime = video[1].currentTime;
  currentTime();
});


// FUNCTIONS AND LOOPS
const currentTime = () => {
  for (let i=0; i<=captions.length; i++) {
    if (videoTime > captions[i].dataset.start && videoTime < captions[i].dataset.end) {
      captions[i].classList.add("highlighted");
    } else {
      captions[i].classList.remove("highlighted");
    }
  }
};

for (let i=0; i<=captions.length; i++) {
  captions[i].addEventListener('click', () => {
    let startTime = captions[i].dataset.start;
    video[1].currentTime = startTime;
  });
}
