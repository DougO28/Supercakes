
// SISTEMA DE MENÚ Y DETALLES DE PRODUCTOS


// Función para mostrar detalles desde las tarjetas de productos
function mostrarDetalle(nombreProducto) {
    // Buscar el producto en el catálogo
    const producto = productos.find(p => p.nombre === nombreProducto);
    
    if (producto) {
        abrirModalProducto(producto);
    } else {
        alert('Has seleccionado: ' + nombreProducto + '\n\n¡Próximamente podrás ver más detalles y realizar pedidos!');
    }
}

// NAVEGACIÓN A DETALLES


function scrollToDetalle(detalleId) {
    // Ocultar todos los detalles
    document.querySelectorAll('.detalle-producto').forEach(detalle => {
        detalle.classList.remove('active');
    });
    
    // Mostrar el detalle seleccionado
    const detalleSeleccionado = document.getElementById(detalleId);
    if (detalleSeleccionado) {
        detalleSeleccionado.classList.add('active');
        
        // Scroll suave hacia el detalle
        setTimeout(() => {
            detalleSeleccionado.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

function volverAlMenu() {
    // Ocultar todos los detalles
    document.querySelectorAll('.detalle-producto').forEach(detalle => {
        detalle.classList.remove('active');
    });
    
    // Scroll al menú
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}


// FUNCIONES DE PEDIDO Y CONTACTO


function realizarPedido(producto, precio) {
    // Redirigir al carrito
    window.location.href = 'cart.html';
}

function contactarWhatsApp(producto, precio) {
    
    // 
    const numeroWhatsApp = '50212345678'; 
    
    const mensaje = `Hola! Estoy interesado en el ${producto} (${precio}). ¿Podrían darme más información?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
}

console.log('✓ Menu.js cargado correctamente');