var scoresheet = document.querySelector("#scoresheet")
var clearScore = document.querySelector("#clear")

var highScores = JSON.parse(localStorage.getItem("highScores")) || []

console.log(highScores)

var resultName = document.createElement("div")
resultName.classList.add('resultName')

resultName.innerHTML = highScores.map(score => {
    return `<div class="highScore">${score.name}</div>`
  })
  .join('')
  
var resultScore = document.createElement("div")
resultScore.classList.add('resultScore')
  
resultScore.innerHTML = highScores.map(score => {
    return `<div class="highScore">${score.score}</div>`
    })
    .join('')
    
scoresheet.appendChild(resultName)
scoresheet.appendChild(resultScore)

// Clears local storage and reloads the page
function clearHighScores() {
    localStorage.clear()
    location.reload()
}

clearScore.addEventListener("click", clearHighScores)