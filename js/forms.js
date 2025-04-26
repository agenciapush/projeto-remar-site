// Funções para os formulários ocultos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário de participante
    const openParticipantFormBtn = document.getElementById('open-participant-form');
    const participantFormOverlay = document.getElementById('participant-form-overlay');
    const closeParticipantFormBtn = document.getElementById('close-participant-form');
    const participantForm = document.getElementById('participant-form');

    // Elementos do formulário de voluntário
    const openVolunteerFormBtn = document.getElementById('open-volunteer-form');
    const volunteerFormOverlay = document.getElementById('volunteer-form-overlay');
    const closeVolunteerFormBtn = document.getElementById('close-volunteer-form');
    const volunteerForm = document.getElementById('volunteer-form');

    // Função para enviar dados do formulário de participante
    async function enviarFormularioParticipante(dadosFormulario) {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzLjNUNQkSnDYykk-Zdu8e47mjcLPwOAjI6xp0KJwVkXYVvRbpMwxeFBS9aZxH4damT/exec
', { // <-- Substitua aqui
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosFormulario)
            });

            alert('Formulário enviado com sucesso! Obrigado por se inscrever.');
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
        }
    }

    // Abrir formulário de participante
    if (openParticipantFormBtn) {
        openParticipantFormBtn.addEventListener('click', function() {
            if (participantFormOverlay) {
                participantFormOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Impede rolagem da página
            }
        });
    }

    // Fechar formulário de participante
    if (closeParticipantFormBtn) {
        closeParticipantFormBtn.addEventListener('click', function() {
            if (participantFormOverlay) {
                participantFormOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restaura rolagem da página
            }
        });
    }

    // Abrir formulário de voluntário
    if (openVolunteerFormBtn) {
        openVolunteerFormBtn.addEventListener('click', function() {
            if (volunteerFormOverlay) {
                volunteerFormOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Impede rolagem da página
            }
        });
    }

    // Fechar formulário de voluntário
    if (closeVolunteerFormBtn) {
        closeVolunteerFormBtn.addEventListener('click', function() {
            if (volunteerFormOverlay) {
                volunteerFormOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restaura rolagem da página
            }
        });
    }

    // Fechar formulários ao clicar fora deles
    window.addEventListener('click', function(event) {
        if (event.target === participantFormOverlay) {
            participantFormOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (event.target === volunteerFormOverlay) {
            volunteerFormOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Validação e envio do formulário de participante
    if (participantForm) {
        participantForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;
            const requiredFields = participantForm.querySelectorAll('[required]');

            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) {
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'Este campo é obrigatório.';
                    }
                }
            });

            if (isValid) {
                const formData = {};
                const fields = participantForm.querySelectorAll('input, select, textarea');

                fields.forEach(function(field) {
                    formData[field.name] = field.value;
                });

                enviarFormularioParticipante(formData);

                participantFormOverlay.style.display = 'none';
                document.body.style.overflow = '';
                participantForm.reset();
            }
        });
    }

    // Validação do formulário de voluntário (apenas validação local)
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;
            const requiredFields = volunteerForm.querySelectorAll('[required]');

            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) {
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'Este campo é obrigatório.';
                    }
                }
            });

            if (isValid) {
                const formData = {};
                const fields = participantForm.querySelectorAll('input, select, textarea');
                
                fields.forEach(function(field) {
                    formData[field.name] = field.value;
                });
            
                enviarFormularioParticipante(formData);
            
                participantFormOverlay.style.display = 'none';
                document.body.style.overflow = '';
                participantForm.reset();
            }
            
        });
    }

    // Limpar mensagens de erro quando o usuário começa a digitar
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(input.id + '-error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
});
