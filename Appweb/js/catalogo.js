
// BASE DE DATOS DE PRODUCTOS


const productos = [
    {
        id: 1,
        nombre: "Pastel de Zanahoria",
        categoria: "pasteles",
        precio: 125.00,
        imagen: "imagenes/Pastel_Zanahoria.png",
        descripcion: "Delicioso pastel de zanahoria con especias y nueces, cubierto con frosting de queso crema.",
        caracteristicas: [
            "Hecho con zanahorias frescas",
            "Frosting de queso crema",
            "Decorado con nueces",
            "8-10 porciones"
        ],
        nuevo: false
    },
    {
        id: 2,
        nombre: "Pastel de Banano",
        categoria: "pasteles",
        precio: 115.00,
        imagen: "imagenes/Pan_Banano.png",
        descripcion: "Suave y esponjoso pastel de banano con toques de canela y cobertura de caramelo.",
        caracteristicas: [
            "Bananos maduros naturales",
            "Cobertura de caramelo",
            "Toque de canela",
            "6-8 porciones"
        ],
        nuevo: false
    },
    {
        id: 3,
        nombre: "Pastel Pirata Personalizado",
        categoria: "personalizados",
        precio: 350.00,
        imagen: "imagenes/Pirata.jpg",
        descripcion: "Aventura en alta mar con este increíble pastel temático de piratas, perfecto para cumpleaños.",
        caracteristicas: [
            "Diseño 100% personalizado",
            "Fondant de alta calidad",
            "Figuras comestibles",
            "12-15 porciones"
        ],
        nuevo: true
    },
    {
        id: 4,
        nombre: "Pastel de Dinosaurio",
        categoria: "personalizados",
        precio: 380.00,
        imagen: "imagenes/Dinosaurio.jpg",
        descripcion: "¡Viaja a la era jurásica! Pastel con decoración de dinosaurios en 3D.",
        caracteristicas: [
            "Dinosaurios en 3D",
            "Decoración volcánica",
            "Sabores a elección",
            "15-18 porciones"
        ],
        nuevo: true
    },
    {
        id: 5,
        nombre: "Pastel Garfield",
        categoria: "personalizados",
        precio: 420.00,
        imagen: "imagenes/Gato.jpg",
        descripcion: "El gato más famoso en un pastel espectacular. Ideal para amantes de Garfield.",
        caracteristicas: [
            "Figura de Garfield en 3D",
            "Colores vibrantes",
            "Detalles perfectos",
            "12-15 porciones"
        ],
        nuevo: false
    },
    {
        id: 6,
        nombre: "Pastel de Dentista",
        categoria: "personalizados",
        precio: 390.00,
        imagen: "imagenes/Dentista.jpg",
        descripcion: "Pastel temático perfecto para celebrar la graduación o logros de un dentista.",
        caracteristicas: [
            "Temática profesional",
            "Herramientas comestibles",
            "Diseño elegante",
            "10-12 porciones"
        ],
        nuevo: false
    },
    {
        id: 7,
        nombre: "Pastel Jorge el Curioso",
        categoria: "personalizados",
        precio: 400.00,
        imagen: "imagenes/JorgeElMono.jpg",
        descripcion: "El mono más curioso en un pastel lleno de color y diversión para los más pequeños.",
        caracteristicas: [
            "Personaje en 3D",
            "Colores brillantes",
            "Escenario incluido",
            "15-18 porciones"
        ],
        nuevo: true
    },
    {
        id: 8,
        nombre: "Cupcakes Variados",
        categoria: "cupcakes",
        precio: 85.00,
        imagen: "imagenes/cupcakes.png",
        descripcion: "Set de 12 cupcakes con diferentes sabores y decoraciones elegantes.",
        caracteristicas: [
            "12 cupcakes",
            "4 sabores diferentes",
            "Decoración artesanal",
            "Empaque especial"
        ],
        nuevo: false
    },
    
    {
        id: 10,
        nombre: "Pastel Red Velvet",
        categoria: "pasteles",
        precio: 145.00,
        imagen: "imagenes/Red.png",
        descripcion: "Clásico pastel red velvet con frosting de queso crema y decoración elegante.",
        caracteristicas: [
            "Terciopelo rojo auténtico",
            "Cream cheese frosting",
            "Decoración premium",
            "10-12 porciones"
        ],
        nuevo: true
    }
];


