document.addEventListener('DOMContentLoaded', () => {

    // --- CÁLCULO AUTOMÁTICO DOS ANOS DE EXPERIÊNCIA ---
    const anoFundacao = 2007;
    const anoAtual = new Date().getFullYear();
    const anosDeExperiencia = anoAtual - anoFundacao;
    const elementoAnos = document.getElementById('anos-experiencia');
    if (elementoAnos) {
        elementoAnos.setAttribute('data-target', anosDeExperiencia);
    }

    // --- EFEITO MÁQUINA DE ESCREVER ---
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
        setTimeout(typeSlogan, 1000);
    }

    // --- HEADER MUDA DE COR NO SCROLL ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- ANIMAÇÕES GERAIS DE SCROLL (Fade, Zoom, Slide) ---
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        generalObserver.observe(el);
    });

    // --- LÓGICA CORRIGIDA E DEDICADA PARA OS CONTADORES ---
    const statsCounter = document.querySelector('.stats-counter');
    let countersStarted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                startCounters();
                countersStarted = true;
                observer.unobserve(entry.target); // Para de observar depois de ativar uma vez
            }
        });
    }, { threshold: 0.5 }); // Inicia quando 50% do elemento estiver visível

    if (statsCounter) {
        counterObserver.observe(statsCounter);
    }
    
    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const stepTime = 10;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = new Intl.NumberFormat('pt-BR').format(target);
                }
            };
            updateCounter();
        });
    }

    // --- FORMULÁRIO MULTI-STEP ---
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
    
    // --- BARRA DE PROGRESSO NO SCROLL ---
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    });

    // --- SELETOR DE TEMA (DARK/LIGHT) ---
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
    
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- SCROLL SUAVE PARA ÂNCORAS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- LÓGICA PARA O CARROSSEL DE LOGOS INFINITO ---
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

}); // Fim do document.addEventListener
