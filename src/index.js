

document.querySelector('#boton-mostrar').onclick = (() => {
  const $fecha = document.querySelector('#fecha').value;
  const $base = document.querySelector('#base').value;

  limpiarPantallaCambios();
  mostrarPantallaCambios();
  mostrarCambios($fecha, $base);
});

function cargarOpcionesBase() {
  fetch('https://api.exchangeratesapi.io/latest')
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      Object.keys(respuestaJSON.rates).forEach((moneda) => {
        const $cambio = document.createElement('option');
        $cambio.textContent = moneda;
        document.querySelector('#base').appendChild($cambio);
      });
    })
    .catch((error) => console.error('FALLÓ', error));
}

function mostrarCambios(fecha, base) {
  fetch(`https://api.exchangeratesapi.io/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
      document.querySelector('h2').textContent = `Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`;

      Object.keys(respuestaJSON.rates).forEach((moneda) => {
        const $fila = document.createElement('tr');
        const $moneda = document.createElement('td');
        const $cambio = document.createElement('td');
        $moneda.textContent = moneda;
        $cambio.textContent = respuestaJSON.rates[moneda];
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
  cargarOpcionesBase();
}
init();
