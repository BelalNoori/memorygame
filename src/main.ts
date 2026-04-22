import "./styles/style.scss";

/**
 * Initializes the start page - sets up all event listeners
 */
function init(): void {
  initCardFlip();
  initPlayButton();
}

/**
 * Initializes click listener on the game field for card flipping
 */
function initCardFlip(): void {
  const fieldRef: HTMLElement | null = document.getElementById("field");
  if (fieldRef) {
    fieldRef.addEventListener("click", (e) => {
      const card = (e.target as HTMLElement).closest(
        ".card",
      ) as HTMLButtonElement;
      if (card) card.classList.toggle("is-flipped");
    });
  }
}

/**
 * Initializes play button click listener to navigate to settings
 */
function initPlayButton(): void {
  const playBtn: Element | null = document.querySelector(".play-start");
  playBtn?.addEventListener("click", () => {
    window.location.href = "/src/pages/settings.html";
  });
}

init();