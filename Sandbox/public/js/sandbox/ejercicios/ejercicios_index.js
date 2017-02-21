$(document).ready(function() {
    var listaEjercicios = $("#lista-ejercicios");
    $.getJSON("/ejercicios/todos", function(data) {
        var status = data.status;
        var contenido = data.contenido;
        $.each(contenido, function(key, value){
            var dificultad = value.dificultad;
            var titulo = value.titulo;
            var autor = value.autor;
            var listadificultad = value.lista;
             var tr = $('<tr></tr>');
            var td1 = $('<td>' + titulo + '</td>'); 
            var td2 = $('<td>' + autor + '</td>'); 
            var td3 = $('<td>' + dificultad + '</td>'); 
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            listaEjercicios.append(tr);
        });
        $('#example').DataTable( {
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros por página",
                "zeroRecords": "No se ha encontrado ningún dato",
                "info": "Mostrando página _PAGE_ de _PAGES_",
                "infoEmpty": "Registros no disponibles",
                "infoFiltered": "(filtrado de _MAX_ total records)",
                "sSearch": "Buscar:",
                "oPaginate": {
                  "sFirst": "Primero",
                  "sLast": "Último",
                  "sNext": "Siguiente",
                  "sPrevious": "Anterior"
                }
            }
        });
    });
});