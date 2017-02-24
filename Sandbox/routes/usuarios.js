var express = require('express');
var router = express.Router();
var Usuarios = require('../models/usuario');
var nodemailer = require('nodemailer');

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
    var smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      host: "smtp.gmail.com",
      auth:{
        user: 'webfundamentos@gmail.com',
        pass: 'fundamentosdaw'
      }
    });

    var mivariable = '<p>Hola, esta es tu contraseña temporal para el sitio web de fundamentos de programación: '+ password + '<p>';

    var mailOptions={
      from: 'PAGINA FUNDAMENTOS',
      to: correo,
      subject: 'Contraseña Cuenta',
      text: password,
      html: mivariable
      
    }
    smtpTransport.sendMail(mailOptions, function(err, resp){
      if(err){
        console.log(err);
      } else{
        console.log("enviado con exito");
      }
    });

 });

router.get('/:_id', function(req, res, next){
  var id = req.params._id;
  Usuarios.removeUser(id, (err, usuario) => {
    if(err){
      throw err;
    } else {
      res.redirect('/usuarios/');
    }
  });
});

router.get('/editar/:_id', function(req, res, next){
  Usuarios.findById(req.params._id, function(err, user) {
    if (err){
      throw err;
    }else{
      console.log(user);
      res.render('usuarios/editar', {usuarios: user});
    }        
  });    
});

router.post('/editar/:_id', function(req, res, next) {
  Usuarios.findById(req.params._id, function(err, user) {
    if (err){
      throw err;
    }else{
      user.nombres = req.param('nombres');
      user.apellidos = req.param('apellidos');
      user.correo = req.param('correo');
      user.rol = req.param('rol');
      user.tipoid = req.param('tipoid');
      user.identificacion = req.param('identificacion');
      user.carrera = req.param('carrera');
      user.password = req.param('password');
      user.save(function (err) {if (err) console.log ('Error on save!')});
      console.log("actualizado con exito");
    }        
  });  
});

module.exports = router;
