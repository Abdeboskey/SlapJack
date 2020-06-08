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
    if (this.suddenDeath()) {
      return this.endGameplay(playerNum);
    } else if (playerNum.hand.length > 0) {
      return this.regularGameplay(playerNum);
    }
  }

  regularGameplay(playerNum) {
    if (this.middleDeck.length === 0) {
      return this.slapNone();
    } else if (this.middleDeck.length === 1) {
      return this.slapOne(playerNum);
    } else if (this.middleDeck.length === 2) {
      return this.slapTwo(playerNum);
    } else if (this.middleDeck.length > 2) {
      return this.slapThree(playerNum);
    }
  }

  slapNone() {
    return `There's nothin' to slap! It is player ${currentGame.currentTurn}'s turn to play a card.`
  }

  slapOne(playerNum) {
    var topCard = this.middleDeck[this.middleDeck.length -1].slice(-2);
    if (topCard === "ck") {
      return this.slapJack(playerNum);
    } else {
      return this.invalidSlap(playerNum);
    }
  }

  slapTwo(playerNum) {
    var topCard = this.middleDeck[this.middleDeck.length -1].slice(-2);
    var doubles = this.middleDeck[this.middleDeck.length -2].slice(-2);
    if (topCard === "ck") {
      return this.slapJack(playerNum);
    } else if (topCard === doubles) {
      return this.doubles(playerNum);
    } else {
      return this.invalidSlap(playerNum);
    }
  }

  slapThree(playerNum) {
    var topCard = this.middleDeck[this.middleDeck.length -1].slice(-2);
    var doubles = this.middleDeck[this.middleDeck.length -2].slice(-2);
    var sandwich = this.middleDeck[this.middleDeck.length -3].slice(-2);
    if (topCard === "ck") {
      return this.slapJack(playerNum);
    } else if (topCard === doubles) {
      return this.doubles(playerNum);
    } else if (topCard === sandwich) {
      return this.sandwich(playerNum);
    } else {
      return this.invalidSlap(playerNum);
    }
  }

  slapJack(playerNum) {
    this.takeThePile(playerNum);
    return `SLAPJACK! Player ${playerNum.id} takes the pile!`;
  }

  doubles(playerNum) {
    this.takeThePile(playerNum);
    return `DOUBLES! Player ${playerNum.id} takes the pile!`;
  }

  sandwich(playerNum) {
    this.takeThePile(playerNum);
    return `SANDWICH! Player ${playerNum.id} takes the pile!`;
  }

  invalidSlap(playerNum) {
    if (playerNum.id === 1) {
      this.player2.hand.unshift(this.player1.hand.pop());
      return `BAD SLAP! Player 1 forfeits a card to Player 2!`;
    } else if (playerNum.id === 2) {
      this.player1.hand.unshift(this.player2.hand.pop());
      return `BAD SLAP! Player 2 forfeits a card to Player 1!`;
    }
  }

  takeThePile(playerNum) {
    playerNum.hand.push(...this.middleDeck);
    this.middleDeck = [];
    this.shuffle(playerNum.hand);
  }

  suddenDeath() {
    if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {return true};
  }

  endGameplay(playerNum) {
    if (this.middleDeck.length === 0) {
      return this.slapNone();
    } else {
      return this.slapSuddenDeath(playerNum);
    }
  }

  slapSuddenDeath(playerNum) {
    var topCard = this.middleDeck[this.middleDeck.length -1].slice(-2);
    if (playerNum.hand.length === 0 && topCard === "ck") {
      return this.closeCall(playerNum);
    } else if (playerNum.hand.length === 0 && topCard !== "ck") {
      return this.youLose(playerNum);
    } else if (playerNum.hand.length > 0 && topCard === "ck") {
      return this.youWin(playerNum);
    } else if (playerNum.hand.length > 0 && topCard !== "ck") {
      return this.invalidSlap(playerNum);
    }
  }

  closeCall(playerNum) {
    this.takeThePile(playerNum);
    return `SLAPJACK! Player ${playerNum.id} takes the pile! You're back in the game!`;
  }

  youLose(playerNum) {
    if (playerNum.id === 1) {
      this.player2.wins++;
      this.player2.saveWinsToStorage(`player2`);
      return "BAD SLAP Player 1! Player 2 wins the game!";
    } else if (playerNum.id === 2) {
      this.player1.wins++;
      this.player1.saveWinsToStorage(`player1`);
      return "BAD SLAP Player 2! Player 1 wins the game!";
    }
  }

  youWin(playerNum) {
    playerNum.wins++;
    playerNum.saveWinsToStorage(`player${playerNum.id}`);
    return `Player ${playerNum.id} wins the game!`;
  }
}
