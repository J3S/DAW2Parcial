$('#crearUsuario').click(function (event) {
        //event.preventDefault();
        var nombres = $("#nombres").val();
        var apellidos = $("#apellidos").val();
        var correo = $("#correo").val();
        var identificacion = $("#identificacion").val();
        var carrera = $("#carrera").val();
        var pass = $("#pass").val();
        var camposLlenos = 0;
        var campoNombres, campoApellidos, campoCorreos, campoIdentificacion, campoCarrera, campoPass;

        if (nombres === "") {
            $("#msg-nombres").removeClass("hidden");
            $("#nombres-group").addClass("has-error");
            campoNombres = 0;
        } else {
            $("#msg-nombres").addClass("hidden");
            $("#nombres-group").removeClass("has-error");
            campoNombres = 1;
        }

        if (apellidos === "") {
            $("#msg-apellidos").removeClass("hidden");
            $("#apellidos-group").addClass("has-error");
            campoApellidos = 0;
        } else {
            $("#msg-apellidos").addClass("hidden");
            $("#apellidos-group").removeClass("has-error");
            campoApellidos = 1;
        }

        if (correo === "") {
            $("#msg-correo").removeClass("hidden");
            $("#correo-group").addClass("has-error");
            campoCorreo = 0;
        } else {
            $("#msg-correo").addClass("hidden");
            $("#correo-group").removeClass("has-error");
            campoCorreo = 1;
        }

        if (identificacion === "") {
            $("#msg-identificacion").removeClass("hidden");
            $("#identificacion-group").addClass("has-error");
            campoIdentificacion = 0;
        } else {
            $("#msg-identificacion").addClass("hidden");
            $("#identificacion-group").removeClass("has-error");
            campoIdentificacion = 1;
        }

        if (carrera === "") {
            $("#msg-carrera").removeClass("hidden");
            $("#carrera-group").addClass("has-error");
            campoCarrera = 0;
        } else {
            $("#msg-carrera").addClass("hidden");
            $("#carrera-group").removeClass("has-error");
            campoCarrera = 1;
        }

        if (pass === "") {
            $("#msg-pass").removeClass("hidden");
            $("#pass-group").addClass("has-error");
            campoPass = 0;
        } else {
            $("#msg-pass").addClass("hidden");
            $("#pass-group").removeClass("has-error");
            campoPass = 1;
        }

        camposLlenos = campoNombres + campoApellidos + campoCorreo + campoIdentificacion + campoCarrera + campoPass;
        
        if (camposLlenos === 6) {
            $("#crearUsuario").attr("data-target","#myModal");
        }
});