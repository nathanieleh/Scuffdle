const lettersPattern = /^[A-Za-z][A-Za-z0-9]*$/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
const words = ['baker','store', 'horse', 'speak', 'clone', 'apple', 'bread'];

document.addEventListener('keydown', (e) => {
	let keyPress = e.key;
	if (keyPress.length == 1 && lettersPattern.test(keyPress) &&currentGuess.dataset.letters.length < 5) {
		updateLetters(keyPress);
	}
	else if (keyPress == 'Backspace' && currentGuess.dataset.letters != '') {
		deleteFromLetters();
	}
});

const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	updateTiles(currentTile, letter);
};

const updateTiles = (tileNumber, letter) => {
	let currentTile = document.querySelector('#guessTile' + tileNumber);
	currentTile.innerText = letter; // innerHTML is not secured
};

const deleteFromLetters = () => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1); // removes last character
	currentGuess.dataset.letters = newLetters;
	deleteFromTiles(oldLetters.length);
};

const deleteFromTiles = (tileNumber) => {
	document.querySelector('#guessTile' + tileNumber).innerText = '';
};