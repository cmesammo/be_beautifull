document.addEventListener("DOMContentLoaded", function() {
    iniciarAplicacion();
});



// FUNCIÓN PRINCIPAL


function iniciarAplicacion() {

    // 1. Recuperar sesión guardada (si el usuario ya había iniciado sesión antes)
    const sesionGuardada = leerSesion();
    if (sesionGuardada) {
        appState.currentUser = sesionGuardada;
    }

    // 2. Recuperar carrito guardado desde localStorage
    inicializarCarrito();

    // 3. Mostrar los productos en pantalla
    renderizarProductos(PRODUCTS);

    // 4. Actualizar el header según si hay sesión o no
    actualizarHeaderUsuario();

    // 6. Activar todos los event listeners
    configurarEventosAuth();
    configurarEventosCarrito();
    configurarEventosBusqueda();
    configurarEventosModales();

    console.log("✅ Be Beautiful iniciado correctamente");
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 1: RENDERIZADO DE PRODUCTOS
// ─────────────────────────────────────────────────────────────────

function renderizarProductos(listaProductos) {
    const grid = document.getElementById("products-grid");
    const sinResultados = document.getElementById("sin-resultados");

    grid.innerHTML = "";

    if (listaProductos.length === 0) {
        sinResultados.style.display = "block";
        return;
    }

    sinResultados.style.display = "none";

    listaProductos.forEach(function(producto) {
        const tarjeta = crearTarjetaProducto(producto);
        grid.appendChild(tarjeta);
    });
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 2: AUTENTICACIÓN
// ─────────────────────────────────────────────────────────────────

function configurarEventosAuth() {

    // El botón "Iniciar Sesión" inicial del HTML
    const btnAbrirLogin = document.getElementById("btn-abrir-login");
    if (btnAbrirLogin) {
        btnAbrirLogin.addEventListener("click", function() {
            abrirModal("modal-login");
        });
    }

    document.getElementById("cerrar-login")
        .addEventListener("click", function() {
            cerrarModal("modal-login");
        });

    document.getElementById("cerrar-registro")
        .addEventListener("click", function() {
            cerrarModal("modal-registro");
        });

    document.getElementById("ir-a-registro")
        .addEventListener("click", function() {
            cerrarModal("modal-login");
            abrirModal("modal-registro");
        });

    document.getElementById("ir-a-login")
        .addEventListener("click", function() {
            cerrarModal("modal-registro");
            abrirModal("modal-login");
        });

    document.getElementById("btn-confirmar-login")
        .addEventListener("click", function() {
            manejarLogin();
        });

    document.getElementById("login-password")
        .addEventListener("keypress", function(e) {
            if (e.key === "Enter") manejarLogin();
        });

    document.getElementById("btn-confirmar-registro")
        .addEventListener("click", function() {
            manejarRegistro();
        });
}


function manejarLogin() {
    const email    = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const resultado = iniciarSesion(email, password);

    if (resultado.exito) {
        cerrarModal("modal-login");
        limpiarFormularioLogin();
        actualizarHeaderUsuario();
        mostrarNotificacion(resultado.mensaje, "exito");
    } else {
        mostrarMensajeModal("mensaje-login", resultado.mensaje, "error");
    }
}


function manejarRegistro() {
    const nombre    = document.getElementById("reg-nombre").value;
    const email     = document.getElementById("reg-email").value;
    const password  = document.getElementById("reg-password").value;
    const confirmar = document.getElementById("reg-confirmar").value;

    const resultado = registrarUsuario(nombre, email, password, confirmar);

    if (resultado.exito) {
        iniciarSesion(email, password);
        cerrarModal("modal-registro");
        limpiarFormularioRegistro();
        actualizarHeaderUsuario();
        mostrarNotificacion(resultado.mensaje, "exito");
    } else {
        mostrarMensajeModal("mensaje-registro", resultado.mensaje, "error");
    }
}


function actualizarHeaderUsuario() {
    const seccionAuth = document.getElementById("auth-section");
    const usuario = obtenerUsuarioActual();

    if (usuario) {
        seccionAuth.innerHTML =
            '<div class="usuario-header">' +
                '<span class="usuario-nombre">Hola, ' + usuario.nombre + '</span>' +
                '<button class="btn-logout" id="btn-logout">Salir</button>' +
            '</div>';

        document.getElementById("btn-logout")
            .addEventListener("click", function() {
                cerrarSesion();
                actualizarHeaderUsuario();
                mostrarNotificacion("Sesión cerrada. ¡Hasta pronto!", "exito");
            });

    } else {
        seccionAuth.innerHTML =
            '<button class="btn-login" id="btn-abrir-login">Iniciar Sesión</button>';

        document.getElementById("btn-abrir-login")
            .addEventListener("click", function() {
                abrirModal("modal-login");
            });
    }
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 3: CARRITO
// ─────────────────────────────────────────────────────────────────

function configurarEventosCarrito() {

    document.getElementById("btn-abrir-carrito")
        .addEventListener("click", function() {
            abrirPanelCarrito();
        });

    document.getElementById("cerrar-carrito")
        .addEventListener("click", function() {
            cerrarPanelCarrito();
        });

    document.getElementById("carrito-overlay")
        .addEventListener("click", function() {
            cerrarPanelCarrito();
        });

    document.getElementById("btn-confirmar-pedido")
        .addEventListener("click", function() {
            manejarConfirmarPedido();
        });

    document.getElementById("btn-cerrar-confirmacion")
        .addEventListener("click", function() {
            cerrarModal("modal-confirmacion");
        });
}


function abrirPanelCarrito() {
    renderizarPanelCarrito();
    document.getElementById("carrito-overlay").style.display = "block";
    document.getElementById("carrito-panel").classList.add("abierto");
}


function cerrarPanelCarrito() {
    document.getElementById("carrito-overlay").style.display = "none";
    document.getElementById("carrito-panel").classList.remove("abierto");
}


function renderizarPanelCarrito() {
    const contenedor = document.getElementById("carrito-items");
    const footer     = document.getElementById("carrito-footer");
    const vacio      = document.getElementById("carrito-vacio");

    // Limpiamos TODO el contenedor antes de volver a dibujarlo.
    
    contenedor.innerHTML = "";

    if (carritoEstaVacio()) {
        vacio.style.display  = "block";
        footer.style.display = "none";
        return;
    }

    vacio.style.display  = "none";
    footer.style.display = "block";

    appState.cart.forEach(function(item) {
        const div = document.createElement("div");
        div.className = "carrito-item";
        div.innerHTML =
            '<img src="' + item.imagen + '" alt="' + item.nombre + '">' +
            '<div class="carrito-item-info">' +
                '<p class="carrito-item-nombre">' + item.nombre + '</p>' +
                '<p class="carrito-item-precio">' + formatearPrecio(calcularSubtotal(item)) + '</p>' +
            '</div>' +
            '<div class="carrito-item-controles">' +
                '<button class="btn-cantidad" data-id="' + item.id + '" data-accion="restar">−</button>' +
                '<span class="cantidad-numero">' + item.cantidad + '</span>' +
                '<button class="btn-cantidad" data-id="' + item.id + '" data-accion="sumar">+</button>' +
            '</div>' +
            '<button class="btn-eliminar-item" data-id="' + item.id + '">🗑</button>';

        contenedor.appendChild(div);
    });

    document.getElementById("carrito-total-precio").textContent =
        formatearPrecio(calcularTotal());

  
    // activarBotonesCarrito() se llama UNA SOLA VEZ después de construir los elementos
    activarBotonesCarrito();
}


function activarBotonesCarrito() {

    // Botones de cantidad + y -
    document.querySelectorAll(".btn-cantidad").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const id     = btn.getAttribute("data-id");
            const accion = btn.getAttribute("data-accion");

            const item = appState.cart.find(function(i) { return i.id === id; });
            if (!item) return;

            if (accion === "sumar") {
                cambiarCantidad(id, item.cantidad + 1);
            } else {
                cambiarCantidad(id, item.cantidad - 1);
            }

            // Redibujamos el carrito con los valores actualizados
            renderizarPanelCarrito();
        });
    });

    // Botones eliminar 🗑
    document.querySelectorAll(".btn-eliminar-item").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const id = btn.getAttribute("data-id");
            eliminarDelCarrito(id);
            renderizarPanelCarrito();
        });
    });
}


