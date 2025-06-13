document.addEventListener('DOMContentLoaded', () => {

    // EFEITO MÁQUINA DE ESCREVER
    const sloganElement = document.getElementById('typing-slogan');
    const sloganText = "Excelência em Retífica de Motores Diesel";
    let i = 0;
    function typeSlogan() {
        if (i < sloganText.length) {
            sloganElement.textContent += sloganText.charAt(i);
            i++;
            setTimeout(typeSlogan, 80);
        }
    }
    if (sloganElement) {
        setTimeout(typeSlogan, 1000); // Inicia após 1 segundo
    }

    // HEADER MUDA DE COR NO SCROLL
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ativar contadores quando a seção estiver visível
                // CORREÇÃO: O ID da seção foi atualizado para 'especialistas'
                if (entry.target.id === 'especialistas') {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    // CORREÇÃO: O seletor também foi atualizado para observar a nova seção
    document.querySelectorAll('.animate-on-scroll, #especialistas').forEach(el => {
        observer.observe(el);
    });

    // CONTADORES ANIMADOS
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 10);
            
            const updateCounter = () => {
                const currentValue = +counter.innerText;
                if (currentValue < target) {
                    counter.innerText = `${Math.ceil(currentValue + increment)}`;
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = new Intl.NumberFormat('pt-BR').format(target);
                }
            };
            updateCounter();
        });
        countersStarted = true;
    }

    // FORMULÁRIO MULTI-STEP
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        const stepsContainer = quoteForm.querySelector('.form-steps-container');
        const nextBtns = quoteForm.querySelectorAll('.btn-next');
        const prevBtns = quoteForm.querySelectorAll('.btn-prev');
        const progressSteps = quoteForm.querySelectorAll('.progress-step');
        let currentStep = 0;

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(currentStep < 2) {
                   currentStep++;
                   updateFormSteps();
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if(currentStep > 0) {
                    currentStep--;
                    updateFormSteps();
                }
            });
        });

        function updateFormSteps() {
            stepsContainer.style.transform = `translateX(-${currentStep * (100 / 3)}%)`;
            progressSteps.forEach((step, idx) => {
                step.classList.remove('active');
                if(idx <= currentStep){
                    step.classList.add('active');
                }
            });
        }
    }
    
    // BARRA DE PROGRESSO NO SCROLL
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    });

    // SELETOR DE TEMA (DARK/LIGHT)
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
    
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // SCROLL SUAVE PARA ÂNCORAS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- CORREÇÃO: LÓGICA DO CARROSSEL MOVIDA PARA O LOCAL CORRETO ---
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }
    // --- FIM DA LÓGICA DO CARROSSEL ---

}); // Fim do document.addEventListener
