export {};

import { createCardHTML } from '../ts/cardTemplate';

const boardSize = localStorage.getItem("boardSize");
const theme = localStorage.getItem("theme");

const exitBtn = document.querySelector(".exit-btn");
const popupOverlay = document.querySelector(".popup-overlay");
const backToGameBtn = document.querySelector(".btnn");
const exitGameBtn = document.querySelector(".btn-cold");

let currentPlayer: "player1" | "player2" = "player1";
let scores = { player1: 0, player2: 0 };

document.body.classList.add(theme || "theme1");

exitBtn?.addEventListener("click", () => {
  popupOverlay!.classList.add("active");
});

backToGameBtn?.addEventListener("click", () => {
  popupOverlay!.classList.remove("active");
});

exitGameBtn?.addEventListener("click", () => {
  window.location.href = "/src/pages/settings.html";
});

const themeImages: Record<string, string[]> = {
  theme1: [
    "git.svg",
    "typescript.svg",
    "javascript.svg",
    "html.svg",
    "vscode.svg",
    "css.svg",
    "django.svg",
    "angular.svg",
    "terminal.svg",
    "python.svg",
    "github.svg",
    "nodejs.svg",
    "bootstrap.svg",
    "vue.svg",
    "react.svg",
    "sass.svg",
    "database.svg",
    "firebase.svg",
  ],
  theme2: [
    "bowl.svg",
    "pudding2.svg",
    "sandwich.svg",
    "chickenbox.svg",
    "muffin.svg",
    "corndogs.svg",
    "eis.svg",
    "macron.svg",
    "schokolade.svg",
    "taco.svg",
    "sushi.svg",
    "brezel.svg",
    "pizza.svg",
    "pudding.svg",
    "wrap.svg",
    "dount.svg",
    "burger.svg",
    "pommes.svg",
  ],
};

// Card size 16, 24 and 36
function getCardCount(): number {
  switch (boardSize) {
    case "size1":
      return 16;
    case "size2":
      return 24;
    case "size3":
      return 36;
    default:
      return 16;
  }
}

// Dynamically creates the game board – fetches the correct images based on the selected theme, 
// creates pairs, shuffles them randomly and appends the cards to the DOM.
function renderBoard() {
  const board = document.querySelector(".game-board")!;
  const images = themeImages[theme || "theme1"];
  const count = getCardCount();
  const cardBack = theme === "theme2" ? "/assets/cards/card-back-food.svg": "/assets/cards/card-back.svg";
  const selected = images.slice(0, count / 2);
  const cards = [...selected, ...selected].sort(() => Math.random() - 0.5);

  board.innerHTML = "";
  cards.forEach((img) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardId = img;
    card.innerHTML = createCardHTML(img, cardBack);
    card.addEventListener("click", () => handleCardClick(card));
    board.appendChild(card);
  });
  board.classList.add(`size-${count}`);
}

let flippedCards: HTMLElement[] = [];
let lockBoard = false;

// Executes when a card is clicked. Checks if the board is locked, 
// if the card is already flipped or matched.
// Adds is-flipped and calls checkMatch when 2 cards are flipped.
function handleCardClick(card: HTMLElement) {
  if (lockBoard) return;
  if (card.classList.contains("is-flipped")) return;
  if (card.classList.contains("is-matched")) return;

  card.classList.add("is-flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Updates the score display in the header for both players.
function updateScoreDisplay() {
  const playerone = document.querySelector(".playerone");
  const playertwo = document.querySelector(".playertwo");
  const playeroneFood = document.querySelector(".playerone-food");
  const playtwoFood = document.querySelector(".playertwo-food");

  if (playerone) playerone.textContent = `Blue ${scores.player1}`;
  if (playertwo) playertwo.textContent = `Orange ${scores.player2}`;
  if (playeroneFood) playeroneFood.textContent = `${scores.player1}`;
  if (playtwoFood) playtwoFood.textContent = `${scores.player2}`;
}

// Switches the icon/color in the header depending on whose turn it is.
function updateCurrentPlayerDisplay() {
  const playerIcon = document.querySelector(".playericons") as HTMLImageElement;
  const fulliBg = document.querySelector(".fullto") as HTMLElement;

  if (playerIcon) {
    playerIcon.src = currentPlayer === "player1" ? "/assets/labelB.svg" : "/assets/labelO.svg";
  }

  if (fulliBg) {
    fulliBg.style.backgroundColor = currentPlayer === "player1" ? "#097FC5": "#F58E39";
  }
}

// Toggles currentPlayer between player1 and player2 and calls updateCurrentPlayerDisplay.
function switchPlayer() {
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  updateCurrentPlayerDisplay();
}

// Compares the data-cardId of the two flipped cards. 
// On match, both get is-matched, score increases, checkGameOver is called. 
// On no match, after 1 second both cards flip back and the player switches.
function checkMatch() { lockBoard = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.cardId === card2.dataset.cardId) {card1.classList.add("is-matched"); card2.classList.add("is-matched");
    scores[currentPlayer]++;
    updateScoreDisplay();
    resetFlipped();
    checkGameOver();
  } else {
    setTimeout(() => {
      card1.classList.remove("is-flipped");
      card2.classList.remove("is-flipped");
      switchPlayer();
      resetFlipped();
    }, 1000);
  }
}

// Counts all matched cards. If all are matched → saves scores to localStorage.
function checkGameOver() {
  const matched = document.querySelectorAll(".is-matched").length;
  if (matched === getCardCount()) {
    localStorage.setItem("score_player1", String(scores.player1));
    localStorage.setItem("score_player2", String(scores.player2));
    setTimeout(() => {
      window.location.href = "/src/pages/result.html";
    }, 1000);
  }
}

// Clears the flippedCards array and unlocks the board for the player. 
function resetFlipped() {
  flippedCards = [];
  lockBoard = false;
}

renderBoard();
updateScoreDisplay();
updateCurrentPlayerDisplay();