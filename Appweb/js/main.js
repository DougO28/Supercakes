// ========================================
// NAVEGACIÓN Y MENÚ MÓVIL
// ========================================

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('show');
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('nav-menu');
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
            }
        });
    });
});

// ========================================
// EFECTOS DE SCROLL EN HEADER
// ========================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// SMOOTH SCROLL PARA ANCLAS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('✓ Main.js cargado correctamente');