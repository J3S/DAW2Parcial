$(function() {
    var entrada = [];
    var salida = "";
    $('#obtener-ejercicio').click(function (event) {
        event.preventDefault();
        var dificultad_env = $("#dificultad :selected").text();
        var etiqueta_env= $("#etiquetas :selected").text();
        $.ajax({
            url: "/ejercicios/ejercicio_random",
            type: "GET",
            data: {
                dificultad: dificultad_env,
                etiqueta: etiqueta_env
            }, success: function(data) {
                var datajson = JSON.parse(data);
                $("#titulo-ejercicio").text("Título: " + datajson.contenidoMSG.titulo);
                $("#dificultad-ejercicio").text("Dificultad: " + datajson.contenidoMSG.dificultad.nombre);
                var etiquetasStr = "";
                var etiquetasArray = datajson.contenidoMSG.etiquetas;
                for(var index in etiquetasArray) { 
                    if(index == 0) etiquetasStr = etiquetasStr + etiquetasArray[index].valor;
                    else etiquetasStr = etiquetasStr + ", " + etiquetasArray[index].valor;
                }

                entrada = [];
                var entradasArray = datajson.contenidoMSG.datosEntrada;
                for(var index in entradasArray) { 
                    entrada.push(entradasArray[index].valor);
                }

                salida = "";
                salida = salida + datajson.contenidoMSG.datosSalida;
                $("#etiquetas-ejercicio").text("Etiquetas: " + etiquetasStr);
                $("#descripcion-ejercicio").text("Descripción: " + datajson.contenidoMSG.descripcion);
            }
        });
    });

    $("#resolver-ejercicio").click(function(event) {
        event.preventDefault();
        var formData = new FormData(document.getElementById("form-archivo"));
        formData.append("entradas", entrada);
        formData.append("salida", salida);
        $.ajax({
            url: "/ejercicios/resolver",
            type: "POST",
            dataType: "html",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                console.log(data);
            }
        });
    });
});