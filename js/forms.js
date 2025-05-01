// forms.js atualizado mantendo a mesma experiência e corrigindo duplicidades/boas práticas

// Função genérica para abrir e fechar overlays
document.addEventListener("DOMContentLoaded", function () {
    // Calendário
    const openCalendar = document.getElementById("open-calendar");
    const closeCalendar = document.getElementById("close-calendar");
    const overlayCalendar = document.getElementById("calendar-overlay");
  
    if (openCalendar && closeCalendar && overlayCalendar) {
      openCalendar.addEventListener("click", () => {
        overlayCalendar.style.display = "flex";
      });
  
      closeCalendar.addEventListener("click", () => {
        overlayCalendar.style.display = "none";
      });
    }
  
    // Sobre: Nossa História
    const openHistory = document.getElementById("open-history");
    const closeHistory = document.getElementById("close-history");
    const overlayHistory = document.getElementById("history-overlay");
  
    if (openHistory && closeHistory && overlayHistory) {
      openHistory.addEventListener("click", () => {
        overlayHistory.style.display = "flex";
      });
  
      closeHistory.addEventListener("click", () => {
        overlayHistory.style.display = "none";
      });
    }
  
    // Sobre: Nossa Missão
    const openMission = document.getElementById("open-mission");
    const closeMission = document.getElementById("close-mission");
    const overlayMission = document.getElementById("mission-overlay");
  
    if (openMission && closeMission && overlayMission) {
      openMission.addEventListener("click", () => {
        overlayMission.style.display = "flex";
      });
  
      closeMission.addEventListener("click", () => {
        overlayMission.style.display = "none";
      });
    }
  
    // Sobre: Nossos Valores
    const openValues = document.getElementById("open-values");
    const closeValues = document.getElementById("close-values");
    const overlayValues = document.getElementById("values-overlay");
  
    if (openValues && closeValues && overlayValues) {
      openValues.addEventListener("click", () => {
        overlayValues.style.display = "flex";
      });
  
      closeValues.addEventListener("click", () => {
        overlayValues.style.display = "none";
      });
    }
  
    // Formulário de Participante - Envio
    const participantForm = document.getElementById("participant-form");
  
    if (participantForm) {
        participantForm.addEventListener("submit", async function (e) {
            e.preventDefault();
          
            const formData = {
              "Nome completo": document.getElementById("participant-name")?.value,
              "Data de nascimento": document.getElementById("participant-birth")?.value,
              "CPF": document.getElementById("participant-cpf")?.value,
              "RG": document.getElementById("participant-rg")?.value,
              "Telefone/WhatsApp": document.getElementById("participant-phone")?.value,
              "E-mail": document.getElementById("participant-email")?.value,
              "Endereço completo": document.getElementById("participant-address")?.value,
            };
          
            try {
              const response = await fetch("https://script.google.com/macros/s/AKfycbzbegnZ0M_aaeHJPPGgXKR9tAxP07uJppWqWhGkRT0WrF8D7lMPirpJ5FoeKvgAG5mP/exec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });
          
              if (!response.ok) {
                console.error("Erro na resposta do servidor:", response.status, response.statusText);
                alert("Erro ao enviar o cadastro. Tente novamente.");
                return;
              }
          
              const responseText = await response.text(); // Obtemos o texto da resposta
              let result;
          
              try {
                result = JSON.parse(responseText); // Tentamos fazer o parsing do JSON
              } catch (error) {
                console.error("Erro ao interpretar a resposta como JSON:", responseText);
                alert("Erro ao enviar o cadastro. Tente novamente.");
                return;
              }
          
              if (result.status === "success") {
                alert("Cadastro enviado com sucesso!");
                participantForm.reset(); // limpa o formulário
              } else {
                console.error("Resposta inesperada do servidor:", result);
                alert("Erro ao enviar o cadastro. Tente novamente.");
              }
            } catch (error) {
              console.error("Erro de conexão ou processamento:", error);
              alert("Erro ao enviar o cadastro. Tente novamente.");
            }
          });
    }
  
    // Formulários - Abrir/Fechar (Participante e Voluntário)
    const openParticipantBtn = document.getElementById("open-participant-form");
    const closeParticipantBtn = document.getElementById("close-participant-form");
    const participantOverlay = document.getElementById("participant-form-overlay");
  
    if (openParticipantBtn && closeParticipantBtn && participantOverlay) {
      openParticipantBtn.addEventListener("click", () => {
        participantOverlay.style.display = "flex";
      });
  
      closeParticipantBtn.addEventListener("click", () => {
        participantOverlay.style.display = "none";
      });
    }
  
    const openVolunteerBtn = document.getElementById("open-volunteer-form");
    const closeVolunteerBtn = document.getElementById("close-volunteer-form");
    const volunteerOverlay = document.getElementById("volunteer-form-overlay");
  
    if (openVolunteerBtn && closeVolunteerBtn && volunteerOverlay) {
      openVolunteerBtn.addEventListener("click", () => {
        volunteerOverlay.style.display = "flex";
      });
  
      closeVolunteerBtn.addEventListener("click", () => {
        volunteerOverlay.style.display = "none";
      });
    }
  });
  