import './styles/style.scss'

init()

/**
 * Initializes click listener on the game field for card flipping
 */
function init(): void {
    const fieldRef = document.getElementById("field");
    if (fieldRef) {
        fieldRef.addEventListener("click", e => {
            const card = (e.target as HTMLElement).closest(".card") as HTMLButtonElement;
            if (card) {
                card.classList.toggle("is-flipped")
            }
        })
    }
}

const playBtn = document.querySelector('.play-start');
playBtn?.addEventListener('click', () => {
    window.location.href = '/src/pages/settings.html';
});