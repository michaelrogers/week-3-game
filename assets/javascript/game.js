document.addEventListener('DOMContentLoaded', () => {
	let gameOn = true;
	let gameObject = {
		testNumber: 50,
		get testFunction () {
			this.testNumber += 5;
			console.log(this.testNumber);
		},
		testFunctionTres: function () {
			this.testNumber += 7;
			console.log(this.testNumber);
		}
	};

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
	
	}

	const splitWord = (wordToSplit) => wordToSplit.split("");

	const randomSelectNextWord = () => {
		if (gameObject.wordBank.length > 0) {
			const randomIndex = Math.random() * Math.floor(gameObject.wordBank.length)
			const newWord = gameObject.wordBank.splice(randomIndex, 1).toString();
			console.log(newWord);
			gameObject.currentWord = newWord;
			gameObject.remainingLetters = gameObject.splitWord(newWord);
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
		splitGuessedLetters();
	}
	
	const correctGuess = (inputLetter) => {
		const index = gameObject.remainingLetters.indexOf(inputLetter);
		gameObject.guessedLetters.push(gameObject.remainingLetters.splice(index,1).toString());
		if (gameObject.remainingLetters.length < 1) {wordWin();}
		splitGuessedLetters();
	}

	const wordWin = () => {
		gameObject.winBank.push(gameObject.currentWord);
		console.log(gameObject.winBank);
		gameObject.guessedLetters = [];
		randomSelectNextWord();
	}
	const testFunctionPartDeux = function () {
		this.testNumber += 10;
		console.log()
	}


	const splitGuessedLetters = () => {
		const splitWordArray = splitWord(gameObject.currentWord);
		let correctGuessArray = [];
		let incorrectGuessArray = [];
		gameObject.guessedLetters.map((x,i) => {
			let match = false;
			splitWordArray.map((y, j) => {
				if (x == y) {
				correctGuessArray[j] = x; //Write the value 
				match = true;
				}
			});
			if (match == false) {
				incorrectGuessArray.push(x);
			}

		});

		writeToDOM(correctGuessArray, incorrectGuessArray);
		console.table({correctGuessArray,
						incorrectGuessArray,
						remainingLetters: gameObject.remainingLetters,
						guessedLetters: gameObject.guessedLetters
		});
	}

	const writeToDOM = (correctGuessArray, incorrectGuessArray) => {
		let correctGuessElement = document.getElementById('correctGuess');
		let incorrectGuessElement = document.getElementById('incorrectGuess');
		console.log(correctGuessElement);
		// correctGuessElement.innerHTML = '';
		while (correctGuessElement.firstChild) {
			correctGuessElement.removeChild(correctGuessElement.firstChild);
		}
		console.log(correctGuessElement);

	}

	const writeFunctionsToObject = () => {
		gameObject.incorrectGuess = incorrectGuess;
		gameObject.correctGuess = correctGuess;
		gameObject.splitWord = splitWord;
		gameObject.randomSelectNextWord = randomSelectNextWord;
		gameObject.doesLetterMatch = doesLetterMatch;
		gameObject.wordWin = wordWin;
		gameObject.writeToDOM = writeToDOM;
		gameObject.splitGuessedLetters = splitGuessedLetters;
		
		gameObject.wordBank = ["word1","word2","woord3"];
		gameObject.winBank = [];
		gameObject.currentWord = "";
		gameObject.remainingLetters = [];
		gameObject.guessedLetters = [];
		gameObject.guessesRemaining = 15;
		//Object.defineProperty(gameObject, 'wordBank', ["word1","word2","word3"]);
		
		Object.defineProperty(gameObject, "testFunctionPartDeux", {get: testFunctionPartDeux});
	}


	writeFunctionsToObject();
	// let gameObjectGame = new writeFunctionsToObject;
	console.log(gameObject);
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
	gameObject.testFunctionTres();
	// gameObject.testFunction();
	// gameObject.testFunctionPartDeux();

}); //DOMContentLoaded