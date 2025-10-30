
// CONFIGURACIÓN DE EMAILJS


// Inicializar EmailJS
(function() {
    emailjs.init("uHjvL3tGj5RROJ9qO"); // Public Key de EmailJS
})();


// GESTIÓN DEL CARRITO DE COMPRAS


// Obtener carrito del localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem('carritoSuperCakes');
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carritoSuperCakes', JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    // Esta función se llama desde catalogo.js
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) return;
    
    let carrito = obtenerCarrito();
    
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === idProducto);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1,
            nuevo: producto.nuevo
        });
    }
    
    guardarCarrito(carrito);
    mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito!`);
    actualizarContadorCarrito();
}

// Actualizar cantidad de un producto
function actualizarCantidad(idProducto, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === idProducto);
    
    if (producto) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
        } else {
            producto.cantidad = parseInt(nuevaCantidad);
            guardarCarrito(carrito);
            cargarCarrito();
        }
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito(carrito);
    cargarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}



// ========================================
// INTERFAZ DEL CARRITO
// ========================================

function cargarCarrito() {
    const carrito = obtenerCarrito();
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;
    
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos desde nuestra tienda</p>
                <a href="shop.html" class="btn-shop">Ir a la tienda</a>
            </div>
        `;
        actualizarResumen(0, 0);
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.imagen}" alt="${item.nombre}">
                ${item.nuevo ? '<span class="badge-nuevo">¡Nuevo!</span>' : ''}
            </div>
            <div class="cart-item-details">
                <h3>${item.nombre}</h3>
                <p class="cart-item-price">Q. ${item.precio.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="btn-qty" onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                    <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${item.id}, this.value)">
                    <button class="btn-qty" onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                <p class="item-subtotal">Q. ${itemTotal.toFixed(2)}</p>
                <button class="btn-remove" onclick="eliminarDelCarrito(${item.id})" title="Eliminar producto">
                    <img src="imagenes/basura.png" alt="Eliminar" class="icon-basura">
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const costoEnvio = 10.00;
    const total = subtotal + costoEnvio;
    
    actualizarResumen(subtotal, total);
}

