document.addEventListener('DOMContentLoaded', () => {
	let gameOn = true;
	let gameObject = {};

	const doesLetterMatch = (inputLetter) => {
		// console.log(inputLetter);
		if (gameObject.guessedLetters.indexOf(inputLetter) == -1) {
			let letterMatch = false;
			gameObject.currentWord.split("").map((x) => {
				if (inputLetter == x){ 
					letterMatch = true;
				}
			});
			letterMatch ? gameObject.correctGuess(inputLetter) : gameObject.incorrectGuess(inputLetter);
		}
		else console.log("Letter already guessed");
		console.table({remainingLetters:
				gameObject.remainingLetters,
				guessedLetters: gameObject.guessedLetters});
	}

	const splitWord = (wordToSplit) => {
		const splitWordArray = wordToSplit.split("");
		gameObject.remainingLetters = splitWordArray;

	}

	const randomSelectNextWord = () => {
		if (gameObject.wordBank.length > 0) {
			const randomIndex = Math.random() * Math.floor(gameObject.wordBank.length)
			const newWord = gameObject.wordBank.splice(randomIndex, 1).toString();
			console.log(newWord);
			gameObject.currentWord = newWord;
			gameObject.splitWord(newWord);
		}
		else {
			gameOn = false;
			console.log('you won');
		}
	}

	const incorrectGuess = (inputLetter) => {
		gameObject.guessesRemaining--;
		gameObject.guessedLetters.push(inputLetter);
		console.log(gameObject.guessesRemaining);
	}
	
	const correctGuess = (inputLetter) => {
		const index = gameObject.remainingLetters.indexOf(inputLetter);
		gameObject.guessedLetters.push(gameObject.remainingLetters.splice(index,1).toString());
		if (gameObject.remainingLetters.length < 1) {wordWin();}
	}

	const wordWin = () => {
		gameObject.winBank.push(gameObject.currentWord);
		console.log(gameObject.winBank);
		gameObject.guessedLetters = [];
		randomSelectNextWord();
	}


	const writeFunctionsToObject = () => {
		gameObject.incorrectGuess = incorrectGuess;
		gameObject.correctGuess = correctGuess;
		gameObject.splitWord = splitWord;
		gameObject.randomSelectNextWord = randomSelectNextWord;
		gameObject.doesLetterMatch = doesLetterMatch;
		gameObject.wordWin = wordWin;
		gameObject.wordBank = ["word1","word2","word3"];
		gameObject.winBank = [];
		gameObject.currentWord = "";
		gameObject.remainingLetters = [];
		gameObject.guessedLetters = [];
		gameObject.guessesRemaining = 15;
	}

	writeFunctionsToObject();
	// let gameObjectGame = new writeFunctionsToObject;
	randomSelectNextWord();


	//Event listeners
	document.addEventListener('keypress', (event) => {
		const inputLetter = event.key;
		
		if (gameOn) {
			gameObject.doesLetterMatch(inputLetter);
		}

		else if (inputLetter == 'Enter') {
			gameOn = true;
			writeFunctionsToObject();
			randomSelectNextWord();
			console.log('Restarted');
		}
	});


}); //DOMContentLoaded