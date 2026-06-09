/* 
   FUNCIÓN: formatearPrecio
   Convierte el número 38000 en el texto "$38.000"
 */
function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-CO");
}
 
 
/* 
   FUNCIÓN: obtenerEstadoStock
   Según las unidades disponibles, devuelve el texto
   y la clase CSS para mostrar el stock con color.
 
   - 0 unidades  → rojo    (agotado)
   - 1 a 5       → naranja (pocas unidades)
   - 6 o más     → verde   (disponible)
 */
function obtenerEstadoStock(stock) {
    if (stock === 0) {
        return { texto: "Agotado",                       clase: "stock-agotado" };
    }
    if (stock <= 5) {
        return { texto: "Últimas " + stock + " unidades", clase: "stock-poco"    };
    }
    return     { texto: "En stock (" + stock + ")",       clase: "stock-ok"      };
}
 
 
/* 
   FUNCIÓN: crearEtiquetasFeatures
   Convierte el array features en etiquetas HTML pequeñas.
 
*/
function crearEtiquetasFeatures(features) {
    return (features || [])
        .map(function(feature) {
            return '<span class="feature-tag">' + feature + '</span>';
        })
        .join("");
}
 
 
/* 
   FUNCIÓN: crearTarjetaHTML
   Recibe UN producto y devuelve su tarjeta HTML completa
   como texto (string).
 
 */
function crearTarjetaHTML(product) {
    const estadoStock = obtenerEstadoStock(product.stock);
    const precio      = formatearPrecio(product.price);
    const agotado     = product.stock === 0;
    const features    = crearEtiquetasFeatures(product.features);
    const marca       = product.brand || "";
 
    return `
        <article class="product-card" data-id="${product.id}">
 
            <!-- IMAGEN: clic abre el detalle del producto -->
            <div class="product-image-wrap"
                 onclick="abrirDetalleProducto('${product.id}')">
 
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                    onerror="this.src='assets/images/placeholder.jpg'"
                >
 
                <div class="product-overlay">
                    <span>Ver detalle</span>
                </div>
 
            </div>
 
            <!-- INFORMACIÓN DEL PRODUCTO -->
            <div class="product-info">
 
                <p class="product-category">${product.category}</p>
 
                <h3 class="product-name">${product.name}</h3>
 
                ${marca ? `<p class="product-brand">${marca}</p>` : ""}
 
                <p class="product-price">${precio}</p>
 
                <p class="product-stock ${estadoStock.clase}">
                    ${estadoStock.texto}
                </p>
 
                <div class="product-features">
                    ${features}
                </div>
 
                <button
                    class="btn-agregar-carrito"
                    data-id="${product.id}"
                    onclick="agregarAlCarrito('${product.id}', 1)"
                    ${agotado ? "disabled" : ""}
                >
                    ${agotado ? "Agotado" : "Añadir al carrito"}
                </button>
 
            </div>
 
        </article>
    `;
}
 
 
/* 
   FUNCIÓN: renderProducts
   Pinta una lista de productos en el contenedor del HTML.
 
*/
function renderProducts(products, containerId) {
 
    const container = document.getElementById(containerId);
 
    if (!container) {
        console.error("productRenderer: No existe el contenedor #" + containerId);
        return;
    }
 
    if (products.length === 0) {
        container.innerHTML = `
            <div class="sin-resultados">
                <p class="sin-resultados-emoji">🔍</p>
                <p class="sin-resultados-texto">
                    No se encontraron productos.
                </p>
                <button
                    class="btn-ver-todos"
                    onclick="limpiarFiltros()">
                    Ver todos los productos
                </button>
            </div>
        `;
        actualizarContador(0);
        return;
    }
 
    container.innerHTML = products
        .map(function(product) {
            return crearTarjetaHTML(product);
        })
        .join("");
 
    actualizarContador(products.length);
}
 
 
/* 
   FUNCIÓN: actualizarContador
   Actualiza el texto que muestra cuántos productos hay.
   El elemento HTML debe tener id="contador-resultados"
*/
function actualizarContador(cantidad) {
    const contadorEl = document.getElementById("contador-resultados");
    if (!contadorEl) return;
 
    if (cantidad === 0) {
        contadorEl.textContent = "0 productos encontrados";
    } else if (cantidad === 1) {
        contadorEl.textContent = "Mostrando 1 producto";
    } else {
        contadorEl.textContent = "Mostrando " + cantidad + " productos";
    }
}
 
 
/*
   FUNCIÓN: abrirDetalleProducto

 */
function abrirDetalleProducto(id) {
    const product = getProductById(id);
 
    if (!product) {
        console.error("No se encontró el producto con id: " + id);
        return;
    }
 
    // Guardar producto activo en el estado global
    appState.selectedProduct = product;
 
    // Llenar el modal con los datos del producto
    document.getElementById("modal-producto-imagen").src         = product.image;
    document.getElementById("modal-producto-imagen").alt         = product.name;
    document.getElementById("modal-producto-nombre").textContent     = product.name;
    document.getElementById("modal-producto-categoria").textContent  = product.category;
    document.getElementById("modal-producto-precio").textContent     = formatearPrecio(product.price);
    document.getElementById("modal-producto-descripcion").textContent = product.description;
    document.getElementById("modal-producto-features").innerHTML     = crearEtiquetasFeatures(product.features);
 
    // Stock en el modal
    const estadoStock = obtenerEstadoStock(product.stock);
    const stockEl     = document.getElementById("modal-producto-stock");
    stockEl.textContent = estadoStock.texto;
    stockEl.className   = "modal-stock " + estadoStock.clase;
 
    // Reiniciar cantidad a 1
    const cantidadEl = document.getElementById("modal-cantidad");
    if (cantidadEl) cantidadEl.textContent = "1";
 
    // Abrir el modal (función en main.js)
    abrirModal("modal-producto");
}