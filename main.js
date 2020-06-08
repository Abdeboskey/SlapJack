var player1Wins = document.querySelector(".player-1-wins");
var player2Wins = document.querySelector(".player-2-wins");
var gameplayMessage = document.querySelector(".gameplay-message");
var cardPlayed = document.getElementById("play-card");
var currentGame = new Game;

window.onload = getFromStorage();
window.onload = currentGame.deal();
window.addEventListener("keydown", whichKey);

function whichKey(event) {
  if (event.keyCode === 81) {
    player1Play();
    whosTurn(1);
  } else if (event.keyCode === 80) {
    player2Play();
    whosTurn(2);
  } else if (event.keyCode === 70) {
    gameplayMessage.innerText = "";
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player1);
    isItOver();
  } else if (event.keyCode === 74) {
    gameplayMessage.innerText = "";
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player2);
    isItOver();
  }
}

function whosTurn(pNum) {
  if (currentGame.player1.hand.length === 0 && currentGame.player2.hand.length === 0) {
    gameplayMessage.innerText = `Player ${pNum}, you ran out of cards.\nTake the pile Player ${pNum}, it is your turn again`;
  } else if (currentGame.player1.hand.length === 0) {
    gameplayMessage.innerText = "Player 1, you are out of cards. Only a Jack will save you now!\nPlayer 2, it is your turn";
  } else if (currentGame.player2.hand.length === 0) {
    gameplayMessage.innerText = "Player 2, you are out of cards. Only a Jack will save you now!\nPlayer 1, it is your turn";
  }
}

function player1Play() {
  gameplayMessage.innerText = "";
  if (currentGame.player1.hand.length > 0) {addP1Shadow()};
  gameplayMessage.innerText = currentGame.player1.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("play-card");
  checkDeck();
}

function player2Play() {
  gameplayMessage.innerText = "";
  if (currentGame.player2.hand.length > 0) {addP2Shadow()};
  gameplayMessage.innerText = currentGame.player2.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("play-card");
  checkDeck();
}
// Can both the above and below functions be refactored? I think they can.....
// Perhaps just bind that cardPlayed line to a variable.
function addP1Shadow() {
  document.getElementById("play-card").classList.add("player-1-shadow");
  document.getElementById("play-card").classList.remove("player-2-shadow");
}

function addP2Shadow() {
  document.getElementById("play-card").classList.add("player-2-shadow");
  document.getElementById("play-card").classList.remove("player-1-shadow");
}

function showElement(idName) {
  document.getElementById(`${idName}`).classList.remove("hidden");
}

function takeASecond() {
  window.removeEventListener("keydown", whichKey);
  var resume = 0;
  var pause = setInterval(function () {
    resume++;
    if (resume > 1) {
      clearInterval(pause);
      afterSlap();
    }
  }, 1000);
}

function afterSlap() {
  window.addEventListener("keydown", whichKey);
  checkDeck();
  if (!gameplayMessage.innerText.includes("wins the game")) {
    gameplayMessage.innerText += `\nPlayer ${currentGame.currentTurn}, it is your turn`;
  }
}

function checkDeck() {
  if (currentGame.middleDeck.length === 0) {
    hideElement("play-card");
  }
}

function hideElement(idName) {
  document.getElementById(`${idName}`).classList.add("hidden");
}

function isItOver() {
  if (gameplayMessage.innerText.includes("wins the game")) {
    gameOver();
  } else {
    takeASecond();
  }
}

function gameOver() {
  window.removeEventListener("keydown", whichKey);
  gameOverFanciness();
  updateWins();
}

function gameOverFanciness() {
  var reset = 0;
  var fancyColors = setInterval(function () {
    reset++
    document.querySelector(".body").classList.add("celebrate");
    if (reset > 10) {
      clearInterval(fancyColors);
      window.addEventListener("keydown", whichKey);
      document.querySelector(".body").classList.remove("celebrate");
      resetGame();
    }
  }, 1000);
}

function updateWins() {
  player1Wins.innerText = `${currentGame.player1.wins} Wins`;
  player2Wins.innerText = `${currentGame.player2.wins} Wins`;
}

function resetGame() {
  currentGame.player1.hand = [];
  currentGame.player2.hand = [];
  currentGame.middleDeck = [];
  currentGame.deal();
  currentGame.currentTurn = 1;
  gameplayMessage.innerText = "Player 1, press 'p' to start a new game!";
}

function getFromStorage() {
  getPlayer1Wins();
  getPlayer2Wins();
  updateWins();
}

function getPlayer1Wins() {
  if (localStorage.getItem("player1Wins") === null) {
    currentGame.player1.wins = 0;
  } else {
    var wins = localStorage.getItem("player1Wins");
    var winningStreak = JSON.parse(wins);
    currentGame.player1.wins = winningStreak;
  }
}

function getPlayer2Wins() {
  if (localStorage.getItem("player2Wins") === null) {
    currentGame.player2.wins = 0;
  } else {
    var wins = localStorage.getItem("player2Wins");
    var winningStreak = JSON.parse(wins);
    currentGame.player2.wins = winningStreak;
  }
}
// Can you refactor these two above?
