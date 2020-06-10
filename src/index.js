/// <reference types="jquery" />

let dia = 30;
let mes = 07;
let anio = 2019;
let base = 'USD';

fetch(`https://api.exchangeratesapi.io/${anio}-${mes}-${dia}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => {
        console.log(respuestaJSON);
        $('h2').text(`Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`);

        Object.keys(respuestaJSON.rates).forEach((moneda) => {
            $('ul').append(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`);
        });
    })
    .catch((error) => console.error('FALLÓ', error));
