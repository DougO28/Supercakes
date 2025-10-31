
// CARRUSEL PRINCIPAL (Sección Productos)


let currentSlide = 0;
let carouselInterval;

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    
    if (!track) {
        console.warn('No se encontró el carrusel principal');
        return;
    }
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) {
        console.warn('No hay slides en el carrusel');
        return;
    }
    
    // Crear indicadores
    const indicatorsContainer = document.getElementById('indicators');
    if (indicatorsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.onclick = () => goToSlide(i);
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Iniciar auto-avance
    carouselInterval = setInterval(nextSlide, 5000);
    
    // Pausar en hover
    track.parentElement.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    track.parentElement.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
    
    console.log('✓ Carousel.js cargado correctamente');
});

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar indicadores
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const totalSlides = track.querySelectorAll('.carousel-slide').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    const totalSlides = track.querySelectorAll('.carousel-slide').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}


// CARRUSEL DE DETALLE Para personalizados


let currentSlideDetalle = 0;

function updateCarouselDetalle() {
    const trackDetalle = document.getElementById('detalleCarousel');
    if (!trackDetalle) return;
    
    trackDetalle.style.transform = `translateX(-${currentSlideDetalle * 100}%)`;
}

function nextSlideDetalle() {
    const trackDetalle = document.getElementById('detalleCarousel');
    if (!trackDetalle) return;
    
    const totalSlidesDetalle = trackDetalle.querySelectorAll('.carousel-slide').length;
    currentSlideDetalle = (currentSlideDetalle + 1) % totalSlidesDetalle;
    updateCarouselDetalle();
}

function prevSlideDetalle() {
    const trackDetalle = document.getElementById('detalleCarousel');
    if (!trackDetalle) return;
    
    const totalSlidesDetalle = trackDetalle.querySelectorAll('.carousel-slide').length;
    currentSlideDetalle = (currentSlideDetalle - 1 + totalSlidesDetalle) % totalSlidesDetalle;
    updateCarouselDetalle();
}