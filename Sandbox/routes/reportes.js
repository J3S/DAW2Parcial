var express = require('express');
var router = express.Router();

var EjercicioResuelto = require('../models/ejerciciosresuelto');
var EstudianteEjercicio = require('../models/estudianteejercicio');
var Cursos = require('../models/cursos');
var Usuario = require('../models/usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.user) {
    if (req.user.rol === 'Administrador')
        return res.render('reportes/index', {'user': req.user});
    else
        return res.render('nopermitido');
    } else
        return res.redirect('/login');
});

function dateConvert(dateobj,format){
  var year = dateobj.getFullYear();
  var month= ("0" + (dateobj.getMonth()+1)).slice(-2);
  var date = ("0" + dateobj.getDate()).slice(-2);
  var hours = ("0" + dateobj.getHours()).slice(-2);
  var minutes = ("0" + dateobj.getMinutes()).slice(-2);
  var seconds = ("0" + dateobj.getSeconds()).slice(-2);
  var day = dateobj.getDay();
  var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  var dates = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  var converted_date = "";

  switch(format){
    case "YYYY-MM-DD":
      converted_date = year + "-" + month + "-" + date;
      break;
    case "YYYY-MMM-DD DDD":
      converted_date = year + "-" + months[parseInt(month)-1] + "-" + date + " " + dates[parseInt(day)];
      break;
  }

  return converted_date;
}

var date=new Date();
var format = "YYYY-MM-DD";
var strfecha;

router.get('/tiempo', function(req, res, next) {
    strfechaActual = dateConvert(date,format);
    var labels = [];
    var numero = [];
    var fechasBusqueda = [];
    var dias  = req.query.dias;
    if (req.user) {
        if (req.user.rol === 'Administrador'){
            for (var i = 0; i < dias; i++) {
                var fechaCambiante = new Date(strfechaActual);
                fechaCambiante.setDate(fechaCambiante.getDate() - (dias-2-i));
                fechasBusqueda.push(dateConvert(fechaCambiante,format));
            }
            EjercicioResuelto.getReporteEjercicios(fechasBusqueda, function(err, resultados) {
                resultados.reverse();
                if (resultados.length > 0) {
                    for (var i = 0, len = resultados.length; i < len; i++) {
                        labels.push(resultados[i].fecha);
                        numero.push(resultados[i].numejercicio);
                    }
                }
                return res.send(JSON.stringify({ linechart: {labels: labels, data: numero}})); 
            });
        } else
            return res.render('nopermitido');
    } else
        return res.redirect('/login');
});

router.get('/paralelos', function(req, res, next) {
  var numero_paralelos = 0;
  var num_estudiantes_paralelo = [];
  var num_ejercicios_resueltos_paralelo = [];
  var idEstudiantesParalelo = [];
  var nombres_paralelo = [];
  var apellidos_paralelo = [];
  var nombres = [];
  var apellidos = [];   
  var datos = [];
  var paralelo = [];
  Cursos.find(function(err, cursos) {
    if(cursos.length > 0) {
      numero_paralelos = cursos.length;
      for (var i = 0; i < cursos.length; i++) {
        paralelo = cursos[i].paralelo;
        var estudiantes = cursos[i].estudiantes.split(',');
        num_estudiantes_paralelo.push(estudiantes.length);
        nombres = [];
        apellidos = [];
        for (var j = 0; j < estudiantes.length; j++) {
          var nombreEstudiante = estudiantes[j].split(' ');
          if (nombreEstudiante.length <= 3) {
            nombres.push(nombreEstudiante[0]);
            apellidos.push(nombreEstudiante[1] + ' ' + nombreEstudiante[2]);
          } else {
            nombres.push(nombreEstudiante[0] + ' ' + nombreEstudiante[1]);
            apellidos.push(nombreEstudiante[2] + ' ' + nombreEstudiante[3]);
          }
        }
        nombres_paralelo.push(nombres);
        apellidos_paralelo.push(apellidos);  
      }
        for (var k = 0; k < nombres_paralelo.length; k++) {
            Usuario.getUsuarioNombre(nombres_paralelo[k], apellidos_paralelo[k], function(err, estudiante) {
              var idEstudiantes = [];
              if(estudiante.length > 0) {
                for (var i = 0; i < estudiante.length; i++) {
                  idEstudiantes.push(estudiante[i]._id);
                }
                idEstudiantesParalelo.push(idEstudiantes);
              }
              if(idEstudiantesParalelo.length == nombres_paralelo.length) {
                for (var l = 0; l < idEstudiantesParalelo.length; l++) {
                  for (var m = 0; m < idEstudiantesParalelo[l].length; m++) {
                    console.log("IDDDDDDDDDDDDDDDDDDDD")
                    console.log(idEstudiantesParalelo[l][m]);
                    EstudianteEjercicio.getEstudianteEjercicio(idEstudiantesParalelo[l][m], function(err, estud) {
                      console.log("ESTUDIANTEEEEEEEEEEEEEEEEEEE")
                      console.log(estud);
                      if(estud.length > 0)
                        num_ejercicios_resueltos_paralelo[l] = estud[0].idEjercicios.length;
                    });
                  }
                }
              console.log("FINALLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
              console.log(num_ejercicios_resueltos_paralelo);
              }
            });
        }







        return res.send(JSON.stringify({ estadoMostrar: true, contenidoMSG: "No hay cursos registrados"}));
    } else {
      return res.send(JSON.stringify({ estadoMostrar: false, contenidoMSG: "No hay cursos registrados"}));
    }
  });
});

module.exports = router;