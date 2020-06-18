import { obtenerCambios, obtenerMonedas } from './cambios.js';

import {
  limitarFechas,
  mostrarTitulo,
  limpiarPantallaCambios,
  mostrarPantallaCambios,
  cargarMonedas,
  mostrarCambios,
} from './ui.js';

function init() {
  limitarFechas();
  cargarMonedas();
}

init();

document.querySelector('#boton-mostrar').onclick = (() => {
  const $fecha = document.querySelector('#fecha').value;
  const $base = document.querySelector('#monedas').value;

  limpiarPantallaCambios();
  mostrarPantallaCambios();
  mostrarTitulo($fecha, $base);
  mostrarCambios($fecha, $base);
});
