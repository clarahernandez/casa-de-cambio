import {
  limitarFechas,
  actualizarTitulo,
  limpiarPantallaCambios,
  mostrarPantallaCambios,
  cargarMonedas,
  mostrarCambios,
  actualizarTitulo,
} from './ui.js';

function init() {
  limitarFechas();
  cargarMonedas();
}

document.querySelector('#boton-mostrar').onclick = (() => {
  limpiarPantallaCambios();
  mostrarPantallaCambios();
  actualizarTitulo();
  mostrarCambios();
});
