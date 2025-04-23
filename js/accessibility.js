// Funções adicionais para acessibilidade

// Função para verificar e corrigir problemas de contraste
function checkContrast() {
    // Verifica se o modo de alto contraste está ativado
    const isHighContrast = document.body.classList.contains('high-contrast');
    
    if (!isHighContrast) {
        // Verifica elementos que podem ter problemas de contraste
        const elementsToCheck = document.querySelectorAll('.hero-content, .footer, .activity-card, .testimonial-slide');
        
        elementsToCheck.forEach(function(element) {
            // Adiciona classes auxiliares para melhorar contraste quando necessário
            const backgroundColor = window.getComputedStyle(element).backgroundColor;
            if (backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                // Verifica se o fundo é escuro
                const isBackgroundDark = isColorDark(backgroundColor);
                
                if (isBackgroundDark) {
                    element.classList.add('light-text');
                } else {
                    element.classList.add('dark-text');
                }
            }
        });
    }
}

// Função auxiliar para determinar se uma cor é escura
function isColorDark(color) {
    // Converte cores rgba para valores RGB
    let r, g, b;
    
    if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
            r = parseInt(rgbValues[0]);
            g = parseInt(rgbValues[1]);
            b = parseInt(rgbValues[2]);
        }
    }
    
    if (r !== undefined && g !== undefined && b !== undefined) {
        // Calcula a luminosidade (fórmula YIQ)
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return yiq < 128; // Se for menor que 128, é considerada escura
    }
    
    return false;
}

// Função para melhorar a navegação por teclado
function enhanceKeyboardNavigation() {
    // Adiciona suporte para navegação por teclado no menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('keydown', function(e) {
            // Ativa o menu com Enter ou Espaço
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }
    
    // Melhora a navegação por teclado na galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(function(item) {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Adiciona suporte para fechar o lightbox com Escape
    const lightbox = document.querySelector('.lightbox');
    
    if (lightbox) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                const closeButton = lightbox.querySelector('.lightbox-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        });
    }
}

// Função para adicionar descrições ARIA dinâmicas
function enhanceAriaDescriptions() {
    // Adiciona descrições para os slides do hero
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    heroSlides.forEach(function(slide, index) {
        const heading = slide.querySelector('h1');
        const description = slide.querySelector('p');
        
        if (heading && description) {
            const slideId = `hero-slide-${index + 1}`;
            slide.setAttribute('id', slideId);
            slide.setAttribute('aria-labelledby', slideId);
            heading.setAttribute('id', `${slideId}-heading`);
        }
    });
    
    // Melhora a acessibilidade do formulário de contato
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        // Adiciona feedback de erro acessível
        const formInputs = form.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(function(input) {
            const inputId = input.getAttribute('id');
            const errorId = `${inputId}-error`;
            
            input.setAttribute('aria-describedby', errorId);
            
            // Cria um elemento para mensagens de erro se não existir
            if (!document.getElementById(errorId)) {
                const errorElement = document.createElement('div');
                errorElement.setAttribute('id', errorId);
                errorElement.setAttribute('class', 'error-message');
                errorElement.setAttribute('aria-live', 'assertive');
                errorElement.style.display = 'none';
                
                input.parentNode.appendChild(errorElement);
            }
        });
    }
}

// Função para melhorar o suporte a leitores de tela
function enhanceScreenReaderSupport() {
    // Adiciona descrições para ícones
    const iconElements = document.querySelectorAll('i[aria-hidden="true"]');
    
    iconElements.forEach(function(icon) {
        const parentElement = icon.parentElement;
        
        // Verifica se o elemento pai já tem um texto descritivo
        if (parentElement && !parentElement.querySelector('.sr-only')) {
            const nextSibling = icon.nextSibling;
            
            if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE && nextSibling.textContent.trim()) {
                // Se houver texto após o ícone, não precisa adicionar descrição
            } else {
                // Adiciona descrição para leitores de tela se necessário
                const ariaLabel = parentElement.getAttribute('aria-label');
                
                if (ariaLabel) {
                    const srElement = document.createElement('span');
                    srElement.setAttribute('class', 'sr-only');
                    srElement.textContent = ariaLabel;
                    parentElement.appendChild(srElement);
                }
            }
        }
    });
    
    // Melhora a descrição das imagens para leitores de tela
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        const alt = img.getAttribute('alt');
        
        if (alt && alt.length > 125) {
            // Se a descrição for muito longa, adiciona um aria-describedby
            const imgId = 'img-' + Math.random().toString(36).substr(2, 9);
            img.setAttribute('id', imgId);
            
            const descElement = document.createElement('div');
            descElement.setAttribute('id', `${imgId}-desc`);
            descElement.setAttribute('class', 'sr-only');
            descElement.textContent = alt;
            
            img.parentNode.appendChild(descElement);
            
            // Atualiza a imagem para usar a descrição longa
            img.setAttribute('aria-describedby', `${imgId}-desc`);
            
            // Encurta o alt para ser mais conciso
            const shortAlt = alt.substring(0, 125) + '...';
            img.setAttribute('alt', shortAlt);
        }
    });
}

// Inicializa as funções de acessibilidade quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    checkContrast();
    enhanceKeyboardNavigation();
    enhanceAriaDescriptions();
    enhanceScreenReaderSupport();
    
    // Verifica novamente o contraste quando o modo de alto contraste é alterado
    const highContrastBtn = document.querySelector('.high-contrast-btn');
    
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', function() {
            setTimeout(checkContrast, 100);
        });
    }
});