function manejarConfirmarPedido() {

    if (!hayUsuarioActivo()) {
        cerrarPanelCarrito();
        mostrarNotificacion("Debes iniciar sesión para confirmar tu pedido", "error");
        setTimeout(function() {
            abrirModal("modal-login");
        }, 800);
        return;
    }

    if (carritoEstaVacio()) {
        mostrarNotificacion("Tu carrito está vacío", "error");
        return;
    }

    const usuario = obtenerUsuarioActual();
    let resumenHTML =
        '<p><strong>Cliente:</strong> ' + usuario.nombre + '</p>' +
        '<p><strong>Productos:</strong></p>';

    appState.cart.forEach(function(item) {
        resumenHTML +=
            '<p>• ' + item.nombre +
            ' × ' + item.cantidad +
            ' = ' + formatearPrecio(calcularSubtotal(item)) + '</p>';
    });

    resumenHTML +=
        '<hr style="margin:10px 0; border-color:#EAE5DC;">' +
        '<p><strong>Total: ' + formatearPrecio(calcularTotal()) + '</strong></p>' +
        '<p><em>Envío incluido.</em></p>';
        
    document.getElementById("resumen-pedido").innerHTML = resumenHTML;

    vaciarCarrito();
    cerrarPanelCarrito();
    abrirModal("modal-confirmacion");
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 4: BÚSQUEDA Y FILTROS
// ─────────────────────────────────────────────────────────────────

function configurarEventosBusqueda() {

    document.getElementById("search-input")
        .addEventListener("input", function() {
            aplicarFiltros();
        });

    document.querySelectorAll(".filter-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {

            document.querySelectorAll(".filter-btn").forEach(function(b) {
                b.classList.remove("active");
            });

            btn.classList.add("active");

           
            appState.activeCategory = btn.getAttribute("data-categoria");

            aplicarFiltros();
        });
    });

    document.getElementById("btn-busqueda-avanzada")
        .addEventListener("click", function() {
            const panel = document.getElementById("busqueda-avanzada");
            panel.classList.toggle("visible");
        });

    document.getElementById("btn-aplicar-filtros")
        .addEventListener("click", function() {
            aplicarFiltros();
        });

    document.getElementById("btn-limpiar-filtros")
        .addEventListener("click", function() {
            document.getElementById("precio-min").value = "";
            document.getElementById("precio-max").value = "";
            document.getElementById("solo-disponibles").checked = false;

           

            appState.activeCategory = "Todos";

           
            document.querySelectorAll(".filter-btn").forEach(function(b) {
                b.classList.remove("active");
            });
            document.querySelector(".filter-btn[data-categoria='Todos']")
                .classList.add("active");

            aplicarFiltros();
        });
}


