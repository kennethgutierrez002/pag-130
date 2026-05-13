const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

let tareas = [];


// AGREGAR TAREA
formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridad = document.getElementById("prioridad").value;

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        prioridad: prioridad,
        completada: false
    };

    tareas.push(nuevaTarea);

    formulario.reset();

    mostrarTareas("todas");

});


// MOSTRAR TAREAS
function mostrarTareas(tipo){

    lista.innerHTML = "";

    let tareasFiltradas = tareas;

    if(tipo === "pendientes"){
        tareasFiltradas = tareas.filter(t => !t.completada);
    }

    if(tipo === "completadas"){
        tareasFiltradas = tareas.filter(t => t.completada);
    }

    tareasFiltradas.forEach(function(tarea){

        const div = document.createElement("div");

        div.classList.add("tarea");

        div.innerHTML = `

            <div class="info">

                <h3 class="${tarea.completada ? 'completada' : ''}">
                    ${tarea.titulo}
                </h3>

                <span class="${tarea.prioridad.toLowerCase()}">
                    Prioridad: ${tarea.prioridad}
                </span>

            </div>

            <div class="acciones">

                <button 
                    class="btn-check"
                    onclick="completarTarea(${tarea.id})"
                >
                    ✔
                </button>

                <button 
                    class="btn-eliminar"
                    onclick="eliminarTarea(${tarea.id})"
                >
                    ✖
                </button>

            </div>

        `;

        lista.appendChild(div);

    });

}


// COMPLETAR
function completarTarea(id){

    tareas = tareas.map(function(t){

        if(t.id === id){
            t.completada = !t.completada;
        }

        return t;

    });

    mostrarTareas("todas");

}


// ELIMINAR
function eliminarTarea(id){

    tareas = tareas.filter(function(t){

        return t.id !== id;

    });

    mostrarTareas("todas");

}