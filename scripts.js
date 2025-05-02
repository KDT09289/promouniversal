document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.floating-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    const scrollStep = 200;

    // Abrir/cerrar menú
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
        updateScrollButtons();
    });

    // Botones de scroll
    scrollUpBtn.addEventListener('click', () => {
        menuContainer.scrollBy({ top: -scrollStep, behavior: 'smooth' });
    });

    scrollDownBtn.addEventListener('click', () => {
        menuContainer.scrollBy({ top: scrollStep, behavior: 'smooth' });
    });

    // Actualizar visibilidad de botones
    function updateScrollButtons() {
        const hasScroll = menuContainer.scrollHeight > menuContainer.clientHeight;
        document.querySelector('.menu-scroll-buttons').style.display = 
            hasScroll && menu.classList.contains('show') ? 'flex' : 'none';
    }

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.menu-items a').forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    });

    // Smooth scrolling para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
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
        document.getElementById('visitas').textContent = count;
    }
    updateCounter();

    // Inicializar
    window.addEventListener('resize', updateScrollButtons);
}); 
