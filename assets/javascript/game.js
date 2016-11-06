document.addEventListener('DOMContentLoaded', () => {
	let gameOn = true;
	let audioHumanError = new Audio('http://www.moviesoundclips.net/movies1/hal/hmnerror.mp3');
	let audioHumanError2 = new Audio('http://www.moviesoundclips.net/movies1/hal/humanerr.mp3')
	let audioEnthusiasm = new Audio('http://www.moviesoundclips.net/movies1/hal/enthusiasm.mp3');
	let audioWhatDoing = new Audio('http://www.moviesoundclips.net/movies1/hal/justwhat.mp3');
	let audioQuestion = new Audio('http://www.moviesoundclips.net/movies1/hal/2001.mp3');
	let audioFunctioning = new Audio('http://www.moviesoundclips.net/movies1/hal/halfunc.mp3');
	let audioStressPill = new Audio('http://www.moviesoundclips.net/movies1/hal/stress.mp3');
	// let audio
	let gameObject = {};

	const splitWord = (wordToSplit) => wordToSplit.split("");

	const writeToDOM = (arraytoWrite, elementId) => {
		let elementToWriteTo = document.getElementById(elementId.toString());
		while (elementToWriteTo.firstChild) {
			elementToWriteTo.removeChild(elementToWriteTo.firstChild);
		}
		var newElement; 
		//Write all elements to a fragment and appenChild to write only once
		var fragment = document.createDocumentFragment();
			arraytoWrite.map((x,i) => {
				newElement = document.createElement('li');
				newElement.innerHTML = x;
				fragment.appendChild(newElement);
			});
		elementToWriteTo.appendChild(fragment);
	}

	const selectRandomAudio = (audioArray) => {
		audioArray[Math.floor(Math.random()*audioArray.length)].play();
	}

	const doesLetterMatch = (inputLetter) => {
		if (gameObject.guessedLetters.indexOf(inputLetter) == -1) {
			let letterMatch = false;
			gameObject.currentWord.split("").map((x) => {
				if (inputLetter == x){ 
					letterMatch = true;
				}
			});
			letterMatch ? gameObject.correctGuess(inputLetter) : gameObject.incorrectGuess(inputLetter);
		}
		else document.getElementById('subtext').innerHTML = "Letter already guessed.";
		
	}

	const randomSelectNextWord = () => {
		if (gameObject.wordBank.length > 0) {
			const randomIndex = Math.random() * Math.floor(gameObject.wordBank.length);
			const newWord = gameObject.wordBank.splice(randomIndex, 1).toString();
			console.log(newWord);
			gameObject.currentWord = newWord;
			gameObject.remainingLetters = gameObject.splitWord(newWord);
			//One time write to DOM using underscores to show word length
			const underscores = [];
			gameObject.remainingLetters.map((_,i) => {
				underscores.push("_")
			});
			gameObject.correctGuessArray = [];
			gameObject.incorrectGuessArray = [];
			correctGuess(" ");
			writeToDOM(underscores, 'correctGuess');
			correctGuess(" ");
			writeToDOM(gameObject.incorrectGuessArray, 'incorrectGuess');

		}
		//Win condition
		else {
			gameOn = false;
			console.log('you won');
			document.getElementById('subtext').innerHTML = "Thank you for a very enjoyable game. Press the Enter key to restart the game.";
			audioEnthusiasm.play();
		}
	}

	const incorrectGuess = (inputLetter) => {
		gameObject.guessesRemaining--;
		document.getElementById('guessesRemaining').innerHTML = gameObject.guessesRemaining;
		gameObject.guessedLetters.push(inputLetter);
		gameObject.incorrectGuessArray.push(inputLetter);
		document.getElementById('subtext').innerHTML = "I'm sorry Dave, I'm afraid I can't do that.";
		splitGuessedLetters();
	}
	
	const correctGuess = (inputLetter) => {
		for (i = 0; i < gameObject.remainingLetters.length; i++) {
			if (inputLetter == gameObject.remainingLetters[i]) {
				gameObject.remainingLetters.splice(i, 1);
				i--; //To account for the index being reduced by one due to the splice
			}
		};
		gameObject.guessedLetters.push(inputLetter);
		if (inputLetter != " ") {document.getElementById('subtext').innerHTML = "Correct guess!";}
		splitGuessedLetters();
		if (gameObject.remainingLetters.length < 1) {wordWin();}
	}

	const wordWin = () => {
		gameObject.winBank.push(gameObject.currentWord);
		writeToDOM(gameObject.winBank, 'wordBank')
		gameObject.guessedLetters = [];
		document.getElementById('score').innerHTML = gameObject.winBank.length;
		document.getElementById('subtext').innerHTML = "New word. +2 guesses.";
		gameObject.guessesRemaining += 2;
		document.getElementById('guessesRemaining').innerHTML = gameObject.guessesRemaining;
		randomSelectNextWord();
		selectRandomAudio([audioWhatDoing, audioQuestion, audioStressPill]);
	}
	
	const splitGuessedLetters = () => {
		//Reperesents the current word split by character
		const splitWordArray = splitWord(gameObject.currentWord); 
	
		gameObject.guessedLetters.map((x,i) => {
			let match = false;
			splitWordArray.map((y, j) => { 
				if (x == y) {
				gameObject.correctGuessArray[j] = x; //Write the value 
				match = true;
				}
				else if (gameObject.correctGuessArray[j] == undefined) {
					gameObject.correctGuessArray[j] = '_';
				}
			});
		});

		gameObject.writeToDOM(gameObject.correctGuessArray, 'correctGuess');
		gameObject.writeToDOM(gameObject.incorrectGuessArray, 'incorrectGuess');
		//End of game condition
		if (gameObject.guessesRemaining < 1) {
			gameOn = false;
			document.getElementById('subtext').innerHTML = "You ran out of guesses. It can only be attributable to human error. Press Enter to restart the game.";
			selectRandomAudio([audioHumanError, audioHumanError2]);
		}

		console.table({correctGuessArray: gameObject.correctGuessArray,
						incorrectGuessArray: gameObject.incorrectGuessArray,
						remainingLetters: gameObject.remainingLetters,
						guessedLetters: gameObject.guessedLetters
		});
	}

	const writeFunctionsToObject = () => {
		self = gameObject;
		self.incorrectGuess = incorrectGuess;
		self.correctGuess = correctGuess;
		self.splitWord = splitWord;
		self.randomSelectNextWord = randomSelectNextWord;
		self.doesLetterMatch = doesLetterMatch.bind(gameObject);
		self.wordWin = wordWin;
		self.writeToDOM = writeToDOM;
		self.splitGuessedLetters = splitGuessedLetters;
		self.writeToDOM = writeToDOM;
		
		self.wordBank = ["dave bowman","hal 9000","daisy","kubrick","dawn of man", "clarke", "black monolith", "discovery one", "blue danube waltz"];
		self.winBank = [];
		self.currentWord = "";
		self.remainingLetters = [];
		self.guessedLetters = [];
		self.guessesRemaining = 10;
		self.correctGuessArray = [];
		self.incorrectGuessArray = [];

	}

	const init = () => {
		writeFunctionsToObject();
		randomSelectNextWord();
				
		//Event listeners
		document.addEventListener('keypress', (event) => {
			const inputLetter = event.key.toString();
			
			if (gameOn) {
				gameObject.doesLetterMatch(inputLetter.toLowerCase());
			}
			//Restart game
			else if (inputLetter == 'Enter') {
				gameOn = true;
				writeFunctionsToObject();
				randomSelectNextWord();
				audioFunctioning.play();
				document.getElementById('guessesRemaining').innerHTML = gameObject.guessesRemaining;
				document.getElementById('subtext').innerHTML = "New game started.";
			}
		});
	}
	init();
}); //DOMContentLoaded