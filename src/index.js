function obtenerCambios(fecha = 'latest', base = 'EUR') {
  const BASE_URL = 'https://api.exchangeratesapi.io';
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON.rates);
}


function cargarMonedas() {
  obtenerMonedas().then((cambios) => {
    Object.keys(cambios).forEach((moneda) => {
      const $moneda = document.createElement('option');
      $moneda.textContent = cambios[moneda];
      document.querySelector('#monedas').add($moneda);
  })});
}

function obtenerMonedas() {
  return obtenerCambios().then((cambios) => Object.keys(cambios).concat('EUR'));
}

function mostrarCambios(fecha, base) {
  obtenerCambios(fecha, base).then((cambios) => {
    Object.keys(cambios).forEach((moneda) => {
      const $fila = document.createElement('tr');
      const $moneda = document.createElement('td');
      const $cambio = document.createElement('td');
      $moneda.textContent = moneda;
      $cambio.textContent = cambios[moneda];
      $fila.appendChild($moneda);
      $fila.appendChild($cambio);
      document.querySelector('thead').appendChild($fila);
      });
    });
}

function limitarFechas() {
  const $fecha = document.querySelector('#fecha');
  let hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth() + 1; // Enero empieza en 0
  const yyyy = hoy.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  hoy = `${yyyy}-${mm}-${dd}`;
  $fecha.setAttribute('max', hoy);
}

function mostrarPantallaCambios() {
  document.querySelector('#pantalla-cambio').classList.remove('oculto');
}

function limpiarPantallaCambios() {
  document.querySelector('h2').textContent = '';
  document.querySelector('thead').textContent = '';
}

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


function mostrarTitulo(fecha, base) {
  document.querySelector('h2').textContent = `Cambios del día ${fecha} en base ${base}`;
}