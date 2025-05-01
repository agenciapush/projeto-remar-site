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
          
            const formData = new FormData(participantForm);
            const fileInput = document.getElementById("medical-report");

            // Adicionar o arquivo anexado ao FormData
            if (fileInput.files.length > 0) {
              const file = fileInput.files[0];
              const base64File = await fileToBase64(file);
              formData.append("file", base64File);
              formData.append("fileName", file.name);
              formData.append("mimeType", file.type);
            }

            try {
              const response = await fetch("https://script.google.com/macros/s/AKfycbzbegnZ0M_aaeHJPPGgXKR9tAxP07uJppWqWhGkRT0WrF8D7lMPirpJ5FoeKvgAG5mP/exec", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" },
              });
          
              const result = await response.json();
              if (result.status === "success") {
                alert("Cadastro enviado com sucesso!");
                participantForm.reset(); // limpa o formulário
              } else {
                alert("Erro ao enviar o cadastro. Tente novamente.");
              }
            } catch (error) {
              console.error("Erro ao enviar o cadastro:", error);
              alert("Erro ao enviar o cadastro. Tente novamente.");
            }
          });
    }
  
    // Função para converter arquivo em Base64
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
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