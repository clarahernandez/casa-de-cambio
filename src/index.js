/// <reference types="jquery" />

let dia = 30;
let mes = 07;
let anio = 2019;
let base = 'USD';

cargarOpcionesBase();

function cargarOpcionesBase() {
    fetch('https://api.exchangeratesapi.io/latest')
        .then((respuesta) => respuesta.json())
        .then((respuestaJSON) => {
            Object.keys(respuestaJSON.rates).forEach((moneda) => {
                $('#base').append(`<option>${moneda}</option>`);
            });
        });
}
fetch(`https://api.exchangeratesapi.io/${anio}-${mes}-${dia}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
        console.log(respuestaJSON);
        $('h2').text(`Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`);

        Object.keys(respuestaJSON.rates).forEach((moneda) => {
            $('#respuesta').append(
                `<tr><td>${moneda}</td> <td>${respuestaJSON.rates[moneda]}</td></tr>`
            );
        });
    })
    .catch((error) => console.error('FALLÓ', error));
