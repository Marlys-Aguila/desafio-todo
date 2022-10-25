/* El código contiene bastantes comentarios que resultan obvios */
/* Esto lo hice a propósito con el fin visualizar y aclarar los pasos para mí */

// Declaración de variables globales
const tbody = document.querySelector("tbody");
const btnAgregar = document.querySelector("#input-boton");
const inputTarea = document.querySelector("#input-tarea");
const stats = document.querySelector("#stats");

// Array con 3 tareas iniciales según solicitud de pauta de evaluación
const listaTareas = [
    {
        id: 1666582361830,
        nombre: "Comprar en el supermercado",
        completado: false,
    },
    {
        id: 1666582361832,
        nombre: "Llevar a Max al veterinario",
        completado: false,
    },
    {
        id: 1666582361834,
        nombre: "Asistir a reunión de apoderados",
        completado: false,
    },
];

// Visualizar lista de tareas al cargar la página
window.onload = renderRows();

// Función para mostrar la lista actualizada en el html
function renderRows() {
    let html = "";

    for (let tarea of listaTareas) {
        html += `
            <tr>
            <td>${tarea.id}</td>
            <td> <input type="checkbox" id="estado-tarea-${tarea.id}" name="estado-tarea" title="Click para establecer como tarea completada" value="${tarea.id}" onclick="cambiarEstado(${tarea.id});" ${tarea.completado === true ? "checked" : ""} /> ${tarea.nombre} </td>
            <td class="align-center"><img src="assets/img/bin.png" alt="Eliminar tarea" title="Eliminar tarea" onclick="borrarTarea(${tarea.id})" style="width:20px;"></td>
            </tr>
        `;
    }

    tbody.innerHTML = html;

    // Se llama a la función para actualizar estadísticas
    updateStats();
}

// Función para actualizar estadísticas: tareas totales, realizadas y pendientes
function updateStats() {
    let filtradosChecked = listaTareas.filter(
        (tarea) => tarea.completado === true
    );
    return (stats.innerHTML = `
        <h3>Total Tareas: <span class="stats">${listaTareas.length}</span></h3>
        <h3>Realizadas: <span class="stats">${
            filtradosChecked.length
        }</span></h3>
        <h3>Pendientes: <span class="stats">${
            listaTareas.length - filtradosChecked.length
        }</span></h3>
    `);
}

// Listener en el botón 'Agregar'
btnAgregar.addEventListener("click", () => {
    // Se comprueba que la tarea ingresada no sea un espacio en blanco
    if (inputTarea.value !== "") {
        // Se crea el objeto a partir de los datos ingresados por el usuario
        const nuevaTarea = {
            id: Date.now(),
            nombre: inputTarea.value,
            completado: false,
        };

        // Se ingresa el objeto al array
        listaTareas.push(nuevaTarea);

        // Se vacía el contenido del input y se pone el foco en él
        inputTarea.value = "";
        inputTarea.focus();

        // Se actualiza la información en el html
        renderRows();
    } else {
        alert("Por favor ingrese una tarea");
        inputTarea.focus();
    }
});

// Función para borrar una tarea de la lista. Pasos:
// 1. Encontrar index 2. Eliminar con splice 3. Actualizar html
function borrarTarea(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id);
    listaTareas.splice(index, 1);
    renderRows();
}

// Función para modificar el estado completado de la tarea a true
function cambiarEstado(id) {
    listaTareas.forEach((tarea) => {
        if (tarea.id === id) {
            tarea.completado = true;
        }
        return;
    });
    updateStats();
}
