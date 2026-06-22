/* 
FUNCIÓN: inicializarCarrito
Se llama una vez cuando carga la página
Lee el carrito guardado en localStorage y lo carga
en el estado global de la app
*/

function inicializarCarrito() {
    const carritoGuardado = leerCarrito();

   
    const carritoLimpio = carritoGuardado.filter(function(item) {
        return item &&
               item.id !== undefined &&
               item.nombre !== undefined &&
               item.precio !== undefined &&
               !isNaN(item.precio) &&
               item.cantidad !== undefined;
    });

    appState.cart = carritoLimpio;

    // Si se descartó algo, guardamos la versión limpia de inmediato
    
    if (carritoLimpio.length !== carritoGuardado.length) {
        guardarCarrito(carritoLimpio);
    }

    actualizarContadorCarrito();
}



/*
FUNCIÓN: agregarAlCarrito
Agrega un producto al carrito o aumenta su cantidad, si ya estaba agregado antes
*/
function agregarAlCarrito(producto) {

    // Primero verificamos que haya stock disponible
    if (producto.stock <= 0) {
        return {
            exito: false,
            mensaje: "Lo sentimos, este producto está agotado."
        };
    }

    // Buscamos si el producto ya está en el carrito
    const posicion = appState.cart.findIndex(function(item) {
        return item.id === producto.id;
    });

    if (posicion !== -1) {
        // EL PRODUCTO YA ESTÁ EN EL CARRITO
        const cantidadActual = appState.cart[posicion].cantidad;

        if (cantidadActual >= producto.stock) {
            return {
                exito: false,
                mensaje: "No puedes agregar más. Solo hay " + producto.stock + " unidades disponibles."
            };
        }

        appState.cart[posicion].cantidad += 1;

    } else {
        // EL PRODUCTO NO ESTÁ EN EL CARRITO
        const itemCarrito = {
            id:       producto.id,
            nombre:   producto.name,
            precio:   producto.price,
            imagen:   producto.image,
            stock:    producto.stock,
            cantidad: 1
        };

        appState.cart.push(itemCarrito);
    }

    guardarCarrito(appState.cart);
    actualizarContadorCarrito();

    return {
        exito: true,
        mensaje: producto.name + " agregado al carrito."
    };
}

// FUNCIÓN: eliminarDelCarrito

function eliminarDelCarrito(idProducto) {
    appState.cart = appState.cart.filter(function(item) {
        return item.id !== idProducto;
    });

    guardarCarrito(appState.cart);
    actualizarContadorCarrito();
}



// FUNCIÓN: cambiarCantidad

function cambiarCantidad(idProducto, nuevaCantidad) {

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }

    const posicion = appState.cart.findIndex(function(item) {
        return item.id === idProducto;
    });

    if (posicion === -1) return;

    const stockDisponible = appState.cart[posicion].stock;

    if (nuevaCantidad > stockDisponible) {
        alert("Solo hay " + stockDisponible + " unidades disponibles.");
        return;
    }

    appState.cart[posicion].cantidad = nuevaCantidad;

    guardarCarrito(appState.cart);
    actualizarContadorCarrito();
}

// FUNCIÓN: calcularSubtotal

function calcularSubtotal(item) {
    return item.precio * item.cantidad;
}



// FUNCIÓN: calcularTotal

function calcularTotal() {
    return appState.cart.reduce(function(acumulador, item) {
        return acumulador + calcularSubtotal(item);
    }, 0);
}


// FUNCIÓN: obtenerCantidadTotal

function obtenerCantidadTotal() {
    return appState.cart.reduce(function(acumulador, item) {
        return acumulador + item.cantidad;
    }, 0);
}


// FUNCIÓN: actualizarContadorCarrito

function actualizarContadorCarrito() {
    const cantidad = obtenerCantidadTotal();
    const contador = document.getElementById("cart-count");

    if (contador) {
        contador.textContent = cantidad;

        if (cantidad > 0) {
            contador.style.display = "flex";
        } else {
            contador.style.display = "none";
        }
    }
}


/*
FUNCIÓN: vaciarCarrito
Elimina todos los productos del carrito
*/

function vaciarCarrito() {
    appState.cart = [];
    borrarCarrito();
    actualizarContadorCarrito();
}



// FUNCIÓN: formatearPrecio

function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}



// FUNCIÓN: carritoEstaVacio

function carritoEstaVacio() {
    return appState.cart.length === 0;
}