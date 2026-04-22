/**
 * Creates and returns the HTML string for a single memory card
 * @param img - The image filename for the card front
 * @param cardBack - The path to the card back image
 * @returns HTML string with card inner structure
 */
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
