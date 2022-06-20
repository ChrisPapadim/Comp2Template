

//make deck of 52 cards
//create the suites
var SUITS = ["♠", "♣", "♥", "♦"];
//create the card numbers
var VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

//create deck class and export it to main.js
export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  };

//make card shortcut
  get numberOfCards() {
    return this.cards.length;
  }

//Give top card from deck
  pop() {
    return this.cards.shift();
  }

//Put card on buttom of deck
  push(card) {
    this.cards.push(card);
  }

//shuffle the deck
  shuffle() {
//start from the last card
    for (let i = this.numberOfCards - 1; i > 0; i--) {
//randomize location of each new card
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    };
  };
};

//create deck and add the cards to constructor
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  };

//assign color to each suite
  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  };

//connect with HTML
  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`;
    return cardDiv;
  };
};

//"multiply" each suite by each value to get 52 cards
function newDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value);
    });
  });
};