// CARGAR PRODUCTOS AL CATÁLOGO


function cargarCatalogo(productosFiltrados = productos) {
    const catalogoGrid = document.getElementById('catalogoGrid');
    
    if (!catalogoGrid) {
        console.error('No se encontró el elemento catalogoGrid');
        return;
    }
    
    catalogoGrid.innerHTML = '';
    
    // Actualizar contador de resultados
    actualizarContador(productosFiltrados.length);
    
    if (productosFiltrados.length === 0) {
        catalogoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 style="color: var(--color-gray); font-size: 1.5rem;">
                    No se encontraron productos con los filtros seleccionados
                </h3>
                <button onclick="limpiarFiltros()" style="margin-top: 1rem; padding: 0.8rem 2rem; background: var(--gradient-primary); color: white; border: none; border-radius: 50px; cursor: pointer; font-size: 1rem;">
                    Limpiar filtros
                </button>
            </div>
        `;
        return;
    }
    
    productosFiltrados.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'catalogo-item';
        item.onclick = () => abrirModalProducto(producto);
        
        item.innerHTML = `
            <div class="catalogo-item-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                ${producto.nuevo ? '<span class="catalogo-badge">¡Nuevo!</span>' : ''}
            </div>
            <div class="catalogo-item-info">
                <div class="catalogo-item-category">${obtenerNombreCategoria(producto.categoria)}</div>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion.substring(0, 80)}...</p>
                <div class="catalogo-item-footer">
                    <div class="catalogo-precio">Q. ${producto.precio.toFixed(2)}</div>
                    <button class="btn-add-cart" onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">
                        Agregar
                    </button>
                </div>
            </div>
        `;
        
        catalogoGrid.appendChild(item);
    });
    
    console.log(`✓ ${productosFiltrados.length} productos cargados en el catálogo`);
}


// FILTRADO Y ORDENAMIENTO


function filtrarProductos() {
    const searchInput = document.getElementById('searchInput');
    const categoriaFilter = document.getElementById('categoriaFilter');
    const precioFilter = document.getElementById('precioFilter');
    const ordenFilter = document.getElementById('ordenFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const categoriaSeleccionada = categoriaFilter ? categoriaFilter.value : 'todos';
    const precioSeleccionado = precioFilter ? precioFilter.value : 'todos';
    
    let productosFiltrados = [...productos];
    
    // Filtrar por búsqueda
    if (searchTerm) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm) ||
            producto.descripcion.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filtrar por categoría
    if (categoriaSeleccionada !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria === categoriaSeleccionada
        );
    }
    
    // Filtrar por precio
    if (precioSeleccionado !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => {
            const precio = producto.precio;
            switch(precioSeleccionado) {
                case '0-100':
                    return precio <= 100;
                case '100-200':
                    return precio > 100 && precio <= 200;
                case '200-500':
                    return precio > 200 && precio <= 500;
                case '500+':
                    return precio > 500;
                default:
                    return true;
            }
        });
    }
    
    // Aplicar ordenamiento si existe el selector
    if (ordenFilter && ordenFilter.value !== 'default') {
        productosFiltrados = ordenarArray(productosFiltrados, ordenFilter.value);
    }
    
    cargarCatalogo(productosFiltrados);
}

function ordenarProductos() {
    filtrarProductos();
}

function ordenarArray(array, criterio) {
    const arrayOrdenado = [...array];
    
    switch(criterio) {
        case 'nombre-asc':
            return arrayOrdenado.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case 'nombre-desc':
            return arrayOrdenado.sort((a, b) => b.nombre.localeCompare(a.nombre));
        case 'precio-asc':
            return arrayOrdenado.sort((a, b) => a.precio - b.precio);
        case 'precio-desc':
            return arrayOrdenado.sort((a, b) => b.precio - a.precio);
        case 'nuevos':
            return arrayOrdenado.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0));
        default:
            return arrayOrdenado;
    }
}

function limpiarFiltros() {
    const searchInput = document.getElementById('searchInput');
    const categoriaFilter = document.getElementById('categoriaFilter');
    const precioFilter = document.getElementById('precioFilter');
    const ordenFilter = document.getElementById('ordenFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoriaFilter) categoriaFilter.value = 'todos';
    if (precioFilter) precioFilter.value = 'todos';
    if (ordenFilter) ordenFilter.value = 'default';
    
    cargarCatalogo();
}

function actualizarContador(cantidad) {
    const contadorElement = document.getElementById('resultadosCount');
    if (contadorElement) {
        contadorElement.innerHTML = `Mostrando <strong>${cantidad}</strong> producto${cantidad !== 1 ? 's' : ''}`;
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// MODAL DE PRODUCTO


function abrirModalProducto(producto) {
    let modal = document.getElementById('productModal');
    
    if (!modal) {
        crearModal();
        modal = document.getElementById('productModal');
    }
    
    if (!modal) {
        console.error('No se pudo crear el modal');
        return;
    }
    
    document.getElementById('modalTitle').textContent = producto.nombre;
    document.getElementById('modalImage').src = producto.imagen;
    document.getElementById('modalImage').alt = producto.nombre;
    document.getElementById('modalDescription').textContent = producto.descripcion;
    document.getElementById('modalPrice').textContent = `Q. ${producto.precio.toFixed(2)}`;
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    producto.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.textContent = caracteristica;
        featuresList.appendChild(li);
    });
    
    // Actualizar botones con información del producto
    const btnOrder = document.querySelector('.btn-order');
    const btnContact = document.querySelector('.btn-contact');
    
    if (btnOrder) {
    btnOrder.onclick = () => {
        // Primero agregar al carrito
        agregarAlCarrito(producto.id);
        // Cerrar modal
        cerrarModal();
        // Redirigir
        window.location.href = 'cart.html';
    };
}

if (btnContact) {
    btnContact.onclick = () => contactarWhatsApp(producto.nombre, `Q. ${producto.precio.toFixed(2)}`);
}
}
function cerrarModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function crearModal() {
    if (document.getElementById('productModal')) return;
    
    const modalHTML = `
        <div id="productModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Detalles del Producto</h2>
                    <button class="close-modal" onclick="cerrarModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-product-grid">
                        <div class="modal-image-container">
                            <img id="modalImage" src="" alt="">
                        </div>
                        <div class="modal-info">
                            <h3>Descripción</h3>
                            <p class="modal-description" id="modalDescription"></p>
                            <div class="modal-price" id="modalPrice"></div>
                            <div class="modal-features">
                                <h4>Características:</h4>
                                <ul id="modalFeatures"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
    <button class="btn-order" onclick="realizarPedido()">
        <img src="imagenes/carritocompras.png" alt="Carrito" class="icon-carrito"> Realizar Pedido
    </button>
    <button class="btn-contact" onclick="contactarWhatsApp()">Contactar por WhatsApp</button>
</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}


