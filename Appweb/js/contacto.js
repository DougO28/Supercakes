// ========================================
// FORMULARIO DE CONTACTO
// ========================================

function enviarContacto(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData);
    
    console.log('📧 Datos del formulario:', datos);
    
    // Preparar parámetros para EmailJS
    const templateParams = {
        from_name: datos.nombre,
        from_email: datos.email,
        from_phone: datos.telefono,
        tipo_consulta: datos.tipoConsulta,
        message: datos.mensaje
    };
    
    // Mostrar loading
    mostrarLoading('Enviando tu mensaje...');
    
    // ⚠️ REEMPLAZA ESTOS DOS IDs CON LOS TUYOS:
    // 'TU_SERVICE_ID' → El mismo Service ID que usas en cart.js (ejemplo: service_abc1234)
    // 'TU_TEMPLATE_CONTACTO_ID' → El Template ID del nuevo template de contacto (ejemplo: template_contacto_xyz789)
    
    emailjs.send('service_l05fpxm', 'template_4wmaazc', templateParams)
        .then(function(response) {
            console.log('✅ Mensaje enviado!', response);
            ocultarLoading();
            mostrarExito();
            
            // Limpiar formulario
            document.getElementById('contactForm').reset();
            
        }, function(error) {
            console.error('❌ Error:', error);
            ocultarLoading();
            alert('⚠️ Hubo un error al enviar tu mensaje. Por favor, intenta contactarnos por teléfono o email directamente.');
        });
}

// ========================================
// FUNCIONES DE UI
// ========================================

function mostrarLoading(mensaje) {
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>${mensaje}</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function ocultarLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

function mostrarExito() {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.innerHTML = `
        <div class="mensaje-exito-content">
            <div class="checkmark">✓</div>
            <h2>¡Mensaje enviado con éxito!</h2>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <button onclick="cerrarMensajeExito()" class="btn-cerrar-mensaje">Cerrar</button>
        </div>
    `;
    document.body.appendChild(mensaje);
}

function cerrarMensajeExito() {
    const mensaje = document.querySelector('.mensaje-exito');
    if (mensaje) {
        mensaje.remove();
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Contacto.js cargado');
    
    // ⚠️ REEMPLAZA 'TU_PUBLIC_KEY' CON TU PUBLIC KEY REAL
    // Es el mismo que usas en cart.js (ejemplo: user_A1b2C3d4E5f6G7h8)
    emailjs.init("uHjvL3tGj5RROJ9qO");
});