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

function checkAllSelected() {
  const theme = localStorage.getItem("theme");
  const player = localStorage.getItem("player");
  const boardSize = localStorage.getItem("boardSize");

  if (theme && player && boardSize) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true;
  }
}

function updateSummary(name: string, targetId: string) {
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