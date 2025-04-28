// Menú desplegable para móviles
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
    menuToggle.addEventListener('click', function() {
        menuItems.classList.toggle('show');
    });
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuItems.classList.remove('show');
            }
        });
    });
    
    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Contador simple (usando localStorage)
function updateCounter() {
    // Si ya existe un contador, lo lee; si no, empieza en 0.
    let count = localStorage.getItem('paginaVisitas') || 0;
    
    // Incrementa el contador +1
    count++;
    
    // Guarda el nuevo valor
    localStorage.setItem('paginaVisitas', count);
    
    // Muestra el número en la página
    document.getElementById('visitas').textContent = count;
}

// Ejecuta la función cuando la página cargue
updateCounter();
