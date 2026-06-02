

/**
 * Obtiene todos los productos
 */
function getAllProducts() {
    return PRODUCTS;
}

/**
 * Busca un producto por ID
 */
function getProductById(id) {
    return PRODUCTS.find(function(product) {
        return product.id === id;
    });
}

/**
 * Obtiene productos por categoria 
 */
function getProductsByCategory(category) {
    if (category === "Todos") {
        return PRODUCTS;
    }
    return PRODUCTS.filter(function(product){
        return product.category === category;
    });
}

/**
 * Busca productos por nombre
 */
function searchProducts(query) {
    // si no escribio nada, devolvemos todos
    if (query.trim() === "") {
        return PRODUCTS;
    }

    const textoBuscado = query.toLowerCase ();

    return PRODUCTS.filter(function(product) {
        const enNombre = product.name.toLowerCase().includes(textoBuscado);
        const enDescripcion = product.description.toLowerCase().includes(textoBuscado);
        const enMarca = product.brand.toLowerCase().includes(textoBuscado);
        const enCategoria = product.category.toLowerCase().includes(textoBuscado);


        // Devuelve true si el texto aparece en CUALQUIERA de los campos
        return enNombre || enDescripcion || enMarca || enCategoria ;

    });
}

/**
 * Busqueda avanzada con filtros
 */

function advanceSearch(filtros) {
    //Primero con todo los productos
    let resultado = [...PRODUCTS]; // En alguna ocasion vi que [...] hace una copia del array

    // Aplicaremos cada filtro solo si fue especificado
    if (filtros.nombre && filtros.nombre.trim() !== "" ) {
        const texto = filtros.nombre.ToLowerCase(),
        resultado = resultado.filter(function(p) {
            return (
                p.name.toLowerCase().includes(texto) ||
                p.brand.toLowerCase().includes(texto)
            );
               
        });
    }

    if(filtros.categoria && filtros.categoria !== "") {
        resultado = resultado.filter(function(p) {
            return p.category === filtros.categoria;
        });

    }
    if(filtros.marca && filtros.marca !== "") {
        resultado = resultado.filter(function(p) {
            return p.brand === filtros.marca;
        });
    }

    if(filtros.precioMin && filtros.precioMin !== "") {
        resultado = resultado.filter(function(p) {
            return p.price === Number(filtros.precioMin);
        });
    }

    if(filtros.precioMax && filtros.precioMax !== "") {
        resultado = resultado.filter(function(p) {
            return p.price === Number(filtros.precioMax);
        });
    }

    if(filtros.soloDisponibles && true) {
        resultado = resultado.filter(function(p) {
            return p.stock > 0;
        });
    }

    return resultado;

}