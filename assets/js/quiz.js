// Grab id of Start Quiz button and assign to a variable
var startQuiz = document.querySelector("#startQuiz")

// Grab ids of each section and assign to respective variables
var welcome = document.querySelector("#welcome")
var quiz = document.querySelector("#quiz")
var results = document.querySelector("#results")

var options = document.querySelector("#options")
var response = document.querySelector("#response")

var timer = document.querySelector("#timer")

var summary = document.querySelector("#summary")

var timeRemaining = 0
var score = 0
var questionNum = 0
var countdown

function stopQuiz() {
    // Stop the timer
    clearInterval(countdown)

    // Clear timer text content
    timer.textContent = ""

    // Hide quiz page and show results page
    quiz.style.display = 'none'
    results.style.display = 'flex'

    // Display score
    summary.textContent = "Score: " + score
}

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


    // Hide other pages and only show quiz page
    welcome.style.display = 'none'
    quiz.style.display = 'flex'
    results.style.display = 'none'

    displayQuestion()
}

function displayQuestion() {
    questionNum++

    console.log("Question number: " + questionNum)

    if (questionNum >= questions.length) {
        stopQuiz
        return
    }

    var question = questions[questionNum]
    document.querySelector("#question").textContent = question.title

    options.innerHTML = ""

    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement("div")
        choice.textContent = question.choices[i]
        choice.onclick = onSelectAnswer
        choice.classlist.add("choice")

        options.appendChild(choice)
    }
}

function onSelectAnswer(e) {
    var correctAnswer = questions[questionNum].answer
    console.log(e.target)
    var playerAnswer = e.target.textContent

    if (playerAnswer === correctAnswer) {
        score++

        displayResponse("Correct!")
    } else {
        score--

        displayResponse("Wrong!")
    }

    displayQuestion()
}

function displayResponse(rsp) {
    // Display response
    response.textContent = rsp

    setTimeout(function () {
        response.textContent = ""
    }, 1000)

}

startQuiz.addEventListener("click", onQuizStart)