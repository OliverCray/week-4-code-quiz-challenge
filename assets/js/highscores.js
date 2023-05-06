var scoresheet = document.querySelector("#scoresheet")
var clearScore = document.querySelector("#clear")

var highScores = JSON.parse(localStorage.getItem("highScores")) || []

console.log(highScores)

var result = document.createElement("div")
result.classList.add('result')

result.innerHTML = highScores.map(score => {
    return `<div class="highScore">${score.name}</div>
            <div class="highScore">${score.score}</div>`
  })
  .join('')
  
scoresheet.appendChild(result)

// Clears local storage and reloads the page
function clearHighScores() {
    localStorage.clear()
    location.reload()
}

clearScore.addEventListener("click", clearHighScores)