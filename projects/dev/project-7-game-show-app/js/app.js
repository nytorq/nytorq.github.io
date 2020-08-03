/*jshint esversion: 6 */

// GLOBAL VARIABLES

let missed = 0;
let phraseArray;
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.getElementsByClassName('btn__reset');
const phrases = ['I am a meat-popsicle.',
                 'Apes together strong',
                 'I am Groot.',
                 'I see dead people.',
                 'I am one with the Force, the Force is with me.',
                 'There is no spoon.',
                 'Why so serious?',
                 'Witness me!'];

// FUNCTIONS

function getRandomPhraseArray(array) {
  const min = 0;
  const max = array.length;
  let randNumber = Math.floor(Math.random() * (max - min)) + min;
  return (array[randNumber].split(''));
}

function addPhraseToDisplay() {
  const phraseBanner = document.getElementById('phraseBanner');
  for (let i = 0 ; i < phraseArray.length ; i++) {
    let newListItem = document.createElement('li');
    newListItem.textContent = phraseArray[i];
    if (/\W/.test(newListItem.textContent)) {
      newListItem.className = 'non-letter';
    } else {
      newListItem.className = 'letter';
    }
    phraseBanner.appendChild(newListItem);
  }
}

function checkLetter(parameter) {
  if (phraseArray.includes(parameter) || phraseArray.includes(parameter.toUpperCase())) {
    let letters = document.getElementsByClassName('letter');
    for (let i = 0 ; i < letters.length ; i++) {
      if (letters[i].textContent.toLowerCase() === parameter) {
        letters[i].classList.add('show');
        letterFound = letters[i].textContent.toLowerCase();
      }
    }
  } else {
    return null;
  }
}

function checkWin() {
  let title = document.getElementsByClassName('title');
  let shown = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  if (shown.length === letters.length) {
    overlay.style.display = 'inherit';
    overlay.className = 'win';
    title[0].innerText = 'You have won the game!';
  } else if (missed >= 5) {
    overlay.style.display = 'inherit';
    overlay.className = 'lose';
    title[0].innerText = 'You have lost the game.';
  }
}

// EVENT LISTENERs

startGame[0].addEventListener('click', () => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  phraseArray = getRandomPhraseArray(phrases);
  missed = 0;
  let tries = document.getElementsByClassName('tries');
  for (i=0; i < tries.length ; i++) {
    tries[i].style.opacity = 1;
  }
  const phraseBanner = document.getElementById('phraseBanner');
  while (phraseBanner.lastChild) {
    phraseBanner.removeChild(phraseBanner.lastChild);
  }
  let chosen = document.getElementsByClassName('chosen');
  while (chosen[0]) {
    chosen[0].removeAttribute("disabled");
    chosen[0].classList.remove('chosen');
  }
  addPhraseToDisplay();
});

qwerty.addEventListener('click', ()=> {
  let target = event.target;
  if (target.nodeName.toLowerCase() === 'button') {
    target.className = 'chosen';
    target.setAttribute('disabled', true);
    let pressedLetter =  target.textContent;
    let letterFound = checkLetter(pressedLetter);
    let tries = document.getElementsByClassName('tries');
    if (letterFound === null) {
      tries[missed].style.opacity = 0.1;
      missed += 1;
    }
    checkWin();
  }
});
