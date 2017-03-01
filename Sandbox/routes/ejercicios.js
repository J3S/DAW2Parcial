var express = require('express'),
    http = require('http'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var PythonShell = require('python-shell');
var passport = require('passport');

var Ejercicio = require('../models/ejercicios');
var Dificultad = require('../models/dificultads');
var Etiqueta = require('../models/etiquetas');
var Usuario = require('../models/usuario');

const STATUS_ERROR = -1;
const STATUS_SUCCESS = 0;

/* 
        Página principal de ejercicios: Lista de ejercicios creados, 
        junto con las opciones de editar y eliminar, así como la
        opción de crear un ejercicio. 
*/
router.get('/', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
      return res.render('ejercicios/index', {user: req.user});
     } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

/* 
        Retorna json con todos los ejercicios guardados en la base
*/
router.get('/todos', function(req, res, next) {
    Ejercicio.find(function(err, ejercicios) {
        mensaje = {};
        if(err)
            mensaje = {status: STATUS_ERROR, contenido: err};
        else
            mensaje = {status: STATUS_SUCCESS, contenido: ejercicios}
        res.json(mensaje);
    });
});

/* 
       Página para crear un ejercicio
*/
router.get('/crear', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
    dificultades_enviar = [];
    etiquetas_enviar = [];
    Dificultad.find(function(err, dificultades) {
        if(!err)
            dificultades_enviar = dificultades;
        Etiqueta.find(function(err, etiquetas) {
            if(!err)
                etiquetas_enviar = etiquetas;
            data = {
                dificultades: dificultades_enviar,
                etiquetas: etiquetas_enviar,
                user: req.user
            };
            res.render('ejercicios/crear', data);
        });
    });
     } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.post('/crear', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
    Dificultad.findById(req.body.dificultad, function(err, dificultad) {
        if(err || typeof dificultad === undefined){
            return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al crear el ejercicio - La dificultad seleccionada no existe" }));
        }
        if (req.body.titulo === "" || req.body.descripcion === "" || req.body.salida === "" || JSON.parse(req.body.etiquetas).length === 0)
            return res.send(JSON.stringify({ estadoError: -1, contenidoMSG: "Error al crear el ejercicio - Uno o varios campos están vacíos" }));
        Usuario.findById(req.body.autor, function(err, usuario) {
            if(err || typeof usuario === undefined) {
                return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al crear el ejercicio - El usuario no existe" }));
            }
            var ejercicio = new Ejercicio();
            ejercicio.titulo = req.body.titulo;
            ejercicio.descripcion = req.body.descripcion;
            ejercicio.datosEntrada = JSON.parse(req.body.entradas);
            ejercicio.datosSalida = req.body.salida;
            ejercicio.etiquetas = JSON.parse(req.body.etiquetas);
            ejercicio.dificultad = dificultad;
            ejercicio.autor =usuario;

            ejercicio.save(function(err) {
                if(err)
                    return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al crear el ejercicio - Problemas con la base de datos"}));
                return res.send(JSON.stringify({ estadoError: false, contenidoMSG: "Ejercicio creado exitosamente"}));
            });
        });
    });
 } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.get('/editar/:id', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
    Ejercicio.findById(req.params.id, function(err, ejercicio) {
        if(err)
            return res.render('ejercicios/editar', {estadoBusqueda: false, contenido: "", dificultades: "", etiquetas: ""});
        Dificultad.find(function(err, dificultades_enviar) {
            if (err)
                return res.render('ejercicios/editar', {estadoBusqueda: false, contenido: "", dificultades: "", etiquetas: ""});
            Etiqueta.find(function(err, etiquetas_enviar) {
                if(err)
                    return res.render('ejercicios/editar', {estadoBusqueda: false, contenido: "", dificultades: "", etiquetas: ""});
                return res.render('ejercicios/editar', {estadoBusqueda: true, contenido: ejercicio, dificultades: dificultades_enviar, etiquetas: etiquetas_enviar, user: req.user});
            });
        });
    });
     } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.put('/editar/:id', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
    Ejercicio.findById(req.params.id, function(err, ejercicio) {
        if(err)
            return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al editar el ejercicio - El ejercicio no existe" }));
        Dificultad.findById(req.body.dificultad, function(err, dificultad) {
            if(err)
                return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al editar el ejercicio - La dificultad no existe" }));
            ejercicio.titulo = req.body.titulo;
            ejercicio.descripcion = req.body.descripcion;
            ejercicio.datosEntrada = JSON.parse(req.body.entradas);
            ejercicio.datosSalida = req.body.salida;
            ejercicio.etiquetas = JSON.parse(req.body.etiquetas);
            ejercicio.dificultad = dificultad;

            ejercicio.save(function(err) {
                if(err)
                    return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al editar el ejercicio - Problemas con la base de datos"}));
                return res.send(JSON.stringify({ estadoError: false, contenidoMSG: "Ejercicio editado exitosamente"}));
            });
        });
    });
    } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.delete('/borrar/:id', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Administrador' || req.user.rol === 'Profesor' || req.user.rol === 'Ayudante'){
    Ejercicio.remove({
        _id: req.params.id
    }, function(err, ejercicio) {
        if(err)
            return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al borrar el ejercicio - El ejercicio no existe" }));
        return res.send(JSON.stringify({ estadoError: false, contenidoMSG: "Ejercicio borrado exitosamente"}));
    });
    } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.get('/resolver', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Estudiante'){
    dificultades_enviar = [];
    etiquetas_enviar = [];
    Dificultad.find(function(err, dificultades) {
        if(!err)
            dificultades_enviar = dificultades;
        Etiqueta.find(function(err, etiquetas) {
            if(!err)
                etiquetas_enviar = etiquetas;
            data = {
                dificultades: dificultades_enviar,
                etiquetas: etiquetas_enviar,
                user: req.user
            };
            res.render('ejercicios/resolver', data);
        });
    });
    } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

router.get('/ejercicio_random', function(req, res, next) {
    var dificultad = req.query.dificultad;
    var etiqueta = req.query.etiqueta;
    Ejercicio.find({"dificultad.nombre": dificultad, "etiquetas.valor": etiqueta}, function(err, ejercicios) {
        var randomIndex = Math.floor(Math.random() * ((ejercicios.length-1) - 0 + 1)) + 0;
        if(err)
            return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "Error al buscar ejercicios - Problemas con la base de datos" }));
        if(ejercicios.length > 0) {
            return res.send(JSON.stringify({ estadoError: false, contenidoMSG: ejercicios[randomIndex]}));
        } else {
            return res.send(JSON.stringify({ estadoError: true, contenidoMSG: "No se ha encontrado ningún ejercicio que tenga estos dos campos"}));
        }
    });
});

