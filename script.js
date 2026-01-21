// =====================
// las validaciones y mesnajes
// =====================

function validarCurso(curso) {
    return typeof curso === 'string' && curso.trim().length >= 2;
}

function validarNota(nota) {
    return !isNaN(nota) && nota >= 0 && nota <= 20;
}

function mostrarMensaje(texto, esError = false) {
    const msgSuccess = document.getElementById('msg-success');
    const msgError = document.getElementById('msg-error');

    msgSuccess.classList.add('oculto');
    msgError.classList.add('oculto');

    if (esError) {
        msgError.textContent = texto;
        msgError.classList.remove('oculto');
    } else {
        msgSuccess.textContent = texto;
        msgSuccess.classList.remove('oculto');
    }

    setTimeout(() => {
        msgSuccess.classList.add('oculto');
        msgError.classList.add('oculto');
    }, 3000);
}
