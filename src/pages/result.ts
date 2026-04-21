export {};

const theme = localStorage.getItem("theme");
document.body.classList.add(theme || "theme1");
const score1 = parseInt(localStorage.getItem("score_player1") || "0");
const score2 = parseInt(localStorage.getItem("score_player2") || "0");

const blueScore = document.querySelector(".playerblue");
const orangeScore = document.querySelector(".playerorange");

const playeroneFood = document.querySelector(".playerblue-food");
const playtwoFood = document.querySelector(".playerorange-food");
if (playeroneFood) playeroneFood.textContent = `${score1}`;
if (playtwoFood) playtwoFood.textContent = `${score2}`;

if (blueScore) blueScore.textContent = `Blue ${score1}`;
if (orangeScore) orangeScore.textContent = `Orange ${score2}`;

const winner = score1 > score2 ? "BLUE" : score2 > score1 ? "ORANGE" : "DRAW";

const winnerScreen = document.querySelector(".winner-screen") as HTMLElement;
const winnerName = document.querySelector(".winner-name");
const winnerIcon = document.querySelector(".winner-icon") as HTMLImageElement;
const winnerIconFood = document.querySelector(
  ".winner-icon-food",
) as HTMLImageElement;

if (winnerName) {
  const winnerText =
    winner === "BLUE"
      ? "Blue Player"
      : winner === "ORANGE"
        ? "Orange Player"
        : "Draw";
  winnerName.textContent = winnerText;
  winnerName.classList.add(winner.toLowerCase());
}

if (winnerIcon) {
  winnerIcon.src =
    winner === "BLUE"
      ? "/assets/chess_pawn_blue.svg"
      : "/assets/chess_pawn_orange.svg";
}

if (winnerIconFood) {
  winnerIconFood.src =
    winner === "BLUE"
      ? "/assets/PlayerillustrationBlue.svg"
      : "/assets/PlayerillustrationOrange.svg";
}

console.log('winner:', winner);
console.log('winnerIconFood:', document.querySelector(".winner-icon-food"));

setTimeout(() => {
  winnerScreen.classList.add("active");
}, 3000);

document.querySelector(".back-btn")?.addEventListener("click", () => {
  window.location.href = "/";
});

document.querySelector(".back-btn-food")?.addEventListener("click", () => {
  window.location.href = "/";
});
