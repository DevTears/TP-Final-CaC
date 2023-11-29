document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

// Función para manejar el registro de cuentas
async function register() {
    // Obtener valores de los campos
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
        return;
    }

    // Validar el nombre de usuario
    if (!validarNombreUsuario(newUsername)) {
        alert("El nombre de usuario no es válido. Asegúrate de que no tenga espacios y no comience con un carácter especial o número.");
        return;
    }

    // Validar la contraseña
    if (!validarContraseña(newPassword)) {
        alert("La contraseña no cumple con los requisitos mínimos. Debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial.");
        return;
    }

    try {
        // Cargar cuentas
        var cuentas = []

        // Verificar si el nombre de usuario ya está en uso
        if (cuentas.some(c => c.username === newUsername)) {
            alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
            return;
        }

        // Agregar la nueva cuenta al array
        cuentas.push({ username: newUsername, password: newPassword });

        // Actualizar el JSON con la nueva cuenta
        guardarCuentasEnJSON();

        // Redirigir a la página de Agentes
        window.location.href = "/templates/agentes.html?username=" + newUsername;
    } catch (error) {
        console.error('Error al manejar el registro:', error);
        alert('Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo.');
    }
}

// Función para validar el nombre de usuario
function validarNombreUsuario(username) {
    // Verificar que no haya espacios y no comience con un carácter especial o número
    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(username);
}

// Función para validar la contraseña
function validarContraseña(password) {
    // Debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/.test(password);
}

function guardarCuentasEnJSON() {
    try {
        console.log('Cuentas guardadas correctamente.');
    } catch (error) {
        console.error('Error al guardar cuentas en JSON:', error);
        throw error;
    }
}