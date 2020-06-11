/// <reference types="jquery" />

cargarOpcionesBase();
$('#boton-mostrar').click(function () {
    const anio = $('#anio').val();
    const mes = $('#mes').val();
    const dia = $('#dia').val();
    const base = $('#base').val();

    if (validarFecha(Number(dia), Number(mes), Number(anio))) {
        limpiarPantallaCambios();
        $('#error').text('');
        mostrarPantallaCambios();
        mostrarCambios(anio, mes, dia, base);
    } else {
        $('#error').text('Esa fecha no existe.');
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
    $('h2').text('');
    $('thead').text('');
}

function validarFecha(dia, mes, anio) {
    const fechas = {
        1: 31,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    };
    if (esBisiesto(anio)) {
        fechas[2] = 29;
    } else {
        fechas[2] = 28;
    }

    if (fechas[mes] >= dia) {
        return true;
    } else {
        return false;
    }
}

function esBisiesto(anio) {
    if (anio % 4 === 0) {
        if (anio % 100 === 0 && anio % 400 !== 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
