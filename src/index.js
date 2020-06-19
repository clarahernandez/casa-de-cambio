import {
  limitarFechas,
  actualizarTitulo,
  limpiarPantallaCambios,
  mostrarPantallaCambios,
  cargarMonedas,
  mostrarCambios,
} from './ui.js';

import { obtenerMonedas, obtenerCambios } from './cambios.js';

async function init() {
  limitarFechas();
  const monedas = await obtenerMonedas();
  cargarMonedas(monedas);
}

async function apretarBoton() {
  limpiarPantallaCambios();
  mostrarPantallaCambios();
  actualizarTitulo();
  const cambios = await obtenerCambios();
  mostrarCambios(cambios);
}

init();

document.querySelector('#boton-mostrar').onclick = apretarBoton;
