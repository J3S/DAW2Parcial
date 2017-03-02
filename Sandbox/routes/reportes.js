var express = require('express');
var router = express.Router();

var EjercicioResuelto = require('../models/ejerciciosresuelto');

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

module.exports = router;