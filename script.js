// --- CONFIGURACIÓN Y SELECTORES ---
const d = document;
const notaForm = d.getElementById('nota-form');
const listaNotas = d.getElementById('lista-notas');
const DB_NAME = 'notas_cursos_db';

// --- FUNCIONES DE LOCALSTORAGE ---

// Obtener notas (siempre devuelve un array)
const obtenerNotas = () => {
    const datos = localStorage.getItem(DB_NAME);
    return datos ? JSON.parse(datos) : [];
};

// Guardar array completo
const guardarNotas = (notas) => {
    localStorage.setItem(DB_NAME, JSON.stringify(notas));
};

// --- LÓGICA DE LA APLICACIÓN ---

// Renderizar las notas en el HTML
const renderizarNotas = () => {
    const notas = obtenerNotas();
    listaNotas.innerHTML = ''; // Limpiar contenedor

    notas.forEach(nota => {
        const notaDiv = d.createElement('div');
        notaDiv.className = 'nota-card';
        notaDiv.innerHTML = `
            <h3>${nota.curso}</h3>
            <p>${nota.contenido}</p>
            <small>${nota.fecha}</small>
            <button onclick="eliminarNota(${nota.id})" class="btn-eliminar">Eliminar</button>
        `;
        listaNotas.appendChild(notaDiv);
    });
};

// Agregar una nueva nota
notaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const curso = d.getElementById('curso').value;
    const contenido = d.getElementById('contenido').value;

    const nuevaNota = {
        id: Date.now(),
        curso,
        contenido,
        fecha: new Date().toLocaleString()
    };

    const notas = obtenerNotas();
    notas.push(nuevaNota);
    
    guardarNotas(notas);
    renderizarNotas();
    notaForm.reset(); // Limpiar formulario
});

// Eliminar nota por ID
window.eliminarNota = (id) => {
    let notas = obtenerNotas();
    notas = notas.filter(n => n.id !== id);
    guardarNotas(notas);
    renderizarNotas();
};

// Cargar notas al iniciar la app
d.addEventListener('DOMContentLoaded', renderizarNotas);
