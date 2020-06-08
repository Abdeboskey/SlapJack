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
window.addEventListener("keydown", whichKey);
// window.addEventListener("click", clickWhat);

// function clickWhat(event) {
//   var startGameBtn = document.querySelector(".start-game");
//   // var playAgainBtn = document.querySelector();
//   if (event.target === startGameBtn) {
//
//   }
// }

function whichKey(event) {
  gameplayMessage.innerText = "";
  if (event.keyCode === 81) {player1Play()};
  if (event.keyCode === 80) {player2Play()};
  if (event.keyCode === 70) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player1);
    // can message persist for a set amount of time?
  }
  if (event.keyCode === 74) {
    gameplayMessage.innerText = currentGame.slapCard(currentGame.player2);
  }
}

function gameOver() {
  // Winner message persists and keys stop working
  // Player Wins are updated and saved to storage
  // Button appears to start new game and reset page
}

function getFromStorage() {
  
}

function player1Play() {
  gameplayMessage.innerText = currentGame.player1.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("middle-deck");
  addP1Shadow();
  if (currentGame.middleDeck.length === 0) {toggleElement("middle-deck")};
}

function player2Play() {
  gameplayMessage.innerText = currentGame.player2.playCard();
  cardPlayed.src = `assets/${currentGame.middleDeck[currentGame.middleDeck.length -1]}.png`;
  showElement("middle-deck");
  addP2Shadow();
  if (currentGame.middleDeck.length === 0) {toggleElement("middle-deck")};
}

function addP1Shadow() {
  document.getElementById("play-card").classList.add("player-1-shadow");
  document.getElementById("play-card").classList.remove("player-2-shadow");
}

function addP2Shadow() {
  document.getElementById("play-card").classList.add("player-2-shadow");
  document.getElementById("play-card").classList.remove("player-1-shadow");
}

function toggleElement(className) {
  document.querySelector(`.${className}`).classList.toggle("hidden");
}

function showElement(className) {
  document.querySelector(`.${className}`).classList.remove("hidden");
}
