function updateSummary(name: string, targetId: string) {
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const label = document.querySelector(`label[for="${target.id}"]`);
      const text = label?.textContent || "";

      document.getElementById(targetId)!.textContent = text;

      localStorage.setItem(name, target.value);
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
