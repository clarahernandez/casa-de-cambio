/// <reference types="jquery" />

cargarOpcionesBase();
$('#boton-mostrar').click(function () {
    const anio = $('#anio').val();
    const mes = $('#mes').val();
    const dia = $('#dia').val();
    const base = $('#base').val();

    //TODO: true cambiar por función que haga las validaciones
    if (true) {
        limpiarPantallaCambios();
        mostrarPantallaCambios();
        mostrarCambios(anio, mes, dia, base);
    }
});

function cargarOpcionesBase() {
    fetch('https://api.exchangeratesapi.io/latest')
        .then((respuesta) => respuesta.json())
        .then((respuestaJSON) => {
            Object.keys(respuestaJSON.rates).forEach((moneda) => {
                $('#base').append(`<option>${moneda}</option>`);
            });
        })
        .catch((error) => console.error('FALLÓ', error));
}

function mostrarCambios(anio, mes, dia, base) {
    fetch(`https://api.exchangeratesapi.io/${anio}-${mes}-${dia}?base=${base}`)
        .then((respuesta) => respuesta.json())
        .then((respuestaJSON) => {
            $('h2').text(`Cambios del día ${respuestaJSON.date} en base ${respuestaJSON.base}`);

            Object.keys(respuestaJSON.rates).forEach((moneda) => {
                $('thead').append(
                    `<tr><td>${moneda}</td> <td>${respuestaJSON.rates[moneda]}</td></tr>`
                );
            });
        })
        .catch((error) => console.error('FALLÓ', error));
}

function mostrarPantallaCambios() {
    $('#pantalla-cambio').removeClass('oculto');
}

function ocultarPantallaFormulario() {
    $('#pantalla-formulario').addClass('oculto');
}

function limpiarPantallaCambios() {
    $('thead').text('');
}
