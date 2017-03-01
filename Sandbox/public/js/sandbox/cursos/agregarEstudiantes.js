$(document).ready(function() {
	$('#agregarE').click(function(){
		var estudiante = $("#estudiantes").val();
		console.log(estudiante);
		if (estudiante != ""){
			$('#lista-group').append('<div class="row"><div class="col-sm-4 col-md-4" id="estd">'+estudiante+'</div><button class="btn btn-danger quitar-entrada" data-target="div' + estudiante + '">Quitar</button><input type="hidden" name="est" value="'+estudiante+'"></div>')
		}
	});
	$('body').on('click', '.quitar-entrada', function() {
        $(this).parent().remove();
        $()
    });
});