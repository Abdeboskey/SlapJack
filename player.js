class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.hand = [];
  }

  playCard() {
    this.checkHands();
    if (currentGame.currentTurn === this.id) {
      currentGame.middleDeck.push(this.hand.pop());
      this.takeTurns();
      return "";
    } else {
      return `It is player ${currentGame.currentTurn}'s turn`;
    }
  }

  checkHands() {
    if ((currentGame.player1.hand.length === 0 && currentGame.player2.hand.length === 0) && (currentGame.currentTurn === 2)) {
      currentGame.takeThePile(currentGame.player1);
      currentGame.currentTurn = 1;
    } else if ((currentGame.player1.hand.length === 0 && currentGame.player2.hand.length === 0) && (currentGame.currentTurn === 1)) {
      currentGame.takeThePile(currentGame.player2);
      currentGame.currentTurn = 2;
    } else if ((this.id === 1 && this.hand.length) && (currentGame.player2.hand.length === 0)) {
      currentGame.currentTurn = 1;
    } else if ((this.id === 2 && this.hand.length) && (currentGame.player1.hand.length === 0)) {
      currentGame.currentTurn = 2;
    } else if (this.hand.length === 0) {
      this.takeTurns();
    }
  }

  takeTurns() {
    if (this.id === 1) {
      currentGame.currentTurn = 2;
    } else if (this.id === 2) {
      currentGame.currentTurn = 1;
    }
  }

  saveWinsToStorage(playerNum) {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem(`${playerNum}Wins`, wins);
  }
}
