var villians = [
    "CHUCKY",
    "FREDDYKRUEGER",
    "GHOSTFACE",
    "HANNIBALLECTER",
    "JASONVORHEES",
    "LEATHERFACE",
    "MICHAELMYERS",
    "PENNYWISE",
    "PINHEAD",
    "PUMPKINHEAD",
];

const maxTries = 10;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var wins = 0;

var gameSound = new Audio('./assets/sounds/theme.mp3')
var loseSound = new Audio('./assets/sounds/lose.wav')
var winSound = new Audio('./assets/sounds/win.wav')

function resetGame() {
    remainingGuesses = maxTries;

    currentWordIndex = Math.floor(Math.random() * (villians.length));

    guessedLetters = [];

    guessingWord = [];

    document.getElementById("rulesImage").src = "assets/images/rules.jpg";

    for (var i = 0; i < villians[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText= "display: none";
    document.getElementById("youwin-image").style.cssText= "display: none";

    updateDisplay();
};


function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    
};





function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < villians[currentWordIndex].length; i++) {
        if(villians[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if(positions.length <= 0){
        remainingGuesses--;
    }else{
        for(var i = 0; i< positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }

};


function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        winSound.play();
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "dislay: block";
        document.getElementById("rulesImage").style.cssText= "display: none";
        wins++;
        hasFinished = true;
        alert("You got away from " + guessingWord + "!")
    }
};


function checkLoss() {
    if(remainingGuesses <= 0 ) {
        loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        document.getElementById("rulesImage").style.cssText= "display: none";
        hasFinished = true;
        // alert("OH NO " + guessingWord + " caught you!")

    }
};


function makeGuess(letter) {
    if(remainingGuesses > 0) {
        if(guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
};


document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    }else{
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
            gameSound.play();

        }
    }
    
};