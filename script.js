// --- CONFIGURACIÓN ---
const d = document;
const DB_NAME = 'mis_notas_cursos';

// --- SELECTORES ---
const form = d.getElementById('form-notas');
const inputCurso = d.getElementById('curso');
const inputNota = d.getElementById('nota');
const tablaCuerpo = d.getElementById('lista-notas');
const promedioSpan = d.getElementById('promedio-valor');
const msgSuccess = d.getElementById('msg-success');
const msgError = d.getElementById('msg-error');

// --- FUNCIONES LOCALSTORAGE ---

const obtenerNotas = () => {
    const datos = localStorage.getItem(DB_NAME);
    return datos ? JSON.parse(datos) : [];
};

const guardarNotas = (notas) => {
    localStorage.setItem(DB_NAME, JSON.stringify(notas));
};

// --- LÓGICA DE NEGOCIO ---

const calcularPromedio = (notas) => {
    if (notas.length === 0) return "0.0";
    const suma = notas.reduce((acc, n) => acc + parseFloat(n.valor), 0);
    return (suma / notas.length).toFixed(1);
};

const mostrarMensaje = (tipo) => {
    const alerta = tipo === 'exito' ? msgSuccess : msgError;
    alerta.classList.remove('oculto');
    setTimeout(() => {
        alerta.classList.add('oculto');
    }, 3000);
};

const renderizarTabla = () => {
    const notas = obtenerNotas();
    tablaCuerpo.innerHTML = '';

    notas.forEach((item) => {
        const tr = d.createElement('tr');
        tr.innerHTML = `
            <td>${item.curso}</td>
            <td>${item.valor}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarNota(${item.id})">Eliminar</button>
            </td>
        `;
        tablaCuerpo.appendChild(tr);
    });

    promedioSpan.textContent = calcularPromedio(notas);
};

// --- EVENTOS ---

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const curso = inputCurso.value.trim();
    const valor = inputNota.value;

    // Validación básica
    if (curso === '' || valor === '' || valor < 0 || valor > 20) {
        mostrarMensaje('error');
        return;
    }

    const nuevaNota = {
        id: Date.now(),
        curso: curso,
        valor: valor
    };

    const notas = obtenerNotas();
    notas.push(nuevaNota);
    
    guardarNotas(notas);
    renderizarTabla();
    form.reset();
    mostrarMensaje('exito');
});

// Eliminar nota (global para el onclick del botón)
window.eliminarNota = (id) => {
    let notas = obtenerNotas();
    notas = notas.filter(n => n.id !== id);
    guardarNotas(notas);
    renderizarTabla();
};

// Cargar datos al abrir la página
d.addEventListener('DOMContentLoaded', renderizarTabla);