router.post('/resolver', function(req, res, next) {
  if(req.user){
    if(req.user.rol === 'Estudiante'){
    var form = new formidable.IncomingForm();
    var argumentos = [];
    var salida = "";
    form.on('field', function (field, value) {
        if(field === 'entradas') {
            argumentos = value.split(',');
        }
        else salida = salida + value;
    });
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        var old_path = files.file.path,
            file_size = files.file.size,
            file_ext = files.file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);
            var ruta = new_path.split('/uploads')[1];
            if(file_ext === '') {
                res.status(200);
                return res.json({'estado': false, mensaje: "Error al leer el archivo"});
            }

        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(200);
                        return res.json({'estado': false, mensaje: "Error al leer el archivo"});
                    } else {
                        var options = {
                            mode: 'text',
                            args: argumentos
                        };

                        PythonShell.run('/uploads' + ruta, options, function (err, results) {
                            if (err) {
                                res.status(200);
                                return res.json({'estado': false, mensaje: "Hay errores en el código del archivo"});
                            }
                            if (results[0] === salida) {
                                res.status(200);
                                return res.json({'estado': true, mensaje: "El código subido es correcto"});
                            } else {
                                res.status(200);
                                return res.json({'estado': false, mensaje: "El código subido es incorrecto, no coincide con la respuesta"});
                            }
                        });
                    }
                });
            });
        });
    });
    } else {
      return res.render('nopermitido');
    }
  } else {
    return res.render('nopermitido');
  }
});

module.exports = router;