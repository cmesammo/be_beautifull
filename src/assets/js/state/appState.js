/**
 * Estado global de la aplicación
 * Aquí se guarda toda la información temporal
 * que necesita el sistema mientras está funcionando.
 */

const appState = {

    // Usuario autenticado
     currentUser: JSON.parse(localStorage.getItem("bb_sesion")  || "null"),

    // Productos agregados al carrito
    cart:        JSON.parse(localStorage.getItem("bb_carrito") || "[]"),

    // Categoría seleccionada
    activeCategory:   "Todos",

    // Texto de búsqueda
    searchQuery:      "",

    // Filtros avanzados
    advancedFilters:  null,

    // Producto seleccionado
    selectedProduct:  null

};