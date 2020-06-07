class Game {
  constructor() {
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    this.currentTurn = 1;
    this.middleDeck = [];
    this.allCards = [
      "blue-01", "blue-02", "blue-03", "blue-04", "blue-05", "blue-06", "blue-07", "blue-08", "blue-09", "blue-10", "blue-jack", "blue-queen", "blue-king",
      "gold-01", "gold-02", "gold-03", "gold-04", "gold-05", "gold-06", "gold-07", "gold-08", "gold-09", "gold-10", "gold-jack", "gold-queen", "gold-king",
      "green-01", "green-02", "green-03", "green-04", "green-05", "green-06", "green-07", "green-08", "green-09", "green-10", "green-jack", "green-queen", "green-king",
      "red-01", "red-02", "red-03", "red-04", "red-05", "red-06", "red-07", "red-08", "red-09", "red-10", "red-jack", "red-queen", "red-king"
    ];
  }

  shuffle(deck) {
    var shuffled = [];
    var pickACard;
    var card;
    while (shuffled.length < deck.length) {
      pickACard = Math.floor(Math.random() * deck.length);
      card = deck[pickACard];
      if (!shuffled.includes(card)) {
          shuffled.push(card);
      }
    }
    deck.splice(0, deck.length, ...shuffled);
  }

  deal() {
    this.shuffle(this.allCards);
    this.shuffle(this.allCards);
    this.shuffle(this.allCards);
    this.player1.hand = this.allCards.slice(0, 26);
    this.player2.hand = this.allCards.slice(26, 52);
  }

  slapCard(playerNum) {
    var topCard = this.middleDeck[this.middleDeck.length -1].slice(-2);
    var doubles = this.middleDeck[this.middleDeck.length -2].slice(-2);
    var sandwich = this.middleDeck[this.middleDeck.length -3].slice(-2);
    if (suddenDeath(playerNum) && topCard === "ck") {
      this.takeThePile(playerNum);
      console.log(`SLAPJACK! Player ${playerNum.id} takes the pile! You're back in the game!`);
    } else if (suddenDeath(playerNum) && topCard !== "ck") {
      playerNum.wins ++;
      console.log(`Player ${playerNum} wins the game!`);
    } else if (topCard === "ck") {
      this.slapJack(playerNum);
    } else if (topCard === doubles) {
      this.takeThePile(playerNum);
      console.log(`DOUBLES! Player ${playerNum.id} takes the pile!`);
    } else if (topCard === sandwich) {
      this.takeThePile(playerNum);
      console.log(`SANDWICH! Player ${playerNum.id} takes the pile!`);
    } else {
      this.invalidSlap(playerNum);
        if (playerNum.id === 1) {
        console.log(`BAD SLAP! Player 1 forfeits a card to Player 2!`)
      } else if (playerNum.id === 2) {
        console.log(`BAD SLAP! Player 2 forfeits a card to Player 1!`)
      }
    }
  }

  closeCall(playerNum) {
    this.takeThePile(playerNum);
    console.log(`SLAPJACK! Player ${playerNum.id} takes the pile! You're back in the game!`);
  }

  slapJack(playerNum) {
    this.takeThePile(playerNum);
    console.log(`SLAPJACK! Player ${playerNum.id} takes the pile!`);
  }

  suddenDeath(playerNum) {
    if (this.playerNum.hand === []) {return true};
  }

  invalidSlap(playerNum) {
    if (playerNum.id === 1) {this.player2.hand.unshift(this.player1.hand.pop())};
    if (playerNum.id === 2) {this.player1.hand.unshift(this.player2.hand.pop())};
  }

  takeThePile(playerNum) {
    playerNum.hand.push(...this.middleDeck);
    this.middleDeck = [];
    this.shuffle(playerNum.hand);
  }
}
