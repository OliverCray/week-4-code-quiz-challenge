var scoresheet = document.querySelector("#scoresheet")
var clearScore = document.querySelector("#clear")

// Adds each Name and corresponding score to the High Scores page form local storage
for (var i = 0; i < localStorage.length; i++) {
    // Grab player's name and their score out of local storage
    var playerName = localStorage.key(i)
    var score = localStorage.getItem(playerName)

    // Creates high scores entries in html and appends them
    var result = document.createElement("div")
    result.classList.add('result')

    result.innerHTML = `<div class="highScore">${playerName}</div>
                        <div class="highScore">${score}</div>` 

    scoresheet.appendChild(result)
}

// Clears local storage and reloads the page
function clearHighScores() {
    localStorage.clear()
    location.reload()
}

clearScore.addEventListener("click", clearHighScores)