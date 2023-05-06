// Grab id of Start Quiz button and assign to a variable
var startQuiz = document.querySelector("#startQuiz")
var replayQuiz = document.querySelector("#replay")
var viewHighScores = document.querySelector("#viewHighScores")
var saveScore = document.querySelector("#save")

// Grab ids of each section and assign to respective variables
var welcome = document.querySelector("#welcome")
var quiz = document.querySelector("#quiz")
var results = document.querySelector("#results")

var options = document.querySelector("#options")
var response = document.querySelector("#response")

var timer = document.querySelector("#timer")

var summary = document.querySelector("#summary")

// Initial values
var timeRemaining = 0
var currentScore = 0
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

    // Stops scores being negative 
    
    if (currentScore < 0) {
        currentScore = 0
    }

    localStorage.setItem("playerScore", currentScore)

    // Display score
    summary.textContent = "Score: " + currentScore
}

function displayQuestion() {
    console.log("Question number: " + questionNum)

    // Stops the quiz once all questions have been answered
    if (questionNum >= questions.length) {
        stopQuiz()
        return
    }

    // Selects correct question title for the value of questionNum, e.g. questionNum = 0 will select question 1
    var question = questions[questionNum]
    document.querySelector("#questions").textContent = question.title

    options.innerHTML = ""

    // Generates appropriate choices for each question
    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement("div")
        choice.textContent = question.choices[i]
        choice.onclick = onSelectAnswer
        choice.classList.add("choice")

        options.appendChild(choice)
    }
}

function onSelectAnswer(e) {
    // Search questions for the correct answer
    var correctAnswer = questions[questionNum].answer
    console.log(e.target)
    // Detects the answer clicked by the player
    var playerAnswer = e.target.textContent

    // Compare the player's answer with the correct answer
    if (playerAnswer === correctAnswer) {
        currentScore+= 20
        localStorage.setItem("playerScore", currentScore)
        // Increment question number after an answer is clicked
        questionNum++

        displayResponse("Correct!")
    } else {
        currentScore-= 9
        localStorage.setItem("playerScore", currentScore)
        timeRemaining-= 20
        questionNum++

        displayResponse("Wrong!")
    }

    displayQuestion()
}

function displayResponse(rsp) {
    // Display response
    response.textContent = rsp

    // Set response to disappear after 1 second
    setTimeout(function () {
        response.textContent = ""
    }, 1000)

}

function onQuizStart() {
    // Set timer to 75 seconds
    timeRemaining = 75

    // Start at first question
    questionNum = 0

    // Reset score
    currentScore = 0

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

function onSaveScore(e) {
    var playerName = document.querySelector("#playerName").value
    var playerScore = localStorage.getItem("playerScore")

    var highScores = JSON.parse(localStorage.getItem("highScores")) || []

    if (playerName !== "") {
        // Set name and score into local storage if the text box is filled
        var score = {
            score: playerScore,
            name: playerName
        } 

        highScores.push(score)
        highScores.sort((a,b) => b.score - a.score)

        localStorage.setItem('highScores', JSON.stringify(highScores));

        // Empty the text box
        document.querySelector("#playerName").value = ""
    }
}

// Opens high scores page in current tab
function showHighScores() {
    open("highscores.html", "_self")
}

// Executes a function when corresponding button is clicked
startQuiz.addEventListener("click", onQuizStart)
replayQuiz.addEventListener("click", onQuizStart)
viewHighScores.addEventListener("click", showHighScores)
saveScore.addEventListener("click", onSaveScore)

