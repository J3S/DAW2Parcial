var express = require('express');
var router = express.Router();
var Cursos = require('../models/cursos');
var Usuarios = require('../models/usuario');


/* GET home page. */
router.get('/', function(req, res, next) {
  Cursos.getCursos(function(e, curs){
  		//console.log(users);
		res.render('cursos/index', {cursos: curs});
	});
});

router.get('/crear', function(req, res, next) {
	res.render('cursos/crear');	
});

router.get('/crear/obtener', function(req, res, next) {
	Usuarios.getUsuarios(function(e, users){
  		//console.log(users);
		res.json(users);
	});	
});

router.post('/crear', function(req, res, next) {
  
  var profesor = req.param('profesor');
  var paralelo = req.param('paralelo');
  var estudiantes = JSON.parse(req.param('est'));
  console.log(estudiantes);
  	var curso = new Cursos ({
      profesor: profesor,
      paralelo: paralelo,
      estudiantes: estudiantes
    });

    // Saving it to the database.
    curso.save(function (err) {if (err) console.log ('Error on save!')});
    console.log("guardado con exito");
});

router.get('/lista/:_id', function(req, res, next){
  Cursos.findById(req.params._id, function(err, curs) {
    if (err){
      throw err;
    }else{
      console.log(curs);
      res.render('cursos/lista', {cursos: curs});
    }        
  });    
});

router.get('/lista/obtener/:_id', function(req, res, next){
  Cursos.findById(req.params._id, function(err, curs) {
    if (err){
      throw err;
    }else{
      console.log(curs);
      res.render('cursos/lista', {cursos: curs});
    }        
  });    
});

module.exports = router;