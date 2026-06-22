

/* Las "llaves" (keys) con las que guardamos cada dato
Las definimos aquí para no escribirlas a mano en cada lugar
y evitar errores de tipeo*/
const STORAGE_KEYS = {
    SESSION:  "bb_sesion",   // Usuario que inició sesión
    CART:     "bb_carrito",  // Productos en el carrito
    USERS:    "bb_usuarios"  // Usuarios registrados
};



// FUNCIONES GENÉRICAS (guardar, leer, borrar)


/*
Guarda cualquier dato en localStorage.
Convierte el dato a texto JSON porque localStorage
¿slo puede guardar texto, no objetos ni arrays
 */
function guardarEnStorage(key, datos) {
    try {
        localStorage.setItem(key, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error("StorageService: Error al guardar '" + key + "'", error);
        return false;
    }
}

/*
Lee y devuelve un dato desde localStorage
Convierte el texto JSON de vuelta a objeto/array
Si no existe la clave, devuelve el valorPorDefecto
 */
function leerDeStorage(key, valorPorDefecto) {
    try {
        const dato = localStorage.getItem(key);
        // Si no existe el dato, devolvemos el valor por defecto
        if (dato === null) return valorPorDefecto;
        return JSON.parse(dato);
    } catch (error) {
        console.error("StorageService: Error al leer '" + key + "'", error);
        return valorPorDefecto;
    }
}

/*
 Borra un dato específico de localStorage
 */
function borrarDeStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("StorageService: Error al borrar '" + key + "'", error);
        return false;
    }
}



// FUNCIONES ESPECÍFICAS — SESIÓN DE USUARIO


/*
 Guarda el usuario que acaba de iniciar sesión
 Se llama desde authService cuando el login es exitoso
 */
function guardarSesion(usuario) {
    return guardarEnStorage(STORAGE_KEYS.SESSION, usuario);
}

/*
Lee y devuelve el usuario con sesión activa
Devuelve null si nadie ha iniciado sesión
 */
function leerSesion() {
    return leerDeStorage(STORAGE_KEYS.SESSION, null);
}

/*
Borra la sesión (cierre de sesión / logout)
 */
function borrarSesion() {
    return borrarDeStorage(STORAGE_KEYS.SESSION);
}



// FUNCIONES ESPECÍFICAS — CARRITO


/**
 Guarda el estado completo del carrito
 El carrito es un array de objetos: [{id, name, price, cantidad}, ...]
 */
function guardarCarrito(carrito) {
    return guardarEnStorage(STORAGE_KEYS.CART, carrito);
}

/*
 Lee y devuelve el carrito guardado
 Si no hay carrito guardado, devuelve un array vacío []
 */
function leerCarrito() {
    return leerDeStorage(STORAGE_KEYS.CART, []);
}

/*
 Borra el carrito (se usa al confirmar un pedido)
 */
function borrarCarrito() {
    return borrarDeStorage(STORAGE_KEYS.CART);
}



// FUNCIONES ESPECÍFICAS — USUARIOS REGISTRADOS


/*
 Lee todos los usuarios registrados en el sistema
 Devuelve un array vacío si no hay ninguno todavía
 */
function leerUsuarios() {
    return leerDeStorage(STORAGE_KEYS.USERS, []);
}

/*
 Guarda la lista completa de usuarios registrados
 */
function guardarUsuarios(usuarios) {
    return guardarEnStorage(STORAGE_KEYS.USERS, usuarios);
}

/*
 Agrega un nuevo usuario a la lista de registrados
Devuelve true si se guardó, false si el email ya existe
 */
function agregarUsuario(nuevoUsuario) {
    const usuarios = leerUsuarios();

    // Verificar si ya existe un usuario con ese email
    const yaExiste = usuarios.some(function(u) {
        return u.email === nuevoUsuario.email;
    });

    if (yaExiste) {
        return false; // Email ya registrado
    }

    usuarios.push(nuevoUsuario);
    return guardarUsuarios(usuarios);
}

/**
 Busca un usuario por email y contraseña
 Devuelve el objeto usuario si lo encuentra, o null
 */
function buscarUsuario(email, password) {
    const usuarios = leerUsuarios();
    return usuarios.find(function(u) {
        return u.email === email && u.password === password;
    }) || null;
}