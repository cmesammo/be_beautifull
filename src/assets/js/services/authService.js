
/*FUNCIÓN: validarEmail
Verifica que el texto tenga formato de email válido
Ejemplo válido:   ana@gmail.com
Ejemplo inválido: ana@, ana.com, solo texto */

function validarEmail(email) {
    /*Esta es una "expresión regular" — un patrón que
    describe cómo debe verse un texto.
    */
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return patron.test(email);
}



/*
FUNCIÓN: registrarUsuario
Recibe los datos del formulario de registro
*/

function registrarUsuario(nombre, email, password, confirmarPassword) {

    /*VALIDACIÓN 1: Campos vacíos 
    Trim() elimina espacios al inicio y al final
    para que " " (un espacio) no cuente como nombre*/
    if (!nombre.trim() || !email.trim() || !password.trim()) {
        return {
            exito: false,
            mensaje: "Por favor completa todos los campos."
        };
    }

    // VALIDACIÓN 2: Formato del email
    if (!validarEmail(email)) {
        return {
            exito: false,
            mensaje: "El correo electrónico no tiene un formato válido."
        };
    }

    // VALIDACIÓN 3: Longitud mínima de contraseña 
    if (password.length < 6) {
        return {
            exito: false,
            mensaje: "La contraseña debe tener al menos 6 caracteres."
        };
    }

    // VALIDACIÓN 4: Las contraseñas coinciden 
    if (password !== confirmarPassword) {
        return {
            exito: false,
            mensaje: "Las contraseñas no coinciden."
        };
    }

    // INTENTAR GUARDAR EL USUARIO 
   
    const nuevoUsuario = {
        nombre:   nombre.trim(),
        email:    email.trim().toLowerCase(), // guardamos en minúsculas
        password: password,
        fechaRegistro: new Date().toISOString() // fecha actual
    };

    //Le pedimos a storageService que lo guarde
  
    const sePudoGuardar = agregarUsuario(nuevoUsuario);
    
    if (!sePudoGuardar) {
        return {
            exito: false,
            mensaje: "Este correo ya está registrado. ¿Quieres iniciar sesión?"
        };
    }

    
    return {
        exito: true,
        mensaje: "¡Registro exitoso! Bienvenida a Be Beautiful."
    };
}



/*
 FUNCIÓN: iniciarSesion
 Recibe email y contraseña, verifica si el usuario existe*/


function iniciarSesion(email, password) {

    //  VALIDACIÓN 1: Campos vacíos 
    if (!email.trim() || !password.trim()) {
        return {
            exito: false,
            mensaje: "Por favor ingresa tu correo y contraseña."
        };
    }

    /*
    BUSCAR EL USUARIO en storage 
    Le preguntamos a storageService si existe alguien
    con ese email y esa contraseña
    */
    const usuarioEncontrado = buscarUsuario(
        email.trim().toLowerCase(),
        password
    );

    // Si no lo encontró, devuelve null
    if (!usuarioEncontrado) {
        return {
            exito: false,
            mensaje: "Correo o contraseña incorrectos."
        };
    }

    // Usuario encontrado — guardamos la sesión
    
    const sesion = {
        nombre: usuarioEncontrado.nombre,
        email:  usuarioEncontrado.email,
        fechaLogin: new Date().toISOString()
    };

    guardarSesion(sesion);

    // También actualizamos el estado global de la app
    appState.currentUser = sesion;

    return {
        exito: true,
        mensaje: "¡Bienvenida, " + usuarioEncontrado.nombre + "!",
        usuario: sesion
    };
}



/*
FUNCIÓN: cerrarSesion
Borra la sesión del usuario actual
*/

function cerrarSesion() {
    borrarSesion();
    appState.currentUser = null;
    appState.cart = [];
    borrarCarrito();
}



// FUNCIÓN: hayUsuarioActivo


function hayUsuarioActivo() {
    return appState.currentUser !== null;
}



// FUNCIÓN: obtenerUsuarioActual

function obtenerUsuarioActual() {
    return appState.currentUser;
}