// =====================
// UI / RENDER
// =====================

function renderizarTabla(notas) {
    cuerpoTabla.innerHTML = '';

    notas.forEach((nota, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = 
            <td>${nota.curso}</td>
            <td>${nota.nota}</td>
            <td>
                <button class="btn-eliminar" data-indice="${index}">
                    Eliminar
                </button>
            </td>
        ;

        cuerpoTabla.appendChild(tr);
    });

    actualizarPromedio(notas);
}

function actualizarPromedio(notas) {
    if (!notas.length) {
        varPromedio.textContent = '0';
        return;
    }

    const suma = notas.reduce((acc, n) => acc + n.nota, 0);
    const promedio = (suma / notas.length).toFixed(1);

    varPromedio.textContent = promedio;
}
