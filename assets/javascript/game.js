document.addEventListener('DOMContentLoaded', () => {
	//Game object
	let gameObject = {
		wordBank: ["word1","word2","word3"],
		winBanl: [],
		currentWord: "",
		remainingLetters: [],
		guessesRemaining: 15,
		
	};

	const doesLetterMatch = (inputLetter) => {
			console.log(inputLetter);
			console.log(gameObject.remainingLetters);

			let letterMatch = false
			gameObject.remainingLetters.map((x) => {
				if (inputLetter == x) letterMatch = true;
			});
			letterMatch ? gameObject.correctGuess(inputLetter) : gameObject.incorrectGuess();
		}
	const splitWord = (wordToSplit) => {
		const splitWordArray = wordToSplit.split("");
		gameObject.remainingLetters = splitWordArray;

		}

	const randomSelectNextWord = () => {
			const randomIndex = Math.random() * Math.floor(gameObject.wordBank.length)
			const newWord = gameObject.wordBank.splice(randomIndex, 1).toString();
			console.log(newWord);
			gameObject.currentWord = newWord;
			gameObject.splitWord(newWord);
		}

	const incorrectGuess = () => {console.log("Incorrect Guess")}
	const correctGuess = (inputLetter) => {
		const index = gameObject.remainingLetters.indexOf(inputLetter);
		gameObject.remainingLetters.splice(index,1);
	}


	const writeFunctionsToObject = () => {
		gameObject.incorrectGuess = incorrectGuess;
		gameObject.correctGuess = correctGuess;
		gameObject.splitWord = splitWord;
		gameObject.randomSelectNextWord = randomSelectNextWord;
		gameObject.doesLetterMatch = doesLetterMatch;
		
		// Object.keys(functionObject).map((x) => gameObject.x = x.value);
	}

	writeFunctionsToObject();
	randomSelectNextWord();


	//Event listeners
	document.addEventListener('keypress', (event) => {
		const inputLetter = event.key;
		gameObject.doesLetterMatch(inputLetter);
	})
		console.log((gameObject));
}); //DOMContentLoaded