// FUNCIONES DE PEDIDO


// Funcion agregar al carrito
function agregarAlCarrito(idProducto) {
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
    
    // Redirigir al carrito
    window.location.href = 'cart.html';
}

// Agregar estas funciones si no existen
function obtenerCarrito() {
    const carrito = localStorage.getItem('carritoSuperCakes');
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carritoSuperCakes', JSON.stringify(carrito));
}

function realizarPedido(producto, precio) {
    alert(`¡Gracias por tu interés en ${producto}!\n\nPrecio: ${precio}\n\nPróximamente podrás completar tu pedido en línea.\n\nPor ahora, puedes contactarnos por WhatsApp para realizar tu orden.`);
}

function contactarWhatsApp(producto, precio) {
    
    const numeroWhatsApp = '50212345678'; // Reemplazar
    
    const mensaje = `Hola! Estoy interesado en el ${producto} (${precio}). ¿Podrían darme más información?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
}


// UTILIDADES


function obtenerNombreCategoria(categoria) {
    const categorias = {
        'pasteles': 'Pasteles',
        'cupcakes': 'Cupcakes',
        'personalizados': 'Personalizados',
        'bebidas': 'Bebidas'
    };
    
    return categorias[categoria] || categoria;
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        cerrarModal();
    }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});


// INICIALIZACIÓN


document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Catalogo.js iniciando...');
    console.log(`✓ ${productos.length} productos en la base de datos`);
    
    // Cargar catálogo completo al inicio
    cargarCatalogo();
    
    // Crear modal si no existe
    crearModal();
    
    console.log('✓ Catalogo.js cargado correctamente');
});