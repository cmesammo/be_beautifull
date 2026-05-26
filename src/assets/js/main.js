// Esperar a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LÓGICA DEL CARRITO DE COMPRAS (Simulado)
    let cartCount = 0;
    const cartCountElement = document.getElementById("cart-count");
    const addButtons = document.querySelectorAll(".btn-add");

    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Efecto visual rápido al botón al dar clic
            const originalText = button.textContent;
            button.textContent = "¡Añadido! ✓";
            button.style.backgroundColor = "#C5A059";
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = "#2C2A29";
            }, 1000);
        });
    });

    // 2. LÓGICA ESTÉTICA DE LOS BOTONES DE FILTRO
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Quitar clase activa al botón anterior
            document.querySelector(".filter-btn.active").classList.remove("active");
            // Añadir clase activa al botón presionado
            button.classList.add("active");
            
            // Nota académica: Aquí se conectará el filtro real de los productos más adelante.
            console.log(`Filtrando por categoría: ${button.textContent}`);
        });
    });
});