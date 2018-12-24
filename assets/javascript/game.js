const game = {
    wordList : [
        "Upgrade",
        "The Thing", 
        "Under the Skin", 
        "Good Time",
        "Robocop",
        "The Servant",
        "Porco Rosso",
        "Moonstruck",
        "Raw",
        "First Reformed",
        "Thelma and Louise",
        "Sorry to Bother You",
        "Silence",
        "King of New York",
        "Fargo",
        "Wild at Heart",
        "Blade Runner",
        "The Beguiled",
        "Marie Antoinette",
        "Point Break",
        "Hail, Caesar!"
        ],
    wins : 0,
    word : "",
    blankWord : "",
    remainingGuesses: 7,
    guessedLetters: [],
    guess : "",

    getWord : function() {
        const index = Math.floor(Math.random() * game.wordList.length);
        game.word = game.wordList[index];
    },

    makeWordArray : function (wordString) {
        return wordString.split("")
    },

    makeWordString : function (wordArray) {
        return wordArray.join("")
    },

    makeBlankWord : function () {
        const len = String(game.word).length;
        game.blankWord = "_".repeat(len);
    },

    getGuess : function(event) {
        let guess = event.key;
        game.guess = guess.toLowerCase();
    },

    checkGuess : function () {
        return game.word.toLowerCase().includes(String(game.guess))
    },

    correctGuess : function () {
        game.updateBlankWord();
    },

    incorrectGuess : function () {
        if (!game.guessedLetters.includes(game.guess)) {
            game.guessedLetters.push(game.guess);
            game.remainingGuesses -= 1;
        }
    },

    guessRound : function (event) {
        game.getGuess(event);
        if (game.checkGuess()) {
            game.correctGuess();
        }else {
            game.incorrectGuess();
        }
        game.drawGameFrame();
    },

    updateBlankWord : function() {
        const blankWordArray = game.makeWordArray(game.blankWord);
        for (i = 0; i < game.word.length; i++) {
            if (game.word[i].toLowerCase() == game.guess) {
                blankWordArray[i] = game.word[i];
            }
        }
        game.blankWord = String(game.makeWordString(blankWordArray))
    },

    checkContinue : function () {
        if (game.checkWin() || game.checkLose()) {
            game.endGame();
        }
    },

    checkWin : function() {
        if (!game.blankWord.includes("_")) {
            alert("Congrats! You win!");
            game.wins += 1;
            return true
        }
    },

    checkLose : function() {
        if (game.guessedLetters.length >= 7) {
            alert("Sorry! You lose!");
            return true
        }
    },

    endGame : function() {
        document.removeEventListener("keypress", game.playerTurn);
        game.play();
    },

    drawGameFrame : function () {
        document.getElementById("win-count").innerHTML = game.wins;
        document.getElementById("remaining-guesses").innerHTML = game.remainingGuesses;
        document.getElementById("blank-word").innerHTML = game.blankWord.split("").join("&nbsp;&nbsp;");
        document.getElementById("letters-guessed").innerHTML = game.guessedLetters.join(" ");
    },

    

    playerTurn : function (event) {
        game.guessRound(event);
        setTimeout(game.checkContinue, 150);
    },

    play : function() {
        game.getWord();
        game.makeBlankWord();
        game.remainingGuesses = 7;
        game.guessedLetters = [];
        game.drawGameFrame();
        document.addEventListener("keypress", game.playerTurn);
    },


}

game.play();










