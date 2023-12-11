document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

// Vue instance
var app = new Vue({
    el: '#app',
    data: {
        agentes: [], // Aquí se cargarán los agentes disponibles
        agenteSeleccionado: null // ID del agente seleccionado en el selector
    },
    created: function () {
        // Al cargar la página, obtén la lista de agentes disponibles
        this.obtenerAgentes();
    },
    methods: {
        obtenerAgentes: function () {
            // Hacer una solicitud para obtener la lista de agentes desde el servidor
            fetch('https://tearsdev.pythonanywhere.com/agentes')
                .then(response => response.json())
                .then(data => {
                    // Asignar la lista de agentes a la propiedad 'agentes' en data
                    this.agentes = data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de agentes:', error);
                });
        },
        cargarDatosAgente: function () {
            // Puedes implementar la lógica para cargar los datos del agente si es necesario
            // Por ejemplo, mostrar información del agente seleccionado antes de eliminarlo
        },
        eliminarAgente: function () {
            if (this.agenteSeleccionado) {
                // Hacer una solicitud para eliminar el agente seleccionado desde el servidor
                fetch(`https://tearsdev.pythonanywhere.com/eliminar_agente/${this.agenteSeleccionado}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Agente eliminado:', data);
                    alert('Agente Eliminado Exitosamente!')
                    this.obtenerAgentes();
                    window.location.href = '/templates/agentes.html';
                })
                .catch(error => {
                    console.error('Error al eliminar el agente:', error);
                    alert('Error al eliminar al Agente')
                });
            }
        }
    }
});
