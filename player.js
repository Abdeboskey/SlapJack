class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    currentGame.middleDeck.push(this.hand.pop());
    console.log(currentGame.middleDeck[currentGame.middleDeck.length -1]);
    if (this.id === 1) {
      currentGame.currentTurn = 2;
    } else if (this.id ===2) {
      currentGame.currentTurn = 1;
    }
  }

  saveWinsToStorage() {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem("Games Won", wins);
  }
}
