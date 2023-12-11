document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

// Vue instance
var app = new Vue({
    el: '#formulario-actualizar-agente',
    data: {
        agentes: [], // Aquí se cargarán los agentes disponibles
        agenteSeleccionado: null, // ID del agente seleccionado en el selector
        agente: {
            id: null,
            nombre: '',
            descripcion: '',
            imagen: '',
            habilidades: [
                { nombre: '', descripcion: '', icono: '', img: '' },
                { nombre: '', descripcion: '', icono: '', img: '' },
                { nombre: '', descripcion: '', icono: '', img: '' },
                { nombre: '', descripcion: '', icono: '', img: '' }
            ]
        }
    },
    created: function () {
        
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
                    
                    // Establecer el primer agente como seleccionado por defecto
                    if (this.agentes.length > 0) {
                        this.agenteSeleccionado = this.agentes[0].id;
                        this.cargarDatosAgente();
                    }
                })
                .catch(error => {
                    console.error('Error al obtener la lista de agentes:', error);
                });
        },
        cargarDatosAgente: function () {
            // Cuando se selecciona un agente en el selector, cargar sus datos para editar
            if (this.agenteSeleccionado) {
                // Hacer una solicitud para obtener los datos del agente desde el servidor
                fetch(`https://tearsdev.pythonanywhere.com/agente/${this.agenteSeleccionado}`)
                    .then(response => {
                        
                        if (!response.ok) {
                            throw new Error(`Error al obtener los datos del agente. Estado: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Datos del agente:', data);
                        // Asignar los datos del agente a la propiedad 'agente' en data
                        this.agente = data;
                    })
                    .catch(error => {
                        console.error('Error al obtener los datos del agente:', error);
                    });
            }
        },        
        enviarFormulario: function () {
            // Al enviar el formulario, enviar los datos actualizados del agente al servidor
            fetch(`https://tearsdev.pythonanywhere.com/actualizar_agente/${this.agente.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.agente),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos actualizados del agente:', data);
                alert('Agente actualizado Exitosamente!')
                window.location.href = '/templates/agentes.html';
            })
            .catch(error => {
                console.error('Error al enviar el formulario:', error);
                alert('Error al actualizar el Agente')
            });
        }
    }
});
