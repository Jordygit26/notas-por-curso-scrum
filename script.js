// Función para calcular el promedio de las notas
function calcularPromedio(notas) {
    if (notas.length === 0) return null; // Si no hay notas, no podemos calcular el promedio

    // Calcular la suma de todas las notas
    const suma = notas.reduce((acc, nota) => acc + nota.nota, 0);

    // Calcular y devolver el promedio redondeado a 2 decimales
    return (suma / notas.length).toFixed(2);
}

// Función para actualizar el resumen: total de notas y promedio
function updateSummary(notas) {
    totalEl.textContent = notas.length; // Actualizar el total de notas
    const promedio = calcularPromedio(notas); // Calcular el promedio
    promedioEl.textContent = promedio === null ? '-' : promedio; // Mostrar el promedio o un guion si no hay notas
}
