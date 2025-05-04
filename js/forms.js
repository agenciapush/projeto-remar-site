// Função genérica para abrir e fechar overlays
document.addEventListener("DOMContentLoaded", function () {
  // Função genérica para configurar abertura e fechamento de overlays
  function setupOverlay(openBtnId, closeBtnId, overlayId) {
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = document.getElementById(closeBtnId);
    const overlay = document.getElementById(overlayId);

    if (openBtn && closeBtn && overlay) {
      openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
      });

      closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
      });
    }
  }

  // Configurar overlays específicos
  setupOverlay("open-calendar", "close-calendar", "calendar-overlay");
  setupOverlay("open-history", "close-history", "history-overlay");
  setupOverlay("open-participant-form", "close-participant-form", "participant-form-overlay");
  setupOverlay("open-volunteer-form", "close-volunteer-form", "volunteer-form-overlay");
});