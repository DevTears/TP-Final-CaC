document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const tabla = document.getElementById("tablaPersonajes");
    const tbody = tabla.getElementsByTagName("tbody")[0];
    const rutaJSON = "/src/Json/personajes.json";
    const habilidadesVisibles = [];
    let personajes;

    fetch(rutaJSON)
        .then(response => response.json())
        .then(data => {
            personajes = data;
            for (let i = 0; i < personajes.length; i++) {
                const personaje = personajes[i];
                const fila = tbody.insertRow();

                const celdaID = fila.insertCell(0);
                celdaID.textContent = i + 1;

                const celdaNombre = fila.insertCell(1);
                celdaNombre.textContent = personaje.nombre;

                const celdaDescripcion = fila.insertCell(2);
                celdaDescripcion.textContent = personaje.descripcion;

                const celdaImagen = fila.insertCell(3);
                const imagen = document.createElement("p");
                imagen.textContent = personaje.imagen;
                imagen.alt = personaje.nombre;
                celdaImagen.appendChild(imagen);

                const celdaBoton = fila.insertCell(4);
                const botonHabilidades = document.createElement("button");
                botonHabilidades.textContent = "Mostrar Habilidades";
                botonHabilidades.addEventListener("click", function () {
                    if (habilidadesVisibles[i]) {
                        ocultarHabilidades(i, fila);
                        habilidadesVisibles[i] = false;
                    } else {
                        mostrarHabilidades(i, fila);
                        habilidadesVisibles[i] = true;
                    }
                });
                celdaBoton.appendChild(botonHabilidades);
            }
        })
        .catch(error => console.error("Error al cargar el JSON:", error));

    function mostrarHabilidades(index, fila) {
        const personaje = personajes[index];
        const habilidadesContainer = tbody.insertRow(fila.rowIndex);
        habilidadesContainer.id = `habilidades-container-${index + 1}`;

        const celdaContenedor = habilidadesContainer.insertCell();
        celdaContenedor.colSpan = 5;

        const tablaHabilidades = document.createElement("table");
        celdaContenedor.appendChild(tablaHabilidades);

        personaje.habilidades.forEach((habilidad, index) => {
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

        const botonHabilidades = document.querySelector(`#tablaPersonajes tr:nth-child(${index + 1}) td:nth-child(5) button`);
        botonHabilidades.textContent = "Ocultar Habilidades";
    }

    function ocultarHabilidades(index, fila) {
        const habilidadesContainer = document.getElementById(`habilidades-container-${index + 1}`);
        tbody.removeChild(habilidadesContainer);

        const botonHabilidades = document.querySelector(`#tablaPersonajes tr:nth-child(${index + 1}) td:nth-child(5) button`);
        botonHabilidades.textContent = "Mostrar Habilidades";
    }
});
