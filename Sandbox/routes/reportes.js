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

var contador;
var contador_final = 0;
var num_ejercicios_resueltos_paralelo;
var paralelo = [];
var num_total_ejercicios = 0;

function promiseObtenerEjerciciosParalelo(id_Estudiante, index_l, index_m, res, arreglo) {
                      EstudianteEjercicio.getEstudianteEjercicio(id_Estudiante, function(err, estud) {
                      if(estud.length > 0){
                        num_total_ejercicios = num_total_ejercicios + estud[0].idEjercicios.length; 
                        arreglo[index_l] = arreglo[index_l] + estud[0].idEjercicios.length;
                        contador += 1;
                      if (contador_final === contador) {
                        var retorno = { estadoMostrar: true, knobChart: {data: arreglo, labels: paralelo, total: num_total_ejercicios}};
                        return res.send(JSON.stringify(retorno));
                      }
                        return new Promise(function(fulfill, reject) {
                          fulfill(estud[0].idEjercicios.length);
                        });
                      } else {
                        contador += 1;
                        arreglo[index_l] = arreglo[index_l] + 0;
                      if (contador_final === contador) {
                        var retorno = { estadoMostrar: true, knobChart: {data: arreglo, labels: paralelo, total: num_total_ejercicios}};
                        return res.send(JSON.stringify(retorno));
                      }
                        return new Promise(function(fulfill, reject) {
                          fulfill(0);
                        });
                      }
                    });
}

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
  paralelo = [];
  Cursos.find(function(err, cursos) {
    if(cursos.length > 0) {
      numero_paralelos = cursos.length;
      for (var i = 0; i < cursos.length; i++) {
        paralelo[i] = cursos[i].paralelo;
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
                var l;
                var m;
                var v1 = idEstudiantesParalelo.length-1; 
                var v2 = idEstudiantesParalelo[v1].length-1;
                contador_final = (v1+1) * (v2+1);
                contador = 1;
                num_total_ejercicios = 0;
                num_ejercicios_resueltos_paralelo = new Array(idEstudiantesParalelo.length + 1).join('0').split('').map(parseFloat);
                for (l = 0; l < idEstudiantesParalelo.length; l++) {
                  for (m = 0; m < idEstudiantesParalelo[l].length; m++) {
                    if(m == 0)
                      num_ejercicios_resueltos_paralelo[l] = 0;
                    contador = 0;
                    var ne = promiseObtenerEjerciciosParalelo(idEstudiantesParalelo[l][m], l, m, res, num_ejercicios_resueltos_paralelo);
                  }
                }
              }
            });
        }
    } else {
      return res.send(JSON.stringify({ estadoMostrar: false, contenidoMSG: "No hay cursos registrados"}));
    }
  });
});

module.exports = router;