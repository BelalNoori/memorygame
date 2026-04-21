import './styles/style.scss'

init()

// Sets up a click listener on the field element. Toggles the is-flipped class on a card when clicked.
function init(){
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

// Navigate to the settings.
const playBtn = document.querySelector('.play-start');
playBtn?.addEventListener('click', () => {
    window.location.href = '/src/pages/settings.html';
});