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

//pagina de crear curso
router.get('/crear', function(req, res, next) {
	res.render('cursos/crear');	
});

//obtener los usuarios para input autocompletar
router.get('/crear/obtener', function(req, res, next) {
	Usuarios.getUsuarios(function(e, users){
  		//console.log(users);
		res.json(users);
	});	
});

//guardar curso en la base de datos
router.post('/crear', function(req, res, next) {
  
  var profesor = req.param('profesor');
  var paralelo = req.param('paralelo');
  var estudiantes = req.param('est');
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

//pagina de lista de estudiantes 
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

//obtener lista de estudiantes 
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

//eliminar cursoo
router.get('/:_id', function(req, res, next){
  var id = req.params._id;
  Cursos.removeCurso(id, (err, curso) => {
    if(err){
      throw err;
    } else {
      res.redirect('/cursos/');
    }
  });
});

//editar curso
router.get('/editar/:_id', function(req, res, next){
  Cursos.findById(req.params._id, function(err, curso) {
    if (err){
      throw err;
    }else{
      console.log(curso);
      res.render('cursos/editar', {cursos: curso});
    }        
  });    
});

router.post('/editar/:_id', function(req, res, next) {
  Cursos.findById(req.params._id, function(err, curso) {
    if (err){
      throw err;
    }else{
      curso.profesor = req.param('profesor');
      curso.paralelo = req.param('paralelo');
      curso.estudiantes = req.param('est');

      curso.save(function (err) {if (err) console.log ('Error on save!')});
      console.log("actualizado con exito");
    }        
  });  
});

module.exports = router;