var scoresheet = document.querySelector("#scoresheet")
var clearScore = document.querySelector("#clear")

// Get highscores out of local storage
var highScores = JSON.parse(localStorage.getItem("highScores")) || []

console.log(highScores)

// Create elements for the areas that will hold the name and score
var resultName = document.createElement("div")
resultName.classList.add('resultName')

var resultScore = document.createElement("div")
resultScore.classList.add('resultScore')

// Add html for displaying the name and score
resultName.innerHTML = highScores.map(score => {
    return `<div class="highScore">${score.name}</div>`
  })
  .join('')
  
resultScore.innerHTML = highScores.map(score => {
    return `<div class="highScore">${score.score}</div>`
    })
    .join('')

// Append the name and score information so that it is displayed on the high scores page
scoresheet.appendChild(resultName)
scoresheet.appendChild(resultScore)

// Clears local storage and reloads the page
function clearHighScores() {
    localStorage.clear()
    location.reload()
}

// Clear local storage when the Clear High Scores button is clicked
clearScore.addEventListener("click", clearHighScores)