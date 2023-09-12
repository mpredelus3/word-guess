var words = ["variable", "array", "modulus", "object", "function", "string", "boolean"];

var wordBlank = document.querySelector('.word-blanks')
var letterInWord = []
var blanks = []
var winEl = document.querySelector('.win')
var loseEl = document.querySelector('.lose')
var timerEl = document.querySelector('.timer-count')
var startBtn = document.querySelector('.start-button')

var winCount = 0
var loseCount = 0

var timerCount;
var timerInterval; //declaration without an assignment. only ok to do that with let and var

var userWin = false

var chosenWord = ''
var blankNums = 0

function displayBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)]
    console.log(chosenWord)
    letterInWord = chosenWord.split('')
    blankNums = letterInWord.length
    blanks = []
    for (var i = 0; i < blankNums; i++) {
        blanks.push('_')
    }
    console.log(blanks)
    wordBlank.textContent = blanks.join(' ')
}

function startGame() {
    startBtn.disabled = true
    userWin = false
    timerCount = 10
    timer()
    displayBlanks()
}
function timer() {
    timerEl.textContent = timerCount
    timerInterval = setInterval(function () {
        timerCount--
        timerEl.textContent = timerCount
        if (timerCount >= 0) {
            if (userWin && timerCount > 0) {
                clearInterval(timerInterval)
                //Win Game
                winGame()
            }
        }
        if (timerCount === 0) {
            clearInterval(timerInterval)
            //Lose Game
            loseGame()
        }
    }, 1000)


}
onLoad()

function onLoad() {
    var storedWins = localStorage.getItem('winCount')
    if (storedWins === null) {
        winEl.textContent = 0
    }
    else {
        winEl.textContent = storedWins

    }

    var storedlosses = localStorage.getItem('loseCount')
    if (storedlosses === null) {
        loseEl.textContent = 0
    }
    else { loseEl.textContent = storedlosses }

}
function loseGame() {
    startBtn.disabled =false
    wordBlank.textContent = 'You Lose!'
    loseCount++
    setLoses()
}
function setLoses() {
    loseEl.textContent = loseCount
    localStorage.setItem('loseCount', loseCount)
}
function winGame() {
    startBtn.disabled = false
    wordBlank.textContent = 'You Won!'
    winCount++
    setWins()
}
function setWins() {
    winEl.textContent = winCount
    localStorage.setItem('winCount', winCount)
}
function checkLetters(letter) {
    var letterInWord = false
    for (var i = 0; i < blankNums; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true
        }
    }
    if (letterInWord) {
        for (var j = 0; j < blankNums; j++) {
            if (chosenWord[j] === letter) {
                blanks[j] = letter
            }
        }
        wordBlank.textContent = blanks.join(' ')
    }
}
function checkWin() {
    if (chosenWord === blanks.join('')) {
        userWin = true
    }

}
document.addEventListener('keydown', function (event) {
    if (timerCount === 0)
        return
    var key = event.key.toLowerCase()
    var alphabetChars = 'abcdefghijklmnopqrstuvwxyz'.split('')
    if (alphabetChars.includes(key)) {
        checkLetters(key)
        checkWin()
    }
})
startBtn.addEventListener('click', startGame)
document.querySelector( '.reset-button').addEventListener('click',function() {
    winCount = 0
    loseCount = 0
    setWins()
    setLoses()
}) 