function aplicarFiltros() {

    const textoBusqueda   = document.getElementById("search-input").value;
    const precioMin       = document.getElementById("precio-min").value;
    const precioMax       = document.getElementById("precio-max").value;
    const soloDisponibles = document.getElementById("solo-disponibles").checked;

    const categoria = appState.activeCategory || "Todos";

    const resultados = busquedaAvanzada(
        PRODUCTS,
        textoBusqueda,
        categoria,
        precioMin ? Number(precioMin) : null,
        precioMax ? Number(precioMax) : null,
        soloDisponibles
    );

    renderizarProductos(resultados);
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 5: MODAL DETALLE DE PRODUCTO
// ─────────────────────────────────────────────────────────────────

function configurarEventosModales() {

    document.getElementById("cerrar-producto")
        .addEventListener("click", function() {
            cerrarModal("modal-producto");
        });

    document.getElementById("btn-abrir-team")
        .addEventListener("click", function() {
            abrirModal("modal-team");
        });

    document.getElementById("cerrar-team")
        .addEventListener("click", function() {
            cerrarModal("modal-team");
        });

    // Cerrar modales al hacer clic en el fondo oscuro
    document.querySelectorAll(".modal-overlay").forEach(function(overlay) {
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                overlay.classList.remove("activo");
            }
        });
    });
}


