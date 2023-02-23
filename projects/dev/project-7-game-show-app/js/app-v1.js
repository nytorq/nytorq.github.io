/*jshint esversion: 6 */

// VERSION 1 --- Closed on Mar 13th, 2019 at 18:36 MDT

// VARIABLES
// const phrase = ['I am a meat-popsicle.',
//                 'Apes together strong',
//                 'Groot',
//                 'I am Groot.',
//                 'I see dead people.',
//                 'I am one with the Force, the Force is with me.',
//                 'There is no spoon.',
//                 'Why so serious?',
//                 'Witness me!'];
const phrase = ['Bob', 'Richard', 'Sally'];
let missed = 0;
const startGame = document.getElementsByClassName('btn__reset');
const phraseBanner = document.querySelectorAll('ul');
const keyboardButton = document.querySelectorAll('button');
const tries = document.getElementsByClassName('tries');
const overlay = document.getElementById('overlay');
let parsedLetterNumber;
let parsedShownLetterNumber;
let letterFound;
let phraseArray = document.getElementsByClassName('letter');
let phraseLetters = [];
let guessLetter;
let index;

// FUNCTIONS

function getRandomPhraseArray(array) {
  const min = 0;
  const max = phrase.length;
  return array[Math.floor(Math.random() * (max - min)) + min];
  // return array[2];
}

// function removeOverlay() {
//   startGame[0].addEventListener('click', () => {
//     overlay.style.display = 'none';
//   });
// }
// removeOverlay()

function resetGame() {
  startGame[0].addEventListener('click', () => {
    overlay.style.display = 'none';
    missed = 0;
    console.log('Hello from the newGame button. The missed variable equals ' + missed + '.');
    for (i=0 ; i < keyboardButton.length ; i++) {
      keyboardButton[i].className='';
    };
    for (i=0; i < tries.length ; i++) {
      tries[i].style.opacity = 1;
    }
    // for (i=0 ; i < phraseBanner.length ; i++) {
    //   phraseBanner[i].removeElement();
    // };
    // const oldLetters = document.getElementsByClassName('show');
    // const oldNonLetters = document.getElementsByClassName('non-letter');
    // for (i=0 ; i < oldLetters.length ; i++) {
    //   console.log(oldLetters);
    //   console.log("Removing letter in index " + i + " in oldLetters array.")
    //   phraseBanner[0].removeChild(oldLetters[i]);
    // };
    // do {
    //   console.log('Removing letter ' + oldLetters[0].textContent+ '.');
    //   phraseBanner[0].removeChild(oldLetters[0]);
    // } while (oldLetters[0])
    // do {
    //   phraseBanner[0].removeChild(oldNonLetters[0]);
    // } while (oldNonLetters[0])
    // const ul = getElementsByTagName('ul')
    // phraseBanner.removeChild(oldLetters[0]);
    let li = document.getElementById('phraseBanner').querySelectorAll('*');
    for (i=0 ; i < li.length ; i++) {
      li[i].remove();
    };
    addPhraseToDisplay();
    pushLetters(phraseArray);
    keyboardEnabler();
  });
}

// const chosenPhrase = getRandomPhraseArray(phrase);
// const characterArray = [...chosenPhrase];

function addPhraseToDisplay() {
  const chosenPhrase = getRandomPhraseArray(phrase);
  const characterArray = [...chosenPhrase];
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

function pushLetters(phrase) {
  for (let i = 0 ; i < phrase.length ; i++) {
    let whatLetter = phrase[i].textContent.toLowerCase();
    phraseLetters.push(whatLetter);
  }
}
pushLetters(phraseArray);

function keyboardEnabler() {
  for (let i = 0 ; i < keyboardButton.length ; i++) {
    keyboardButton[i].addEventListener('click', () => {
      const guess = keyboardButton[i];
      guess.className = 'chosen';
      function checkLetter(chosenButton) {
        guessLetter = chosenButton.textContent;
        if (phraseLetters.includes(guessLetter)) {
          letterFound = guessLetter;
          console.log('The keyboard registered the letter "' + guessLetter + '".')
          } else {
            letterFound = null;
            console.log('Your guess did not match any letters.')
        }
      }
      checkLetter(guess);
      if (letterFound === null) {
        tries[missed].style.opacity = 0.1;
        missed += 1;
        console.log('missed equals ' + missed + ".")
        checkWin();
      } else {
        if (letterFound) {
          do {
            index = phraseLetters.indexOf(letterFound);
            if (index === -1){
              return;
            } else {
                console.log('phraseArray index is equal to ' + index + '.')
                phraseArray[index].className = 'show';
            }
            phraseLetters.splice(index, 1);
            checkWin();
          } while (index >= 0);
        }
      }
      function checkWin() {
        let title = document.getElementsByClassName('title');
        const shownLetters = document.getElementsByClassName('show');
        parsedShownLetterNumber = shownLetters.length;
        // console.log("Shown letters is equal to : " + parsedShownLetterNumber);
        if (missed === 5) {
          overlay.style.display = 'inherit';
          overlay.className = 'lose';
          title[0].innerText = 'You have lost the game.';
          resetGame();
        } else if (parsedLetterNumber === parsedShownLetterNumber) {
          overlay.style.display = 'inherit';
          overlay.className = 'win';
          title[0].innerText = 'You have won the game!';
          resetGame();
        }

      }
    });
  }
}

resetGame();
