$(function() {
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
                $("#etiquetas-ejercicio").text("Etiquetas: " + etiquetasStr);
                $("#descripcion-ejercicio").text("Descripción: " + datajson.contenidoMSG.descripcion);
            }
        });
    });
});