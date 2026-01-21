const formularioNotas = document.getElementById('form-notas');
const inputCurso = document.getElementById('curso');
const inputNota = document.getElementById('nota');
const cuerpoTabla = document.getElementById('lista-notas'); 
const varPromedio = document.getElementById('promedio-valor');

document.addEventListener('DOMContentLoaded', () => {
    if (typeof obtenerNotas === 'function' && typeof renderizarTabla === 'function') {
        const notasIniciales = obtenerNotas();
        renderizarTabla(notasIniciales);
    }
});

if (formularioNotas) {
    formularioNotas.addEventListener('submit', manejarEnvio);
}

if (cuerpoTabla) {
    cuerpoTabla.addEventListener('click', manejarClickTabla);
}

function manejarEnvio(evento) {
    evento.preventDefault(); 

    const curso = inputCurso.value;
    const nota = parseFloat(inputNota.value);

    if (typeof validarCurso === 'function' && !validarCurso(curso)) {
        mostrarMensaje('Error: El curso debe tener al menos 2 letras.', true);
        return;
    }
    if (typeof validarNota === 'function' && !validarNota(nota)) {
        mostrarMensaje('Error: La nota debe ser un número entre 0 y 20.', true);
        return;
    }

    const nuevaNota = {
        curso: curso,
        nota: nota,
        fecha: new Date().toISOString()
    };

    const listaActualizada = agregarNotaAlStorage(nuevaNota);

    renderizarTabla(listaActualizada);

    if (typeof mostrarMensaje === 'function') {
        mostrarMensaje('Nota guardada correctamente.');
    }
    
    limpiarFormulario();
}

function manejarClickTabla(evento) {
    if (evento.target.classList.contains('btn-eliminar')) {
        
        const indice = evento.target.getAttribute('data-indice');
        
        if(confirm('¿Seguro que deseas eliminar esta nota?')) {
            const listaActualizada = eliminarNotaPorIndice(indice);
            renderizarTabla(listaActualizada);
        }
    }
}

function limpiarFormulario() {
    formularioNotas.reset();
    inputCurso.focus();
}