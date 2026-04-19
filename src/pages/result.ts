const score1 = parseInt(localStorage.getItem("score_player1") || "0");
const score2 = parseInt(localStorage.getItem("score_player2") || "0");

const blueScore = document.querySelector(".playerblue");
const orangeScore = document.querySelector(".playerorange");

if (blueScore) blueScore.textContent = `Blue ${score1}`;
if (orangeScore) orangeScore.textContent = `Orange ${score2}`;

const winner = score1 > score2 ? "BLUE" : score2 > score1 ? "ORANGE" : "DRAW";

const winnerScreen = document.querySelector(".winner-screen") as HTMLElement;
const winnerName = document.querySelector(".winner-name");
const winnerIcon = document.querySelector(".winner-icon") as HTMLImageElement;

if (winnerName) {
  winnerName.textContent = `${winner} PLAYER`;
  winnerName.classList.add(winner.toLowerCase());
}

if (winnerIcon) {
  winnerIcon.src =
    winner === "BLUE"
      ? "/assets/chess_pawn_blue.svg"
      : "/assets/chess_pawn_orange.svg";
}

setTimeout(() => {
  winnerScreen.classList.add("active");
}, 1200);

document.querySelector(".back-btn")?.addEventListener("click", () => {
  window.location.href = "/";
});
