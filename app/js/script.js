// import { wordList } from '../../gulpfile.js';

const lettersPattern = /^[a-z]*$/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
let win = false;
let checkingGuess = false;

let words = ['words', 'apple', 'pizza', 'thing', 'chaos', 'teach', 'child', 'throb', 'mania', 'pluck', 'times', 'place', 'grape', 'homes', 'jails', 'wells', 'front'];
// let words = createWordList();
let solutionWord = words[Math.floor(Math.random() * words.length)];

document.addEventListener('keydown', (e) => {
	let keyPress = e.key;
	if(currentGuessCount < 7 && !checkingGuess && !win) {
		if (keyPress.length == 1 && lettersPattern.test(keyPress) && currentGuess.dataset.letters.length < 5) {
			updateLetters(keyPress);
		}
		else if (keyPress == 'Backspace' && currentGuess.dataset.letters != '') {
			deleteFromLetters();
		}
		else if (keyPress == 'Enter' && currentGuess.dataset.letters.length == 5) {
			submitGuess();
    	}
	}
});

// let guessDone = false;
// const isGuessComplete = new Promise((resolve, reject) => {
// 	if (guessDone) {
// 		resolve();
// 	}
// 	else {
// 		reject();
// 	}
// });

// const checkIfGuessComplete = () => {
// 	isGuessComplete
// 		.then(() => {
//             guessDone = true;
//         });
// };

const submitGuess = () => {
	checkingGuess = true;
	for (let i = 0; i < solutionWord.length; i++) {
		setTimeout(() => {
			revealTile(i, checkLetter(i));
		}, i*200);
		// if(i==4) {
		// 	guessDone = true;
		// }
		// isGuessComplete.then(checkWin());
	}
};

const checkIfGuessComplete = (i) => {
	if(i==4) {
		checkWin();
	}
};

const jumpTiles = () => {
	for(let i = 1; i <= solutionWord.length; i++) {
		setTimeout(() => {
			let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + i);
            currentTile.classList.add('jump');
        }, (i-1)*100);
	}
};

const checkWin = () => {
	if(solutionWord == currentGuess.dataset.letters.toLowerCase()) {
		win = true;
		setTimeout(() => {jumpTiles();}, 300);
		checkingGuess = false;
		congratulations();
	}
	else {
		currentGuessCount++;
		currentGuess = document.querySelector('#guess' + currentGuessCount);
		checkingGuess = false;
		if(currentGuessCount == 7)
			showSolution();
	}
};

const showSolution = () => {
	setTimeout(() => {alert('Better luck next time! Solution is: "' + solutionWord + '"');}, 300);
}

const congratulations = () => {
	setTimeout(() => {alert('Hooray! You solved it! Reload the page to try again.');}, 300);
}

const updateLetters = (letter) => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters + letter;
	let currentTile = newLetters.length;
	currentGuess.dataset.letters = newLetters;
	updateTiles(currentTile, letter);
};

const updateTiles = (tileNumber, letter) => {
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
	currentTile.innerText = letter; // innerHTML is not secured
	currentTile.classList.add('has-letter');
};

const deleteFromLetters = () => {
	let oldLetters = currentGuess.dataset.letters;
	let newLetters = oldLetters.slice(0, -1); // removes last character
	currentGuess.dataset.letters = newLetters;
	deleteFromTiles(oldLetters.length);
};

const deleteFromTiles = (tileNumber) => {
	let currentTile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
	currentTile.innerText = '';
	currentTile.classList.remove('has-letter');
};

const checkLetter = (position) => {
	let guessedLetter = currentGuess.dataset.letters.charAt(position);
	let solutionLetter = solutionWord.charAt(position);

	if(guessedLetter == solutionLetter) {
		return 'correct';
	}
	else {
		// read as "if solutionWord contains letter return present, otherwise return absent"
		return solutionWord.includes(guessedLetter) ? 'present' : 'absent';
	}
};

const revealTile = (i, status) => {
	let tileNumber = i + 1;
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
	flipTile(tileNumber, status);
	checkIfGuessComplete(i);
};

const flipTile = (tileNumber, status) => {
	let tile = document.querySelector('#guess' + currentGuessCount + 'Tile' + tileNumber);
	tile.classList.add('flip-in');
	setTimeout(() => {
		tile.classList.add(status);
		tile.classList.remove('flip-in');
		tile.classList.add('flip-out');
	}, 250); // having code outside of the timeout is run regardless of it the previous code in timeout has
	setTimeout(() => {
        tile.classList.remove('flip-out');
    }, 500);
};