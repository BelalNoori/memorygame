export function createCardHTML(img: string, cardBack: string): string {
    return `
        <div class="card__inner">
            <div class="card__face card__face--front">
                <img src="/assets/cards/${img}" alt="">
            </div>
            <div class="card__face card__face--back">
                <img src="${cardBack}" alt="">
            </div>
        </div>
    `;
}
