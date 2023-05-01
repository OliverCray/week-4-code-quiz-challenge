// Grab id of Start Quiz button and assign to a variable
var startQuiz = document.querySelector("#startQuiz")

// Grab ids of each section and assign to respective variables
var welcome = document.querySelector("#welcome")
var quiz = document.querySelector("#quiz")
var results = document.querySelector("#results")

var choices = document.querySelector("#choices")
var response = document.querySelector("#response")

var timer = document.querySelector("#timer")

var summary = document.querySelector("#summary")

var timeRemaining = 0
var score = 0
var questionNum = 0
var countdown

function onQuizStart() {
    // Set timer to 75 seconds
    timeRemaining = 75

    // Start at first question
    questionNum = 0

    // Reset score
    score = 0

    // Start Timer
    countdown = setInterval(function () {
        if (timeRemaining > 0) {
            timer.textContent = timeRemaining + " seconds remaining"
        } else {
            stopQuiz()
        }
        timeRemaining--
    }, 1000)

    welcome.style.display = 'none'
    quiz.style.dispaly = 'flex'
    results.style.display = 'none'

    displayQuestion()
}

startQuiz.addEventListener("click", onQuizStart)