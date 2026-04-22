export{};

localStorage.removeItem("theme");
localStorage.removeItem("player");
localStorage.removeItem("boardSize");

const themeImages: Record<string, string> = {
  default: "/assets/Memory.svg",
  theme1: "/assets/ThemeVisualVibe.svg",
  theme2: "/assets/foodstheme.svg",
};

const preview = document.querySelector(".theme-review img") as HTMLImageElement;
if (preview) preview.src = themeImages["default"];
const startBtn = document.querySelector(".btn-option") as HTMLButtonElement;
startBtn.disabled = true;

/**
 * Checks if all settings are selected and enables/disables the start button
 */
function checkAllSelected(): void {
  const theme = localStorage.getItem("theme");
  const player = localStorage.getItem("player");
  const boardSize = localStorage.getItem("boardSize");

  if (theme && player && boardSize) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

/**
 * Listens for radio input changes and updates summary bar, localStorage and theme preview
 * @param name - The input name attribute (theme/player/boardSize)
 * @param targetId - The ID of the summary element to update
 */
function updateSummary(name: string, targetId: string): void {
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const label = document.querySelector(`label[for="${target.id}"]`);
      document.getElementById(targetId)!.textContent = label?.textContent || "";
      localStorage.setItem(name, target.value);

      if (name === "theme") {
        const preview = document.querySelector(".theme-review img",) as HTMLImageElement;
        if (preview) preview.src = themeImages[target.value];
      }
      checkAllSelected();
    });
  });
}

updateSummary("theme", "selected-theme");
updateSummary("player", "selected-player");
updateSummary("boardSize", "selected-size");

document.querySelector(".btn-option")?.addEventListener("click", () => {
  const theme = localStorage.getItem("theme");
  const player = localStorage.getItem("player");
  const boardSize = localStorage.getItem("boardSize");

  if (!theme || !player || !boardSize) {
    alert("Bitte alle Einstellungen auswählen!");
    return;
  }

  window.location.href = "/src/pages/game.html";
});

document.querySelectorAll('input[name="theme"]').forEach((input) => {
  const label = document.querySelector(
    `label[for="${(input as HTMLInputElement).id}"]`,
  );

  label?.addEventListener("mouseover", () => {
    const value = (input as HTMLInputElement).value;
    if (preview) preview.src = themeImages[value];
  });

  label?.addEventListener("mouseleave", () => {
    const selectedTheme = localStorage.getItem("theme");
    if (preview)
      preview.src = selectedTheme
        ? themeImages[selectedTheme]
        : themeImages["default"];
  });
});