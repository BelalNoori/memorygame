import { createCardHTML } from "../ts/card-template";

const BOARD_SIZE: string | null = localStorage.getItem("boardSize");
const THEME: string | null = localStorage.getItem("theme");
const NO_MATCH_DELAY: number = 1000;
const RESULT_DELAY: number = 1000;

const THEME_IMAGES: Record<string, string[]> = {
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

let currentPlayer: "player1" | "player2" = "player1";
let scores: Record<string, number> = { player1: 0, player2: 0 };
let flippedCards: HTMLElement[] = [];
let lockBoard: boolean = false;

/**
 * Initializes the game - sets theme, renders board and sets up event listeners
 */
function init(): void {
  document.body.classList.add(THEME || "theme1");
  renderBoard();
  updateScoreDisplay();
  updateCurrentPlayerDisplay();
  initEventListeners();
}

/**
 * Sets up all event listeners for popup and navigation buttons
 */
function initEventListeners(): void {
  const exitBtn: Element | null = document.querySelector(".exit-btn");
  const backToGameBtn: Element | null = document.querySelector(".btnn");
  const exitGameBtn: Element | null = document.querySelector(".btn-cold");
  const popupOverlay: Element | null = document.querySelector(".popup-overlay");

  exitBtn?.addEventListener("click", () =>
    popupOverlay!.classList.add("active"),
  );
  backToGameBtn?.addEventListener("click", () =>
    popupOverlay!.classList.remove("active"),
  );
  exitGameBtn?.addEventListener("click", () => {
    window.location.href = "/src/pages/settings.html";
  });
}

/**
 * Returns the card count based on selected board size
 */
function getCardCount(): number {
  switch (BOARD_SIZE) {
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

/**
 * Returns the card back image path based on selected theme
 */
function getCardBack(): string {
  return THEME === "theme2"
    ? "/assets/cards/card-back-food.svg"
    : "/assets/cards/card-back.svg";
}

/**
 * Creates and returns a single card element
 * @param img - Card image filename
 * @param cardBack - Card back image path
 */
function createCard(img: string, cardBack: string): HTMLElement {
  const card: HTMLElement = document.createElement("div");
  card.classList.add("card");
  card.dataset.cardId = img;
  card.innerHTML = createCardHTML(img, cardBack);
  card.addEventListener("click", () => handleCardClick(card));
  return card;
}

/**
 * Renders the game board with shuffled card pairs
 */
function renderBoard(): void {
  const board: HTMLElement = document.querySelector(".game-board")!;
  const count: number = getCardCount();
  const cardBack: string = getCardBack();
  const images: string[] = THEME_IMAGES[THEME || "theme1"];
  const cards: string[] = [
    ...images.slice(0, count / 2),
    ...images.slice(0, count / 2),
  ].sort(() => Math.random() - 0.5);

  board.innerHTML = "";
  cards.forEach((img: string) => board.appendChild(createCard(img, cardBack)));
  board.classList.add(`size-${count}`);
}

/**
 * Handles card click - flips card and triggers match check
 * @param card - The clicked card element
 */
function handleCardClick(card: HTMLElement): void {
  if (lockBoard) return;
  if (card.classList.contains("is-flipped")) return;
  if (card.classList.contains("is-matched")) return;

  card.classList.add("is-flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) checkMatch();
}

/**
 * Handles matched cards - updates score and checks game over
 * @param firstCard - First matched card
 * @param secondCard - Second matched card
 */
function handleMatch(firstCard: HTMLElement, secondCard: HTMLElement): void {
  firstCard.classList.add("is-matched");
  secondCard.classList.add("is-matched");
  scores[currentPlayer]++;
  updateScoreDisplay();
  resetFlipped();
  checkGameOver();
}

/**
 * Handles no-match - flips cards back and switches player
 * @param firstCard - First unmatched card
 * @param secondCard - Second unmatched card
 */
function handleNoMatch(firstCard: HTMLElement, secondCard: HTMLElement): void {
  setTimeout(() => {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    switchPlayer();
    resetFlipped();
  }, NO_MATCH_DELAY);
}

/**
 * Compares two flipped cards and delegates to match/no-match handler
 */
function checkMatch(): void {
  lockBoard = true;
  const [firstCard, secondCard] = flippedCards;
  const isMatch: boolean =
    firstCard.dataset.cardId === secondCard.dataset.cardId;

  if (isMatch) handleMatch(firstCard, secondCard);
  else handleNoMatch(firstCard, secondCard);
}

/**
 * Checks if all cards are matched and navigates to result page
 */
function checkGameOver(): void {
  const matchedCount: number = document.querySelectorAll(".is-matched").length;
  if (matchedCount !== getCardCount()) return;

  localStorage.setItem("score_player1", String(scores.player1));
  localStorage.setItem("score_player2", String(scores.player2));
  setTimeout(() => {
    window.location.href = "/src/pages/result.html";
  }, RESULT_DELAY);
}

/**
 * Resets flipped cards and unlocks the board
 */
function resetFlipped(): void {
  flippedCards = [];
  lockBoard = false;
}

/**
 * Updates score display for both players
 */
function updateScoreDisplay(): void {
  const playerone: Element | null = document.querySelector(".playerone");
  const playertwo: Element | null = document.querySelector(".playertwo");
  const playeroneFood: Element | null =
    document.querySelector(".playerone-food");
  const playtwoFood: Element | null = document.querySelector(".playertwo-food");

  if (playerone) playerone.textContent = `Blue ${scores.player1}`;
  if (playertwo) playertwo.textContent = `Orange ${scores.player2}`;
  if (playeroneFood) playeroneFood.textContent = `${scores.player1}`;
  if (playtwoFood) playtwoFood.textContent = `${scores.player2}`;
}

/**
 * Updates current player icon and color indicator
 */
function updateCurrentPlayerDisplay(): void {
  const playerIcon = document.querySelector(".playericons") as HTMLImageElement;
  const fulliBg = document.querySelector(".fullto") as HTMLElement;

  if (playerIcon) {
    playerIcon.src =
      currentPlayer === "player1" ? "/assets/labelB.svg" : "/assets/labelO.svg";
  }
  if (fulliBg) {
    fulliBg.style.backgroundColor =
      currentPlayer === "player1" ? "#097FC5" : "#F58E39";
  }
}

/**
 * Switches active player and updates display
 */
function switchPlayer(): void {
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  updateCurrentPlayerDisplay();
}

init();