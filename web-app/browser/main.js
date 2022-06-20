//import R from "../common/ramda.js";
//import Json_rpc from "../browser/Json_rpc.js";
import Deck from "./deck.js";

//assign numeric values to each card
var CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

//Give each player 26 cards
let playerdeck = 26;
var computerCardSlot = document.querySelector(".computer-card-slot");
var playerCardSlot = document.querySelector(".player-card-slot");
var computerDeckElement = document.querySelector(".computer-deck");
var playerDeckElement = document.querySelector(".player-deck");
var text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

//Start round
document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  };

  if (inRound) {
    resetRound()
  } else {
    flipCards()
  }
});

//Start game using shuffled deck
startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

//Give each player half the deck
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
//Show number of cards on each player's deck
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

//Reset the board before every round
  resetRound();
};

//Get back to original board when reseting with updated card numbers for each deck
function resetRound() {
//When round resets close cards
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

//After every reset update the number of cards on deck on each player's deck
  updateDeckCount();
};

//When round satrts open cards
function flipCards() {
  inRound = true;

//Give each player a card to play
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount();

//Show the winner of each round
//When player wins
  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Player Wins";
//Add card on player's deck
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
//When computer wins
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Computer Wins";
//Add card on computer's deck
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
//When draw
  } else {
    text.innerText = "Draw";
//Each player keeps their card
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }
//Show final winner
//When player wins
  if (isGameOver(playerDeck)) {
    text.innerText = "Player Won!!"
    stop = true
//When computer wins
  } else if (isGameOver(computerDeck)) {
    text.innerText = "Computer won!!"
    stop = true;
  };
};

//Update number of cards on each player's deck
function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
};

//Determine who wins
//Card with greatest numerical value wins
function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
};

//Finish game when someone has 0 cards
function isGameOver(deck) {
  return deck.numberOfCards === 0;
};
