// FUNCIÓN: getAllProducts
// Devuelve todos los productos sin filtrar

function getAllProducts() {
    return PRODUCTS;
}



// FUNCIÓN: getProductById
// Busca y devuelve un producto por su id (ej: "B001")

function getProductById(id) {
    return PRODUCTS.find(function(product) {
        return product.id === id;
    });
}



// FUNCIÓN: getProductsByCategory
// Filtra productos por categoría exacta

function getProductsByCategory(category) {
    
    if (category.toLowerCase() === "todos") {
        return PRODUCTS;
    }
    return PRODUCTS.filter(function(product) {
        return product.category.toLowerCase() === category.toLowerCase();
    });
}



// FUNCIÓN: busquedaAvanzada
// Combina texto de búsqueda + categoría + precio + disponibilidad

function busquedaAvanzada(productos, texto, categoria, precioMin, precioMax, soloDisponibles) {

    // Empezamos con todos los productos
    let resultado = [...productos];

    // --- FILTRO 1: Texto de búsqueda ---
    if (texto && texto.trim() !== "") {
        const textoBuscado = texto.toLowerCase().trim();

        resultado = resultado.filter(function(p) {
            const enNombre      = p.name.toLowerCase().includes(textoBuscado);
            const enDescripcion = p.description.toLowerCase().includes(textoBuscado);
            const enCategoria   = p.category.toLowerCase().includes(textoBuscado);
            return enNombre || enDescripcion || enCategoria;
        });
    }

    //  FILTRO 2: Categoría 
    
    if (categoria && categoria.toLowerCase() !== "todos") {
        resultado = resultado.filter(function(p) {
            return p.category.toLowerCase() === categoria.toLowerCase();
        });
    }

    // --- FILTRO 3: Precio mínimo ---
    if (precioMin !== null && precioMin !== "") {
        resultado = resultado.filter(function(p) {
            return p.price >= precioMin;
        });
    }

    // --- FILTRO 4: Precio máximo ---
    if (precioMax !== null && precioMax !== "") {
        resultado = resultado.filter(function(p) {
            return p.price <= precioMax;
        });
    }

    // --- FILTRO 5: Solo disponibles ---
    if (soloDisponibles) {
        resultado = resultado.filter(function(p) {
            return p.stock > 0;
        });
    }

    return resultado;
}