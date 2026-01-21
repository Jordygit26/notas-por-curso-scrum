// =====================
// STORAGE
// =====================

const STORAGE_KEY = 'notas-por-curso';

function obtenerNotas() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarNotas(notas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
}

function agregarNotaAlStorage(nuevaNota) {
    const notas = obtenerNotas();
    notas.push(nuevaNota);
    guardarNotas(notas);
    return notas;
}

function eliminarNotaPorIndice(indice) {
    const notas = obtenerNotas();
    notas.splice(indice, 1);
    guardarNotas(notas);
    return notas;
}
ea
