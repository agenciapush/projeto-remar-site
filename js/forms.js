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
    } else {
      console.warn(`Overlay configuration failed for IDs: ${openBtnId}, ${closeBtnId}, ${overlayId}`);
    }
  }

  // Função para formatar o CPF
  function formatCPFInput(event) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      input.value = `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
  }

  // Função para formatar o Telefone
  function formatPhoneNumberInput(event) {
    const input = event.target;
    const cleaned = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      input.value = `(${match[1]}) ${match[2]}.${match[3]}`;
    }
  }

  // Adicionar o evento de formatação aos campos de CPF e Telefone (Participantes)
  const participantCpfInput = document.getElementById("participant-cpf");
  const guardianCpfInput = document.getElementById("guardian-cpf");
  const participantPhoneInput = document.getElementById("participant-phone");
  const emergencyPhoneInput = document.getElementById("emergency-phone");

  if (participantCpfInput) {
    participantCpfInput.addEventListener("input", formatCPFInput);
  }
  if (guardianCpfInput) {
    guardianCpfInput.addEventListener("input", formatCPFInput);
  }
  if (participantPhoneInput) {
    participantPhoneInput.addEventListener("input", formatPhoneNumberInput);
  }
  if (emergencyPhoneInput) {
    emergencyPhoneInput.addEventListener("input", formatPhoneNumberInput);
  }

  // Adicionar o evento de formatação aos campos de CPF e Telefone (Voluntários)
  const volunteerCpfInput = document.getElementById("volunteer-cpf");
  const volunteerPhoneInput = document.getElementById("volunteer-phone");

  if (volunteerCpfInput) {
    volunteerCpfInput.addEventListener("input", formatCPFInput);
  }
  if (volunteerPhoneInput) {
    volunteerPhoneInput.addEventListener("input", formatPhoneNumberInput);
  }

  // Exibir mensagem de "loading" ao enviar formulário
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Criar e exibir o ícone de "loading"
      const loadingMessage = document.createElement("div");
      loadingMessage.style.position = "fixed";
      loadingMessage.style.top = "50%";
      loadingMessage.style.left = "50%";
      loadingMessage.style.transform = "translate(-50%, -50%)";
      loadingMessage.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      loadingMessage.style.padding = "2rem";
      loadingMessage.style.borderRadius = "8px";
      loadingMessage.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      loadingMessage.style.zIndex = "1000";
      loadingMessage.style.textAlign = "center";

      // Adicionar o ícone de loading animado
      const spinner = document.createElement("div");
      spinner.style.border = "4px solid #f3f3f3";
      spinner.style.borderTop = "4px solid #3498db";
      spinner.style.borderRadius = "50%";
      spinner.style.width = "40px";
      spinner.style.height = "40px";
      spinner.style.animation = "spin 1s linear infinite";
      spinner.style.margin = "0 auto";

      loadingMessage.appendChild(spinner);
      document.body.appendChild(loadingMessage);

      // Adicionar animação CSS para o spinner
      const style = document.createElement("style");
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      // Simular envio do formulário com um delay
      setTimeout(() => {
        document.body.removeChild(loadingMessage); // Remover a mensagem de "loading"
        alert("Formulário enviado com sucesso!"); // Mensagem de sucesso
        form.reset(); // Limpar o formulário

        // Fechar o formulário automaticamente
        const overlay = form.closest(".form-overlay"); // Localizar o overlay pai do formulário
        if (overlay) {
          overlay.style.display = "none"; // Fechar o overlay
        }
      }, 3000); // Tempo de delay (3 segundos)
    });
  });

  // Configurar overlays específicos
  setupOverlay("open-calendar", "close-calendar", "calendar-overlay");
  setupOverlay("open-history", "close-history", "history-overlay");
  setupOverlay("open-participant-form", "close-participant-form", "participant-form-overlay");
  setupOverlay("open-volunteer-form", "close-volunteer-form", "volunteer-form-overlay");
});