document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });

    const tbody = document.getElementById("tablaPersonajes").getElementsByTagName("tbody")[0];
    new Vue({
        el: '#app',
        data: {
            agentes: []  // Nueva propiedad para almacenar los agentes recuperados de la API
        },
        mounted() {
            // Realizar solicitud a la API Flask al cargar el componente
            fetch("https://tearsdev.pythonanywhere.com/agentes")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Almacenar los agentes en la propiedad agentes
                    this.agentes = data;
                    // Renderizar la tabla después de recibir los datos
                    this.renderizarTabla();
                })
                .catch(error => {
                    console.error("Error al recuperar datos:", error);
                });
        },
        methods: {
            renderizarTabla() {
                const tabla = document.getElementById("tablaPersonajes");
                const tbody = tabla.getElementsByTagName("tbody")[0];
                const habilidadesVisibles = [];

                
                const agentes = this.agentes;

                agentes.forEach((agente, i) => {
                    const fila = tbody.insertRow();

                    const celdaID = fila.insertCell(0);
                    celdaID.textContent = i + 1;

                    const celdaNombre = fila.insertCell(1);
                    celdaNombre.textContent = agente.nombre;

                    const celdaDescripcion = fila.insertCell(2);
                    celdaDescripcion.textContent = agente.descripcion;

                    const celdaImagen = fila.insertCell(3);
                    const imagen = document.createElement("p");
                    imagen.textContent = agente.imagen;
                    imagen.alt = agente.nombre;
                    celdaImagen.appendChild(imagen);

                    const celdaBoton = fila.insertCell(4);
                    const botonHabilidades = document.createElement("button");
                    botonHabilidades.textContent = "Mostrar Habilidades";
                    botonHabilidades.addEventListener("click", () => {
                        if (habilidadesVisibles[i]) {
                            this.ocultarHabilidades(i, fila);
                            habilidadesVisibles[i] = false;
                        } else {
                            console.log(i)
                            this.mostrarHabilidades(i, fila);
                            habilidadesVisibles[i] = true;
                        }
                    });
                    celdaBoton.appendChild(botonHabilidades);
                });
            },
            mostrarHabilidades(index, fila) {
                const agente = this.agentes[index];
        
                // Crear una nueva fila después de la fila del agente actual
                const habilidadesContainer = tbody.insertRow(fila.rowIndex);
                habilidadesContainer.id = `habilidades-container-${index + 1}`;
        
                const celdaContenedor = habilidadesContainer.insertCell();
                celdaContenedor.colSpan = 5;
        
                const tablaHabilidades = document.createElement("table");
                celdaContenedor.appendChild(tablaHabilidades);
        
                agente.habilidades.forEach((habilidad) => {
                    const habilidadFila = tablaHabilidades.insertRow();
            
                    const celdaNombre = habilidadFila.insertCell();
                    celdaNombre.textContent = habilidad.nombre;
                    celdaNombre.classList.add("nombreHabilidad");
            
                    const celdaDescripcion = habilidadFila.insertCell();
                    celdaDescripcion.textContent = habilidad.descripcion;
            
                    const celdaIcono = habilidadFila.insertCell();
                    const icono = document.createElement("p");
                    icono.textContent = habilidad.icono;
                    icono.alt = habilidad.nombre;
                    celdaIcono.appendChild(icono);
            
                    const celdaImagen = habilidadFila.insertCell();
                    const imagen = document.createElement("p");
                    imagen.textContent = habilidad.img;
                    imagen.alt = habilidad.nombre;
                    celdaImagen.appendChild(imagen);
                });
        
                const botonHabilidades = fila.querySelector("button");
                botonHabilidades.textContent = "Ocultar Habilidades";
            },
        
            ocultarHabilidades(index, fila) {
                const habilidadesContainer = document.getElementById(`habilidades-container-${index + 1}`);
                tbody.removeChild(habilidadesContainer);
        
                const botonHabilidades = fila.querySelector("button");
                botonHabilidades.textContent = "Mostrar Habilidades";
            }
        }
    });
});

// Verificar si el usuario es administrador
console.log(localStorage.getItem('rango'));
const isAdmin = localStorage.getItem('rango') === 'admin';
const isUsernameAdmin = window.location.href.includes('username=admin');

// Mostrar u ocultar botones según el estado de administrador
if (isAdmin && isUsernameAdmin) {
    const container_botones = document.getElementById('container-botones');

    // Crear los botones y agregarlos al footer
    const crearAgenteButton = document.createElement('button');
    crearAgenteButton.textContent = 'Crear Agente';
    crearAgenteButton.addEventListener('click', function () {
        // Redirigir a la página de Crear Agente
        window.location.href = "/templates/crear_agentes.html";
    });

    const actualizarAgenteButton = document.createElement('button');
    actualizarAgenteButton.textContent = 'Actualizar Agente';
    actualizarAgenteButton.addEventListener('click', function () {
        // Redirigir a la página de Actualizar Agente
        window.location.href = "/templates/actualizar_agente.html";
    });

    const eliminarAgenteButton = document.createElement('button');
    eliminarAgenteButton.textContent = 'Eliminar Agente';
    eliminarAgenteButton.addEventListener('click', function () {
        // Redirigir a la página de Eliminar Agente
        window.location.href = "/templates/eliminar_agente.html";
    });

    // Agregar botones al footer
    container_botones.appendChild(crearAgenteButton);
    container_botones.appendChild(actualizarAgenteButton);
    container_botones.appendChild(eliminarAgenteButton);
}
