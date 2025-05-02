document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Configuración del Menú Desplegable
    // =============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const menuContainer = document.querySelector('.menu-container');
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');

    // Variables de desplazamiento
    const scrollStep = 200; // Pixeles a desplazar por clic (ajustable)
    let isMenuOpen = false;

    // =============================================
    // Funciones principales
    // =============================================

    // Alternar menú (abrir/cerrar)
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuItems.classList.toggle('show');
        menuToggle.textContent = isMenuOpen ? '×' : '☰';
        
        // Mostrar/ocultar botones solo si el menú está abierto
        if (isMenuOpen) {
            checkScrollButtons();
        } else {
            scrollUpBtn.style.visibility = 'hidden';
            scrollDownBtn.style.visibility = 'hidden';
        }
    }

    // Verificar estado de los botones de scroll
    function checkScrollButtons() {
        const hasScroll = menuContainer.scrollHeight > menuContainer.clientHeight;
        const atTop = menuContainer.scrollTop === 0;
        const atBottom = 
            Math.ceil(menuContainer.scrollTop + menuContainer.clientHeight) >= 
            menuContainer.scrollHeight;

        scrollUpBtn.style.visibility = hasScroll && !atTop ? 'visible' : 'hidden';
        scrollDownBtn.style.visibility = hasScroll && !atBottom ? 'visible' : 'hidden';
    }

    // =============================================
    // Event Listeners
    // =============================================

    // Botón de menú hamburguesa
    menuToggle.addEventListener('click', toggleMenu);

    // Botones de desplazamiento
    scrollUpBtn.addEventListener('click', () => {
        menuContainer.scrollBy({ top: -scrollStep, behavior: 'smooth' });
    });

    scrollDownBtn.addEventListener('click', () => {
        menuContainer.scrollBy({ top: scrollStep, behavior: 'smooth' });
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.menu-items a').forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Detectar scroll en el menú
    menuContainer.addEventListener('scroll', checkScrollButtons);

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contador de visitas
    function updateCounter() {
        let count = localStorage.getItem('visitasLiberate') || 0;
        count++;
        localStorage.setItem('visitasLiberate', count);
        const visitasElement = document.getElementById('visitas');
        if (visitasElement) visitasElement.textContent = count;
    }
    updateCounter();

    // Inicialización al cargar
    window.addEventListener('load', function() {
        // Ocultar botones si no hay overflow
        if (menuContainer.scrollHeight <= menuContainer.clientHeight) {
            document.querySelector('.menu-scroll-buttons').style.display = 'none';
        }
        
        // Forzar verificación inicial
        checkScrollButtons();
    });
});
