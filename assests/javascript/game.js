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

function resetGame() {
    remainingGuesses = maxTries;

    currentWordIndex = Math.floor(Math.random() * (villians.length));

    guessedLetters = [];

    guessingWord = [];

    document.getElementById("hangmanImage").src = "assests/images/rules.jpg";

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


// function updateHangmanImage() {
//     document.getElementById("hangmanImage").src = "assests/images" + (maxTries - remainingGuesses) + ".png";
// };


function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < villians[currentWordIndex].length; i++) {
        if(villians[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if(positions.length <= 0){
        remainingGuesses--;
        // updatehangmanImage();
    }else{
        for(var i = 0; i< positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }

};


function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "dislay: block";
        wins++;
        hasFinished = true;
        alert("You got away from " + guessingWord + "!")
    }
};


function checkLoss() {
    if(remainingGuesses <= 0 ) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        hasFinished = true;
        alert("OH NO " + guessingWord + " caught you!")
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
        }
    }
    
};