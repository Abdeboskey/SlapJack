class Player {
  constructor(playerNum) {
    this.id = playerNum;
    this.wins = 0;
    this.myTurn = true;
    this.hand = [];
  }

  playCard() {
    game.middleDeck.push(this.hand.pop());
    console.log(game.middleDeck[game.middleDeck.length -1]);
  }

  saveWinsToStorage() {
    var wins = JSON.stringify(this.wins);
    localStorage.setItem("Games Won", wins);
  }
}
