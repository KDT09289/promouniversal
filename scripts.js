document.addEventListener('DOMContentLoaded', function() {
    // Menú desplegable
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
    menuToggle.addEventListener('click', function() {
        menuItems.classList.toggle('show');
        
        // Cambia el ícono a "X" cuando está abierto
        if (menuItems.classList.contains('show')) {
            menuToggle.textContent = '×';
        } else {
            menuToggle.textContent = '☰';
        }
    });
    
    // Cierra el menú al hacer clic en un enlace
    document.querySelectorAll('.menu-items a').forEach(link => {
        link.addEventListener('click', function() {
            menuItems.classList.remove('show');
            menuToggle.textContent = '☰';
        });
    });
    
    // Smooth scrolling para enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contador simple de visitas (local)
    function updateCounter() {
        let count = localStorage.getItem('visitasLiberate') || 0;
        count++;
        localStorage.setItem('visitasLiberate', count);
        document.getElementById('visitas').textContent = count;
    }
    updateCounter();
});
