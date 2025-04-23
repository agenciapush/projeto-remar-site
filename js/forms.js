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
    
    // Validação do formulário de participante
    if (participantForm) {
        participantForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Aqui você pode adicionar validação de campos
            let isValid = true;
            const requiredFields = participantForm.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    // Mostrar mensagem de erro
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) {
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'Este campo é obrigatório.';
                    }
                }
            });
            
            if (isValid) {
                // Simulação de envio do formulário
                alert('Formulário enviado com sucesso! Em breve entraremos em contato.');
                participantFormOverlay.style.display = 'none';
                document.body.style.overflow = '';
                participantForm.reset();
                
                // Em um ambiente real, você usaria AJAX para enviar os dados para o servidor
                // ou integraria com um serviço de formulários como FormSpree, Netlify Forms, etc.
            }
        });
    }
    
    // Validação do formulário de voluntário
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Aqui você pode adicionar validação de campos
            let isValid = true;
            const requiredFields = volunteerForm.querySelectorAll('[required]');
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    // Mostrar mensagem de erro
                    const errorElement = document.getElementById(field.id + '-error');
                    if (errorElement) {
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'Este campo é obrigatório.';
                    }
                }
            });
            
            if (isValid) {
                // Simulação de envio do formulário
                alert('Formulário enviado com sucesso! Em breve entraremos em contato.');
                volunteerFormOverlay.style.display = 'none';
                document.body.style.overflow = '';
                volunteerForm.reset();
                
                // Em um ambiente real, você usaria AJAX para enviar os dados para o servidor
                // ou integraria com um serviço de formulários como FormSpree, Netlify Forms, etc.
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
