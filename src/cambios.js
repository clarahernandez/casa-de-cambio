export function obtenerCambios(fecha = 'latest', base = 'EUR') {
  const BASE_URL = 'https://api.exchangeratesapi.io';
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON.rates);
}

export function obtenerMonedas() {
  return obtenerCambios().then((cambios) => Object.keys(cambios).concat('EUR'));
}
