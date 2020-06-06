class Game {
  constructor() {
    this.player1 = new Player(1);
    this.player2 = new Player(2);
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
    while (shuffled.length < deck.length) {
      var pickACard = Math.floor(Math.random() * deck.length);
      var card = deck[pickACard];
      if (!shuffled.includes(card)) {
          shuffled.push(card);
      }
    }
    deck = shuffled;
    // console.log(deck);
    this.allCards = shuffled;
    // console.log(this.allCards);
  }

  deal() {
    this.shuffle(this.allCards);
    this.player1.hand = this.allCards.slice(0, 26);
    this.player2.hand = this.allCards.slice(26, 52);
  }
}
