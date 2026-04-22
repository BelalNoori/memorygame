export{};

const THEME: string | null = localStorage.getItem("theme");
const BLUE_PLAYER_SCORE: number = parseInt(
  localStorage.getItem("score_player1") || "0",
);
const ORANGE_PLAYER_SCORE: number = parseInt(
  localStorage.getItem("score_player2") || "0",
);
const WINNER: string =
  BLUE_PLAYER_SCORE > ORANGE_PLAYER_SCORE
    ? "BLUE"
    : ORANGE_PLAYER_SCORE > BLUE_PLAYER_SCORE
      ? "ORANGE"
      : "DRAW";
const WINNER_SCREEN_DELAY: number = 3000;

const WINNER_SCREEN = document.querySelector(".winner-screen") as HTMLElement;
const WINNER_NAME: Element | null = document.querySelector(".winner-name");
const WINNER_ICON = document.querySelector(".winner-icon") as HTMLImageElement;
const WINNER_ICON_FOOD = document.querySelector(
  ".winner-icon-food",
) as HTMLImageElement;

/**
 * Initializes result page - sets theme, scores, winner and event listeners
 */
function init(): void {
  document.body.classList.add(THEME || "theme1");
  updateScoreDisplay();
  updateWinnerDisplay();
  showWinnerScreen();
  initEventListeners();
}

/**
 * Updates score display for both players
 */
function updateScoreDisplay(): void {
  const blueScore: Element | null = document.querySelector(".playerblue");
  const orangeScore: Element | null = document.querySelector(".playerorange");
  const blueScoreFood: Element | null =
    document.querySelector(".playerblue-food");
  const orangeScoreFood: Element | null =
    document.querySelector(".playerorange-food");

  if (blueScore) blueScore.textContent = `Blue ${BLUE_PLAYER_SCORE}`;
  if (orangeScore) orangeScore.textContent = `Orange ${ORANGE_PLAYER_SCORE}`;
  if (blueScoreFood) blueScoreFood.textContent = `${BLUE_PLAYER_SCORE}`;
  if (orangeScoreFood) orangeScoreFood.textContent = `${ORANGE_PLAYER_SCORE}`;
}

/**
 * Returns the winner display text
 */
function getWinnerText(): string {
  if (WINNER === "BLUE") return "Blue Player";
  if (WINNER === "ORANGE") return "Orange Player";
  return "Draw";
}

/**
 * Returns the winner icon path for theme1
 */
function getWinnerIconPath(): string {
  return WINNER === "BLUE"
    ? "/assets/chess_pawn_blue.svg"
    : "/assets/chess_pawn_orange.svg";
}

/**
 * Returns the winner icon path for theme2
 */
function getWinnerIconFoodPath(): string {
  return WINNER === "BLUE"
    ? "/assets/PlayerillustrationBlue.svg"
    : "/assets/PlayerillustrationOrange.svg";
}

/**
 * Updates winner name, color class and icons
 */
function updateWinnerDisplay(): void {
  if (WINNER_NAME) {
    WINNER_NAME.textContent = getWinnerText();
    WINNER_NAME.classList.add(WINNER.toLowerCase());
  }
  if (WINNER_ICON) WINNER_ICON.src = getWinnerIconPath();
  if (WINNER_ICON_FOOD) WINNER_ICON_FOOD.src = getWinnerIconFoodPath();
}

/**
 * Shows winner screen after delay
 */
function showWinnerScreen(): void {
  setTimeout(() => WINNER_SCREEN.classList.add("active"), WINNER_SCREEN_DELAY);
}

/**
 * Initializes back button event listeners
 */
function initEventListeners(): void {
  document.querySelector(".back-btn")?.addEventListener("click", navigateHome);
  document
    .querySelector(".back-btn-food")
    ?.addEventListener("click", navigateHome);
}

/**
 * Navigates to home page
 */
function navigateHome(): void {
  window.location.href = "/";
}

init();