function actualizarResumen(subtotal, total) {
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (summarySubtotal) summarySubtotal.textContent = `Q. ${subtotal.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `Q. ${total.toFixed(2)}`;
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Actualizar badge en el header (si existe)
    let badge = document.getElementById('cart-badge');
    if (!badge && totalItems > 0) {
        // Crear badge si no existe
        const logoElement = document.querySelector('.logo');
        if (logoElement) {
            badge = document.createElement('span');
            badge.id = 'cart-badge';
            badge.className = 'cart-badge';
            logoElement.appendChild(badge);
        }
    }
    
    if (badge) {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ========================================
// FORMULARIO DE CHECKOUT
// ========================================

function toggleNIT() {
    const consumidorFinal = document.getElementById('consumidorFinal');
    const nitGroup = document.getElementById('nitGroup');
    const nitInput = document.getElementById('nit');
    
    if (consumidorFinal.checked) {
        nitGroup.style.display = 'none';
        nitInput.required = false;
        nitInput.value = 'CF';
    } else {
        nitGroup.style.display = 'block';
        nitInput.required = true;
        if (nitInput.value === 'CF') {
            nitInput.value = '';
        }
    }
}

function procesarPedido(event) {
    event.preventDefault();
    
    const carrito = obtenerCarrito();
    
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData);
    
    // Crear objeto de pedido
    const pedido = {
        fecha: new Date().toISOString(),
        cliente: {
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            telefono: datos.telefono,
            telefonoAlt: datos.telefonoAlt || '',
            email: datos.email
        },
        direccion: {
            departamento: datos.departamento,
            ciudad: datos.ciudad,
            zona: datos.zona,
            colonia: datos.colonia,
            direccion: datos.direccion,
            referencia: datos.referencia || ''
        },
        facturacion: {
            consumidorFinal: datos.consumidorFinal === 'on',
            nit: datos.nit
        },
        metodoPago: datos.metodoPago,
        productos: carrito,
        subtotal: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        envio: 10.00,
        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0) + 10.00
    };
    
    console.log('Pedido procesado:', pedido);
    
    // Enviar correo de confirmación
    enviarCorreoConfirmacion(pedido);
}

// ========================================
// ENVÍO DE CORREO DE CONFIRMACIÓN
// ========================================

function enviarCorreoConfirmacion(pedido) {
    // Crear lista de productos para el correo
    let productosLista = '';
    pedido.productos.forEach((item, index) => {
        productosLista += `${index + 1}. ${item.nombre} x${item.cantidad} - Q.${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    // Crear dirección completa
    const direccionCompleta = `${pedido.direccion.direccion}, Zona ${pedido.direccion.zona}\n${pedido.direccion.colonia}, ${pedido.direccion.ciudad}\n${pedido.direccion.departamento}${pedido.direccion.referencia ? '\nReferencia: ' + pedido.direccion.referencia : ''}`;
    
    // Generar número de pedido único
    const numeroPedido = 'SC-' + Date.now();
    
    // Parámetros para el template de EmailJS
    const templateParams = {
        cliente_email: pedido.cliente.email,  // IMPORTANTE: Debe coincidir con el template
        cliente_nombre: pedido.cliente.nombres,
        cliente_apellidos: pedido.cliente.apellidos,
        cliente_telefono: pedido.cliente.telefono,
        fecha_pedido: new Date().toLocaleDateString('es-GT', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        numero_pedido: numeroPedido,
        direccion_completa: direccionCompleta,
        productos_lista: productosLista,
        subtotal: `Q.${pedido.subtotal.toFixed(2)}`,
        envio: `Q.${pedido.envio.toFixed(2)}`,
        total: `Q.${pedido.total.toFixed(2)}`,
        metodo_pago: pedido.metodoPago === 'efectivo' ? 'Efectivo (Contra entrega)' : 'Tarjeta de crédito/débito',
        nit: pedido.facturacion.nit
    };
    
    // LOG PARA DEBUG - Ver qué se está enviando
    console.log('📧 ===== DATOS DEL CORREO =====');
    console.log('Email destino:', pedido.cliente.email);
    console.log('Número de pedido:', numeroPedido);
    console.log('Template Params:', templateParams);
    console.log('==============================');
    
    // Mostrar loading
    mostrarLoading('Procesando tu pedido...');
    
    // Enviar correo al cliente
    emailjs.send('service_ljofpy5', 'template_uud57ll', templateParams)
        .then(function(response) {
            console.log('✅ ===== CORREO ENVIADO EXITOSAMENTE =====');
            console.log('Status:', response.status);
            console.log('Text:', response.text);
            console.log('Response completo:', response);
            console.log('=========================================');
            
            ocultarLoading();
            
            // Mostrar mensaje de éxito SIN redirección automática
            mostrarMensajeExito(numeroPedido);
            
        }, function(error) {
            console.error('❌ ===== ERROR AL ENVIAR CORREO =====');
            console.error('Error completo:', error);
            console.error('Status:', error.status);
            console.error('Text:', error.text);
            console.error('=====================================');
            
            ocultarLoading();
            
            // Mostrar error detallado
            alert('⚠️ Error al enviar el correo:\n\n' + 
                  'Código: ' + error.status + '\n' +
                  'Mensaje: ' + error.text + '\n\n' +
                  'Tu pedido: ' + numeroPedido + '\n\n' +
                  'Revisa la consola (F12) para más detalles.');
        });
}

// Función para enviar copia del pedido a la tienda
function enviarCorreoATienda(pedido, numeroPedido) {
    let productosLista = '';
    pedido.productos.forEach((item, index) => {
        productosLista += `${index + 1}. ${item.nombre} x${item.cantidad} - Q.${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    const direccionCompleta = `${pedido.direccion.direccion}, Zona ${pedido.direccion.zona}\n${pedido.direccion.colonia}, ${pedido.direccion.ciudad}\n${pedido.direccion.departamento}${pedido.direccion.referencia ? '\nReferencia: ' + pedido.direccion.referencia : ''}`;
    
    const templateParamsTienda = {
        cliente_nombre: pedido.cliente.nombres,
        cliente_apellidos: pedido.cliente.apellidos,
        cliente_telefono: pedido.cliente.telefono,
        cliente_email: pedido.cliente.email,
        fecha_pedido: new Date().toLocaleString('es-GT'),
        numero_pedido: numeroPedido,
        direccion_completa: direccionCompleta,
        productos_lista: productosLista,
        subtotal: `Q.${pedido.subtotal.toFixed(2)}`,
        envio: `Q.${pedido.envio.toFixed(2)}`,
        total: `Q.${pedido.total.toFixed(2)}`,
        metodo_pago: pedido.metodoPago === 'efectivo' ? 'Efectivo (Contra entrega)' : 'Tarjeta de crédito/débito',
        nit: pedido.facturacion.nit
    };
    
    // Enviar a la tienda (usa el template de notificación para tienda)
    emailjs.send('service_0zpoqbe', 'template_uud57ll', templateParamsTienda)
        .then(function(response) {
            console.log('Copia enviada a la tienda!', response);
        }, function(error) {
            console.error('Error al enviar copia a tienda:', error);
        });
}


// FUNCIONES DE UI

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

function mostrarMensajeExito(numeroPedido) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-exito';
    mensaje.innerHTML = `
        <div class="mensaje-exito-content">
            <div class="checkmark">✓</div>
            <h2>¡Pedido realizado con éxito!</h2>
            <p>Número de pedido: <strong>${numeroPedido}</strong></p>
            <p>Te hemos enviado un correo de confirmación a tu email.</p>
            <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                <button onclick="irAInicio()" class="btn-ir-inicio">Ir al Inicio</button>
                <button onclick="cerrarMensajeExito()" class="btn-cerrar-mensaje">Cerrar</button>
            </div>
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

function irAInicio() {
    localStorage.removeItem('carritoSuperCakes');
    window.location.href = 'index.html';
}
//Funcion Vaciar Carrito

// ========================================
// MODAL PERSONALIZADO PARA VACIAR CARRITO
// ========================================

function abrirModalVaciarCarrito() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

function cerrarModalVaciarCarrito() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

function confirmarVaciarCarrito() {
    localStorage.removeItem('carritoSuperCakes');
    cargarCarrito();
    actualizarContadorCarrito();
    cerrarModalVaciarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target === modal) {
        cerrarModalVaciarCarrito();
    }
});

    // Función para mostrar notificación
    function mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = 'notification';
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }

    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('confirmModal');
        if (event.target === modal) {
            cerrarModalVaciarCarrito();
        }
    });

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            cerrarModalVaciarCarrito();
        }
    });

function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    // Mostrar y ocultar con animación
    setTimeout(() => notificacion.classList.add('show'), 100);
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}


// INICIALIZACIÓN


document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Cart.js cargado');
    
    // Cargar carrito si estamos en la página del carrito
    if (document.getElementById('cartItems')) {
        cargarCarrito();
    }
    
    // Actualizar contador del carrito en todas las páginas
    actualizarContadorCarrito();
});