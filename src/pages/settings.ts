const THEME_PREVIEWS: Record<string, string> = {
  default: "/assets/Memory.svg",
  theme1: "/assets/ThemeVisualVibe.svg",
  theme2: "/assets/foodstheme.svg",
};

const PREVIEW = document.querySelector(".theme-review img") as HTMLImageElement;
const START_BTN = document.querySelector(".btn-option") as HTMLButtonElement;

/**
 * Initializes settings page - clears storage, sets defaults and event listeners
 */
function init(): void {
  clearStorage();
  setDefaultPreview();
  initSummaryListeners();
  initStartButton();
  initThemeHover();
}

/**
 * Clears all settings from localStorage
 */
function clearStorage(): void {
  localStorage.removeItem("theme");
  localStorage.removeItem("player");
  localStorage.removeItem("boardSize");
}

/**
 * Sets default preview image and disables start button
 */
function setDefaultPreview(): void {
  if (PREVIEW) PREVIEW.src = THEME_PREVIEWS["default"];
  START_BTN.disabled = true;
}

/**
 * Initializes all summary bar listeners
 */
function initSummaryListeners(): void {
  updateSummary("theme", "selected-theme");
  updateSummary("player", "selected-player");
  updateSummary("boardSize", "selected-size");
}

/**
 * Updates summary text, localStorage and theme preview on radio change
 * @param name - Input name attribute
 * @param targetId - Summary element ID to update
 */
function updateSummary(name: string, targetId: string): void {
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const label: Element | null = document.querySelector(
        `label[for="${target.id}"]`,
      );
      document.getElementById(targetId)!.textContent = label?.textContent || "";
      localStorage.setItem(name, target.value);
      if (name === "theme") updatePreview(target.value);
      checkAllSelected();
    });
  });
}

/**
 * Updates the theme preview image
 * @param themeValue - Selected theme value
 */
function updatePreview(themeValue: string): void {
  if (PREVIEW) PREVIEW.src = THEME_PREVIEWS[themeValue];
}

/**
 * Checks if all settings are selected and toggles start button
 */
function checkAllSelected(): void {
  const theme: string | null = localStorage.getItem("theme");
  const player: string | null = localStorage.getItem("player");
  const boardSize: string | null = localStorage.getItem("boardSize");
  const allSettingsSelected: boolean = !!(theme && player && boardSize);
  START_BTN.disabled = !allSettingsSelected;
}

/**
 * Initializes start button click listener
 */
function initStartButton(): void {
  START_BTN.addEventListener("click", () => {
    const theme: string | null = localStorage.getItem("theme");
    const player: string | null = localStorage.getItem("player");
    const boardSize: string | null = localStorage.getItem("boardSize");
    const allSettingsSelected: boolean = !!(theme && player && boardSize);

    if (!allSettingsSelected) {
      alert("Bitte alle Einstellungen auswählen!");
      return;
    }
    window.location.href = "/src/pages/game.html";
  });
}

/**
 * Initializes theme hover preview for all theme labels
 */
function initThemeHover(): void {
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    const label: Element | null = document.querySelector(
      `label[for="${(input as HTMLInputElement).id}"]`,
    );
    label?.addEventListener("mouseover", () =>
      updatePreview((input as HTMLInputElement).value),
    );
    label?.addEventListener("mouseleave", () => {
      const selectedTheme: string | null = localStorage.getItem("theme");
      updatePreview(selectedTheme || "default");
    });
  });
}

init();