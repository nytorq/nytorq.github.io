// VARIABLES

const qwerty = document.getElementById('qwerty');
const phrase = ['I am a meat-popsicle.',
                'Apes together strong',
                'Groot',
                'I am Groot.',
                'I see dead people.',
                'I am one with the Force, the Force is with me.',
                'There is no spoon.',
                'Why so serious?',
                'Witness me!']
let missed = 0;
let match = 0;
const startGame = document.getElementsByClassName('btn__reset');
const phraseBanner = document.querySelectorAll('ul');
const keyboardButton = document.querySelectorAll('button');
const tries = document.getElementsByClassName('tries');
const overlay = document.getElementById('overlay');
let parsedLetterNumber = '';
let parsedShownLetterNumber = '';
let heartsLost = 0;
let letterFound;
let phraseArray = '';

// FUNCTIONS

function getRandomPhraseArray(array) {
  // const min = 0;
  // const max = phrase.length;
  // return array[Math.floor(Math.random() * (max - min)) + min];
  return array[2]; // This is for testing purposes. Allows you to specify which phrase you want.
};

startGame[0].addEventListener('click', () => {
  overlay.style.display = 'none';
});


const chosenPhrase = getRandomPhraseArray(phrase);
const characterArray = [...chosenPhrase];

function addPhraseToDisplay() {
  for (let i = 0 ; i < characterArray.length ; i++) {
    const newLi = document.createElement('li');
    const currentCharacter = characterArray[i];
    if (/\W/.test(currentCharacter)) {
      newLi.className = 'non-letter';
    } else {
      newLi.className = 'letter';
    }
    newLi.textContent = currentCharacter;
    phraseBanner[0].appendChild(newLi);
    const letterArray = document.getElementsByClassName('letter');
    parsedLetterNumber = letterArray.length;
  }
}

addPhraseToDisplay();


for (let i = 0 ; i < keyboardButton.length ; i++) {
  keyboardButton[i].addEventListener('click', () => {
    const guess = keyboardButton[i];
    guess.className = 'chosen';
    phraseArray = document.getElementsByClassName('letter');
    function checkLetter(chosenButton) {
      for (let i = 0 ; i < phraseArray.length ; i++) {
        const currentLetter = phraseArray[i].textContent.toLowerCase();
        const guessLetter = chosenButton.textContent;
        if (currentLetter === guessLetter) {
          phraseArray[i].className = 'show';
          letterFound = guessLetter;
          console.log('MATCH! Keyboard input equals ' + guessLetter + '. CurrentLetter is ' + currentLetter + '. And, letterFound is set to ' + letterFound + '.');
        } else {
          console.log('Keyboard input equals ' + guessLetter + '. CurrentLetter is ' + currentLetter + '. And, letterFound is set to ' + letterFound + '.');
          return null;
        }

      };
      return letterFound;
    };
    checkLetter(guess);
    if (letterFound == null) {
      tries[missed].style.opacity = 0.1;
      missed += 1;
    }
    function checkWin() {
      let title = document.getElementsByClassName('title');
      const shownLetters = document.getElementsByClassName('show');
      parsedShownLetterNumber = shownLetters.length
      if (missed === 5) {
        overlay.style.display = 'inherit';
        overlay.className = 'lose';
        title[0].innerText = 'You have lost the game.';
      } else if (parsedLetterNumber === parsedShownLetterNumber) {
        overlay.style.display = 'inherit';
        overlay.className = 'win';
        title[0].innerText = 'You have won the game!';
      }
    }
    checkWin();
  });

};
