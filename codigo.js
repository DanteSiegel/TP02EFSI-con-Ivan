const inputTarea = document.getElementById("textoTarea");
const botonIngresar = document.getElementById("botonIngresar");
const botonMasRapida = document.getElementById("botonMasRapida");
const listaItems = document.getElementById("listaItems");

let listArray = [];

botonIngresar.addEventListener("click", function() {
    agregarALista();
});

botonMasRapida.addEventListener("click", function() {
    mostrarTareaMasRapida();
});

const agregarALista = () => {
    const nuevoElemento = inputTarea.value;
    const now = new Date();
    const listItem = {
        texto: nuevoElemento,
        completado: false,
        fechaCreacion: now,
        fechaTachado: null
    };
    listArray.push(listItem);
    mostrarLista();
    inputTarea.value = ""; 
}

const mostrarLista = () => {
    listaItems.innerHTML = ""; 

    listArray.forEach((item, index) => {
        const listItemElement = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completado;
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                listArray[index].completado = true;
                listArray[index].fechaTachado = new Date();
            } else {
                listArray[index].completado = false;
                listArray[index].fechaTachado = null;
            }
            mostrarLista();
        });

        const label = document.createElement("label");
        label.textContent = item.texto + " - Creado: " + item.fechaCreacion.toLocaleString() + 
                            (item.fechaTachado ? (" - Tachado: " + item.fechaTachado.toLocaleString()) : "");

        listItemElement.appendChild(checkbox);
        listItemElement.appendChild(label);

        listaItems.appendChild(listItemElement);

        if (item.completado) {
            label.style.textDecoration = "line-through";
        }
    });
}

const mostrarTareaMasRapida = () => {
    let tareaMasRapida = listArray.filter(item => item.completado && item.fechaTachado !== null)
                                  .sort((a, b) => (a.fechaTachado - a.fechaCreacion) - (b.fechaTachado - b.fechaCreacion))[0];

    if (tareaMasRapida) {
        alert("La tarea más rápida en realizarse fue: " + tareaMasRapida.texto + 
              " - Tiempo: " + ((tareaMasRapida.fechaTachado - tareaMasRapida.fechaCreacion) / 1000) + " segundos");
    } else {
        alert("No hay tareas completadas para mostrar.");
    }
}
