// Selección de elementos
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const botonIgual = document.querySelector('.operador:last-child');
const botonBorrar = document.querySelector('.col-2');
const botonEliminar = document.querySelector('button:nth-child(2)');
const displayAnterior = document.getElementById('valor-anterior');
const displayActual = document.getElementById('valor-actual');

// Variables para manejar los valores y operaciones
let valorActual = '';
let valorAnterior = '';
let operador = undefined;

// Función para agregar números al display
function agregarNumero(numero) {
    if (numero === '.' && valorActual.includes('.')) return;
    valorActual += numero;
    actualizarDisplay();
}

// Función para manejar operaciones
function seleccionarOperacion(op) {
    if (valorActual === '') return;
    if (valorAnterior !== '') calcular();
    operador = op;
    valorAnterior = valorActual;
    valorActual = '';
    actualizarDisplay();
}

// Función para calcular
function calcular() {
    const anterior = parseFloat(valorAnterior);
    const actual = parseFloat(valorActual);

    if (isNaN(anterior) || isNaN(actual)) return;

    let resultado;
    switch (operador) {
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case 'x':
            resultado = anterior * actual;
            break;
        case '%':
            resultado = anterior % actual;
            break;
        case '/':
            if (actual === 0) {
                alert('No se puede dividir entre cero');
                reiniciar();
                return;
            }
            resultado = anterior / actual;
            break;
        default:
            return;
    }

    valorActual = resultado.toString();
    operador = undefined;
    valorAnterior = '';
    actualizarDisplay();
}

// Función para actualizar el display
function actualizarDisplay() {
    displayActual.textContent = valorActual;
    displayAnterior.textContent = operador ? `${valorAnterior} ${operador}` : '';
}

// Función para reiniciar la calculadora
function reiniciar() {
    valorActual = '';
    valorAnterior = '';
    operador = undefined;
    actualizarDisplay();
}

// Función para eliminar el último dígito
function eliminarUltimo() {
    valorActual = valorActual.slice(0, -1);
    actualizarDisplay();
}

// Event listeners
botonesNumeros.forEach(boton =>
    boton.addEventListener('click', () => agregarNumero(boton.textContent))
);

botonesOperadores.forEach(boton =>
    boton.addEventListener('click', () => seleccionarOperacion(boton.textContent))
);

botonIgual.addEventListener('click', calcular);
botonBorrar.addEventListener('click', reiniciar);
botonEliminar.addEventListener('click', eliminarUltimo);
