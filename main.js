var gameplayMessage = document.querySelector(".gameplay-message");
var player1Wins = document.querySelector(".player-1-wins")
var player2Wins = document.querySelector(".player-2-wins")
// var middleDeck = document.querySelector(".middleDeck");
var cardPlayed = document.getElementById("play-card");

var currentGame = new Game;

// window.onload(getFromStorage)
window.onload = currentGame.deal();
window.addEventListener("keydown", whichKey);

function whichKey(event) {
  gameplayMessage.innerText = "";
  if (event.keyCode === 81) {
    player1Play();
    if (currentGame.player1.hand.length === 0) {gameplayMessage.innerText = "Player 1, you are out of cards.\nPlayer 2, it is your turn"};
  } else if (event.keyCode === 80) {
    player2Play();
    if (currentGame.player2.hand.length === 0) {gameplayMessage.innerText = "Player 2, you are out of cards.\nPlayer 1, it is your turn"};
  } else if (event.keyCode === 70) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player1);
    takeASecond();
  } else if (event.keyCode === 74) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player2);
    takeASecond();
  }
  isItOver();
}

function takeASecond() {
  window.removeEventListener("keydown", whichKey);
  var resume = 0;
  var pause = setInterval(function () {
    resume++;
    if (resume > 1) {
      clearInterval(pause);
      window.addEventListener("keydown", whichKey);
      gameplayMessage.innerText += `\nPlayer ${currentGame.currentTurn}, it is your turn`;
    }
  }, 1000);
  checkDeck();
}

function checkDeck() {
  if (currentGame.middleDeck.length === 0) {
    hideElement("play-card");
  }
}

function isItOver() {
  if (gameplayMessage.innerText.includes("wins the game")) {
    gameOver();
  }
}

function gameOver() {
  console.log("GAME OVER");
  // Winner message persists and keys stop working
  // Player Wins are updated and saved to storage
  // Button appears to start new game and reset page
}

function resetGame() {
  currentGame.player1.hand = [];
  currentGame.player2.hand = [];
  currentGame.middleDeck = [];
  currentGame.deal();
  gameplayMessage.innerText = "Player 1, press 'p' to start a new game!";
}

function getFromStorage() {

}

function player1Play() {
  gameplayMessage.innerText = currentGame.player1.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("play-card");
  addP1Shadow();
  if (currentGame.middleDeck.length === 0) {toggleElement("play-card")};
}

function player2Play() {
  gameplayMessage.innerText = currentGame.player2.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("play-card");
  addP2Shadow();
  if (currentGame.middleDeck.length === 0) {toggleElement("play-card")};
}

function addP1Shadow() {
  document.getElementById("play-card").classList.add("player-1-shadow");
  document.getElementById("play-card").classList.remove("player-2-shadow");
}

function addP2Shadow() {
  document.getElementById("play-card").classList.add("player-2-shadow");
  document.getElementById("play-card").classList.remove("player-1-shadow");
}

function toggleElement(idName) {
  document.getElementById(`${idName}`).classList.toggle("hidden");
}

function showElement(idName) {
  document.getElementById(`${idName}`).classList.remove("hidden");
}

function hideElement(idName) {
  document.getElementById(`${idName}`).classList.add("hidden");
}
