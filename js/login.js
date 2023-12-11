document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

// Función para cargar cuentas desde un archivo JSON
async function cargarCuentasDesdeJSON() {
    try {
        const response = await fetch('../src/Json/cuentas.json');
        const cuentas = await response.json();
        return cuentas;
    } catch (error) {
        console.error('Error al cargar cuentas:', error);
        return [];
    }
}

async function login() {
    // Obtener valores de los campos
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    try {
        // Cargar cuentas desde el JSON
        var cuentas = await cargarCuentasDesdeJSON();

        // Verificar las credenciales
        var cuenta = cuentas.find(c => c.username === username && c.password === password);

        if (cuenta !== undefined) {
            // Almacenar el rango del usuario en el localStorage
            localStorage.setItem('rango', cuenta.rango);

            // Redirigir a la página de Agentes
            window.location.href = "/templates/agentes.html?username=" + username;
        } else {
            alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error('Error al manejar inicio de sesión:', error);
        alert('Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo.');
    }
}

function validarCredenciales(username, password) {
    var cuentas = cargarCuentasDesdeJSON();
    var cuenta = cuentas.find(c => c.username === username && c.password === password);
    return cuenta !== undefined;
}
