class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    if (currentGame.currentTurn === this.id) {
      currentGame.middleDeck.push(this.hand.pop());
      console.log(currentGame.middleDeck[currentGame.middleDeck.length -1]);
      this.takeTurns();
    } else {
      console.log(`It is player ${currentGame.currentTurn}'s turn`)
    }
  }

  takeTurns() {
    if (this.id === 1) {
      currentGame.currentTurn = 2;
    } else if (this.id === 2) {
      currentGame.currentTurn = 1;
    }
  }

  saveWinsToStorage() {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem("Games Won", wins);
  }
}
