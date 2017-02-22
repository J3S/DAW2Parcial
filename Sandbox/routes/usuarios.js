var express = require('express');
var router = express.Router();
var Usuarios = require('../models/usuario');

/* GET home page. */
router.get('/', function(req, res, next) {
  	Usuarios.getUsuarios(function(e, users){
  		//console.log(users);
		res.render('usuarios/index', {usuarios: users});
	});
});

router.get('/crear_user', function(req, res, next) {
	res.render('usuarios/crear_user');
});

router.post('/crear_user', function(req, res, next) {
  
  var nombres = req.param('nombres');
  var apellidos = req.param('apellidos');
  var correo = req.param('correo');
  var rol = req.param('rol');
  var tipoid = req.param('tipoid');
  var identificacion = req.param('identificacion');
  var carrera = req.param('carrera');
  var password = req.param('password');
  	var usuario = new Usuarios ({
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      rol: rol,
      tipoid: tipoid, 
      identificacion: identificacion,
      carrera: carrera, 
      password: password
    });

    // Saving it to the database.
    usuario.save(function (err) {if (err) console.log ('Error on save!')});
    console.log("guardado con exito");
    //res.render('usuarios/index')

 });

router.delete('/:_id', function(req, res, next){
	console.log("eliminaaaaaaaaaaaaaaaaaaaar");
	var id = req.params._id;
	Usuarios.removeUser(id, (err, usuario) => {
		if(err){
			throw err;
		}
		res.json(usuario);
		console.log("se elimino pe");
	});
});

module.exports = router;
