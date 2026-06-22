

function obtenerEstadoStock(stock) {
    if (stock === 0)  return { texto: "Agotado",                        clase: "stock-agotado" };
    if (stock <= 5)   return { texto: "Últimas " + stock + " unidades", clase: "stock-bajo"    };
    return                   { texto: "En stock (" + stock + ")",       clase: "stock-ok"      };
}

// Convierte el array features en badges separados
function crearEtiquetasFeatures(features) {
    if (!features || features.length === 0) return "";
    return features.map(function(f) {
        return '<span class="feature-tag">' + f + '</span>';
    }).join(" "); // espacio entre cada badge
}

// Crea la tarjeta HTML de un producto y la devuelve como elemento
function crearTarjetaProducto(producto) {
    const estadoStock = obtenerEstadoStock(producto.stock);
    const agotado     = producto.stock === 0;

    const article = document.createElement("article");
    article.className = "product-card";
    article.setAttribute("data-id", producto.id);

    article.innerHTML =
        '<div class="product-image-wrap">' +
            '<img ' +
                'src="' + producto.image + '" ' +
                'alt="' + producto.name + '" ' +
                'class="product-image" ' +
                'loading="lazy"' +
            '>' +
            '<div class="product-overlay">' +
                '<span>Ver detalle</span>' +
            '</div>' +
        '</div>' +
        '<div class="product-info">' +
            '<p class="product-category">' + producto.category + '</p>' +
            '<h3 class="product-name">' + producto.name + '</h3>' +
            '<p class="product-price">' + formatearPrecio(producto.price) + '</p>' +
            '<p class="product-stock ' + estadoStock.clase + '">' + estadoStock.texto + '</p>' +
            '<div class="product-features">' + crearEtiquetasFeatures(producto.features) + '</div>' +
            '<button class="btn-add btn-agregar-tarjeta" data-id="' + producto.id + '"' +
                (agotado ? ' disabled' : '') + '>' +
                (agotado ? 'Agotado' : 'Añadir al carrito') +
            '</button>' +
        '</div>';

    // Clic en imagen → abre modal de detalle
    article.querySelector(".product-image-wrap")
        .addEventListener("click", function() {
            abrirDetalleProducto(producto.id);
        });

    // Clic en botón → agrega al carrito
    const btn = article.querySelector(".btn-agregar-tarjeta");
    if (btn && !agotado) {
        btn.addEventListener("click", function(e) {
            e.stopPropagation(); // evita que también abra el detalle
            const resultado = agregarAlCarrito(producto);
            mostrarNotificacion(
                resultado.mensaje,
                resultado.exito ? "exito" : "error"
            );
        });
    }

    return article;
}