function abrirDetalleProducto(idProducto) {

    const producto = PRODUCTS.find(function(p) {
        return p.id === idProducto;
    });

    if (!producto) return;

    document.getElementById("detalle-imagen").src             = producto.image;
    document.getElementById("detalle-imagen").alt             = producto.name;
    document.getElementById("detalle-nombre").textContent     = producto.name;
    document.getElementById("detalle-categoria").textContent  = producto.category;
    document.getElementById("detalle-descripcion").textContent = producto.description;
    document.getElementById("detalle-precio").textContent     = formatearPrecio(producto.price);

    const stockTexto = document.getElementById("detalle-stock-texto");
    if (producto.stock === 0) {
        stockTexto.textContent = "Agotado";
        stockTexto.className   = "stock-agotado";
    } else if (producto.stock <= 5) {
        stockTexto.textContent = "¡Últimas " + producto.stock + " unidades!";
        stockTexto.className   = "stock-bajo";
    } else {
        stockTexto.textContent = "Disponible (" + producto.stock + " en stock)";
        stockTexto.className   = "stock-ok";
    }

    const btnAgregar = document.getElementById("btn-detalle-agregar");
    btnAgregar.onclick = function() {
        const resultado = agregarAlCarrito(producto);
        mostrarNotificacion(resultado.mensaje, resultado.exito ? "exito" : "error");
        if (resultado.exito) cerrarModal("modal-producto");
    };

    abrirModal("modal-producto");
}


// ─────────────────────────────────────────────────────────────────
// SECCIÓN 6: UTILIDADES
// ─────────────────────────────────────────────────────────────────

function abrirModal(idModal) {
    document.getElementById(idModal).classList.add("activo");
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove("activo");
}

function mostrarMensajeModal(idElemento, texto, tipo) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = texto;
    elemento.className   = "modal-mensaje " + tipo;
    elemento.style.display = "block";
}

function mostrarNotificacion(texto, tipo) {

    const anterior = document.getElementById("notificacion-flotante");
    if (anterior) anterior.remove();

    const notif = document.createElement("div");
    notif.id          = "notificacion-flotante";
    notif.textContent = texto;
    notif.style.background = tipo === "exito" ? "#D1FAE5" : "#FEE2E2";
    notif.style.color      = tipo === "exito" ? "#065F46" : "#B91C1C";
    notif.style.border     = tipo === "exito"
        ? "1px solid #A7F3D0"
        : "1px solid #FECACA";

    document.body.appendChild(notif);

    setTimeout(function() {
        notif.style.opacity = "0";
        setTimeout(function() { notif.remove(); }, 400);
    }, 3000);
}

function limpiarFormularioLogin() {
    document.getElementById("login-email").value    = "";
    document.getElementById("login-password").value = "";
    document.getElementById("mensaje-login").style.display = "none";
}

function limpiarFormularioRegistro() {
    document.getElementById("reg-nombre").value    = "";
    document.getElementById("reg-email").value     = "";
    document.getElementById("reg-password").value  = "";
    document.getElementById("reg-confirmar").value = "";
    document.getElementById("mensaje-registro").style.display = "none";
}