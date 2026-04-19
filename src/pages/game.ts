const boardSize = localStorage.getItem('boardSize');
const theme = localStorage.getItem('theme');

const exitBtn = document.querySelector(".exit-btn");
const popupOverlay = document.querySelector(".popup-overlay");
const backToGameBtn = document.querySelector(".btnn");
const exitGameBtn = document.querySelector(".btn-cold");

let currentPlayer: "player1" | "player2" = "player1";
let scores = { player1: 0, player2: 0 };

exitBtn?.addEventListener('click', () => {
    popupOverlay!.classList.add('active');
});

backToGameBtn?.addEventListener('click', () => {
    popupOverlay!.classList.remove('active');
});

exitGameBtn?.addEventListener('click', () => {
    window.location.href = '/src/pages/settings.html';
});

const themeImages: Record<string, string[]> = {
    'theme1': [
        'git.svg',
        'typescript.svg',
        'javascript.svg',
        'html.svg',
        'vscode.svg',
        'css.svg',
        'django.svg',
        'angular.svg',
        'terminal.svg',
        'python.svg',
        'github.svg',
        'nodejs.svg',
        'bootstrap.svg',
        'vue.svg',
        'react.svg',
        'sass.svg',
        'database.svg',
        'firebase.svg',
    ],
    'theme2': [
    ]
};

function getCardCount(): number {
    switch(boardSize) {
        case 'size1': return 16;
        case 'size2': return 24;
        case 'size3': return 36;
        default: return 16;
    }
}

function renderBoard() {
    const board = document.querySelector('.game-board')!;
    const images = themeImages[theme || 'theme1'];
    const count = getCardCount();

    const selected = images.slice(0, count / 2);
    const cards = [...selected, ...selected]
        .sort(() => Math.random() - 0.5);

    board.innerHTML = '';

    cards.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardId = img;

        card.innerHTML = `
            <div class="card__inner">
                <div class="card__face card__face--front">
                    <img src="/assets/cards/${img}" alt="">
                </div>
                <div class="card__face card__face--back">
                    <img src="/assets/cards/card-back.svg" alt="">
                </div>
            </div>
        `;

        card.addEventListener('click', () => handleCardClick(card));
        board.appendChild(card);
    });

    board.classList.add(`size-${count}`);
}

let flippedCards: HTMLElement[] = [];
let lockBoard = false;

function handleCardClick(card: HTMLElement) {
    if (lockBoard) return;
    if (card.classList.contains('is-flipped')) return;
    if (card.classList.contains('is-matched')) return;

    card.classList.add('is-flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function updateScoreDisplay() {
  const playerone = document.querySelector(".playerone");
  const playertwo = document.querySelector(".playertwo");
  if (playerone) playerone.textContent = `Blue ${scores.player1}`;
  if (playertwo) playertwo.textContent = `Orange ${scores.player2}`;
}

function updateCurrentPlayerDisplay() {
  const playerIcon = document.querySelector(
    ".current-player img",
  ) as HTMLImageElement;
  if (playerIcon) {
    playerIcon.src =
      currentPlayer === "player1" ? "/assets/labelB.svg" : "/assets/labelO.svg";
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  updateCurrentPlayerDisplay();
}

function checkMatch() {
  lockBoard = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.cardId === card2.dataset.cardId) {
    card1.classList.add("is-matched");
    card2.classList.add("is-matched");

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

function resetFlipped() {
    flippedCards = [];
    lockBoard = false;
}

renderBoard();
updateScoreDisplay();
updateCurrentPlayerDisplay();