// Función para renderizar las notas en la lista
function renderNotas(notas) {
    // Limpiar la lista antes de renderizar
    lista.innerHTML = '';

    // Recorrer las notas y renderizarlas
    notas.forEach((nota, index) => {
        createListItem(nota, index);
    });

    // Actualizar el resumen
    updateSummary(notas);
}

// Crear un elemento de lista para una nota
function createListItem(nota, index) {
    const li = document.createElement('li');
    li.className = 'nota-item';

    const left = document.createElement('div');
    left.className = 'left';

    const cursoEl = document.createElement('div');
    cursoEl.className = 'curso';
    cursoEl.textContent = nota.curso;

    const metaEl = document.createElement('div');
    metaEl.className = 'meta';
    const fecha = new Date(nota.fecha);
    metaEl.textContent = `Nota: ${nota.nota} · ${fecha.toLocaleString()}`;

    left.appendChild(cursoEl);
    left.appendChild(metaEl);

    const btnDel = document.createElement('button');
    btnDel.className = 'btn-eliminar';
    btnDel.textContent = 'Eliminar';
    btnDel.setAttribute('data-index', index);
    btnDel.addEventListener('click', () => deleteNota(index));

    li.appendChild(left);
    li.appendChild(btnDel);

    lista.appendChild(li);
}

// Función para eliminar una nota por índice
function deleteNota(index) {
    if (!confirm('¿Eliminar este registro?')) return;
    
    // Eliminar la nota del array
    notas.splice(index, 1);

    // Guardar los cambios en localStorage
    saveNotas(notas);

    // Volver a renderizar la lista de notas
    renderNotas(notas);
}

// Función para guardar las notas en localStorage
function saveNotas(notas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
}

// Función para sanitizar el texto (si se necesita)
function sanitizeText(text) {
    // Aquí puedes agregar cualquier lógica necesaria para sanear el texto
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
