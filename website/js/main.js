// Esperar pelo carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um item
        document.querySelectorAll('.nav-menu a').forEach(function(item) {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Slider do Hero
    let currentSlide = 0;
    const heroSlides = document.querySelectorAll('.hero-slide');
    
    if (heroSlides.length > 0) {
        // Mostrar o primeiro slide
        heroSlides[0].classList.add('active');
        
        // Função para trocar slides
        function nextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
        
        // Trocar slides automaticamente a cada 5 segundos
        setInterval(nextSlide, 5000);
    }

    // Slider de Depoimentos
    let currentTestimonial = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialSlides.length > 0) {
        // Mostrar o primeiro depoimento
        testimonialSlides[0].classList.add('active');
        
        // Função para mostrar depoimento anterior
        function prevTestimonial() {
            testimonialSlides[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
            testimonialSlides[currentTestimonial].classList.add('active');
        }
        
        // Função para mostrar próximo depoimento
        function nextTestimonial() {
            testimonialSlides[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            testimonialSlides[currentTestimonial].classList.add('active');
        }
        
        // Adicionar eventos aos botões
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevTestimonial);
            nextBtn.addEventListener('click', nextTestimonial);
        }
    }

    // Lightbox para Galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        let currentImage = 0;
        const images = [];
        
        // Coletar todas as imagens da galeria
        galleryItems.forEach(function(item, index) {
            const img = item.querySelector('img');
            if (img) {
                images.push(img.src);
                
                // Adicionar evento de clique para abrir o lightbox
                item.addEventListener('click', function() {
                    currentImage = index;
                    lightboxImg.src = images[currentImage];
                    lightbox.classList.add('active');
                });
            }
        });
        
        // Fechar lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });
        }
        
        // Imagem anterior
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function() {
                currentImage = (currentImage - 1 + images.length) % images.length;
                lightboxImg.src = images[currentImage];
            });
        }
        
        // Próxima imagem
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function() {
                currentImage = (currentImage + 1) % images.length;
                lightboxImg.src = images[currentImage];
            });
        }
        
        // Fechar lightbox ao clicar fora da imagem
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Funcionalidades de Acessibilidade
    const highContrastBtn = document.querySelector('.high-contrast-btn');
    const largeTextBtn = document.querySelector('.large-text-btn');
    
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            // Salvar preferência no localStorage
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('high-contrast', 'true');
            } else {
                localStorage.setItem('high-contrast', 'false');
            }
        });
    }
    
    if (largeTextBtn) {
        largeTextBtn.addEventListener('click', function() {
            document.body.classList.toggle('large-text');
            // Salvar preferência no localStorage
            if (document.body.classList.contains('large-text')) {
                localStorage.setItem('large-text', 'true');
            } else {
                localStorage.setItem('large-text', 'false');
            }
        });
    }
    
    // Verificar preferências salvas
    if (localStorage.getItem('high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    if (localStorage.getItem('large-text') === 'true') {
        document.body.classList.add('large-text');
    }

    // Animação de elementos ao scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    // Verificar elementos visíveis ao carregar a página
    checkScroll();
    
    // Verificar elementos visíveis ao rolar a página
    window.addEventListener('scroll', checkScroll);

    // Validação de Formulário
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Validar nome
            if (!name.value.trim()) {
                isValid = false;
                showError(name, 'Por favor, informe seu nome');
            } else {
                removeError(name);
            }
            
            // Validar email
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Por favor, informe seu email');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Por favor, informe um email válido');
            } else {
                removeError(email);
            }
            
            // Validar mensagem
            if (!message.value.trim()) {
                isValid = false;
                showError(message, 'Por favor, escreva sua mensagem');
            } else {
                removeError(message);
            }
            
            // Se o formulário for válido, exibir mensagem de sucesso
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.classList.add('error');
    }
    
    // Função para remover erro
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        input.classList.remove('error');
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");
  
    window.addEventListener("scroll", () => {
      let current = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  });
  