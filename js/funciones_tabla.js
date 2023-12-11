let sortOrder = 1; // 1 para ascendente, -1 para descendente
let currentColumn = 0; // Columna actual para ordenar

function ordenarTabla(column) {
    if (currentColumn === column) {
        sortOrder *= -1; // Cambiar orden si la misma columna se hace clic nuevamente
    } else {
        sortOrder = 1; // Volver a orden ascendente si se hace clic en una nueva columna
        currentColumn = column;
    }

    const tbody = document.querySelector("#tablaPersonajes tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const aValue = a.cells[column].textContent.trim().toLowerCase();
        const bValue = b.cells[column].textContent.trim().toLowerCase();

        if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
            return (parseFloat(aValue) - parseFloat(bValue)) * sortOrder;
        } else {
            return aValue.localeCompare(bValue) * sortOrder;
        }
    });

    // Limpiar y agregar filas ordenadas
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}
