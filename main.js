var gameplayMessage = document.querySelector(".gameplay-message");
var player1Deck = document.querySelector(".player-1-deck");
var player2Deck = document.querySelector(".player-2-deck");
var player1Wins = document.querySelector(".player-1-wins")
var player2Wins = document.querySelector(".player-2-wins")
var middleDeck = document.querySelector(".middleDeck");
var cardPlayed = document.getElementById("play-card");

var currentGame = new Game;

// window.onload(getFromStorage)
window.onload = currentGame.deal();
window.addEventListener("click", clickWhat);
window.addEventListener("keydown", whichKey);

function clickWhat(event) {
  var startGameBtn = document.querySelector(".start-game");
  // var playAgainBtn = document.querySelector();
  if (event.target === startGameBtn) {

  }
}

function whichKey(event) {
  if (event.keyCode === 81) {player1Play()};
  if (event.keyCode === 80) {player2Play()};
  if (event.keyCode === 70) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player1);
  }
  if (event.keyCode === 74) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player2);
  }
}

function player1Play() {
  gameplayMessage.innerText = currentGame.player1.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("middle-deck");
  addP1Shadow();
}

function player2Play() {
  gameplayMessage.innerText = currentGame.player2.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("middle-deck");
  addP2Shadow();
}

function addP1Shadow() {
  document.getElementById("play-card").classList.add("player-1-shadow");
  document.getElementById("play-card").classList.remove("player-2-shadow");
}

function addP2Shadow() {
  document.querySelector(".middle-deck").classList.add("player-2-shadow");
  document.querySelector(".middle-deck").classList.remove("player-1-shadow");
}

function toggleElement(className) {
  document.querySelector(`.${className}`).classList.toggle("hidden");
}

function showElement(className) {
  document.querySelector(`.${className}`).classList.remove("hidden");
}
