//variables del cronometro y una llave de pausado.

var el_cronometro;
var pausado = false;

//unas variables para almacenar el tiempo.

var milisegundos = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;

function Cronometro() {
    if (!pausado) {

        //+10 milisegundos, correspondiendo a lo que hemos esperado entre cada vuelta.

        milisegundos+=10;

        //si los contadores superan lo establecido el siguiente aumenta.

        if (milisegundos >= 1000) {
            milisegundos = 0;
            segundos += 1;
        }
        if (segundos >= 60) {
            segundos = 0;
            minutos += 1;
        }
        if (minutos >= 60) {
            milisegundos = 0;
            horas += 1;
        }

        //inicializamos variables auxiliares que poder editar en esta vuelta de bucle.

        var aux_milisegundos = milisegundos/10;
        var aux_segundos = segundos;
        var aux_minutos = minutos;
        var aux_horas = horas;

        //arreglos en las variables auxiliares para su visualización, los 0 a la izquierda en caso de ocupar poco.

        if (aux_milisegundos < 10) aux_milisegundos = "0" + aux_milisegundos;
        if (aux_segundos < 10) aux_segundos = "0" + aux_segundos;
        if (aux_minutos < 10) aux_minutos = "0" + aux_minutos;
        if (aux_horas < 10) aux_horas = "0" + aux_horas;

        $("#marcador > p").html(aux_horas + ":" + aux_minutos + ":" + aux_segundos + " " + aux_milisegundos);
    }
}

$("#comenzar").click(
    function(e) {
        $("#pausar").show();
        $("#comenzar").hide();
        if (!pausado) {
            el_cronometro = setInterval(Cronometro, 10);
        }
        else {
            pausado = false;
        }
    }
);

$("#pausar").click(
    function(e) {
        $("#pausar").hide();
        $("#comenzar").show();
        pausado = true;
    }
);

$("#marcar").click(
    function(e) {
        if ($("#cajaResultados").hide()) {
        	$("#cajaResultados").show();
        }
        
        $("#resultados").append("<li>"+ $("#marcador > p").text() +"</li>");
    }
);

$("#cancelar").click(
    function(e) {
        clearInterval(el_cronometro);
        milisegundos = 0;
        segundos = 0;
        minutos = 0;
        horas = 0;
        pausado = false;
        $("#pausar").hide();
        $("#comenzar").show();
        $("#marcador > p").html("00:00:00 00");
        $("#resultados").html("");
        $("#cajaResultados").hide();
    }
);


$(document).ready(
    function() {
        $("#pausar").hide();
        $("#marcador > p").html("00:00:00 00");
    }
);