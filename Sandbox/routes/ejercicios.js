var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Ejercicio = require('../models/ejercicio');
var Dificultad = require('../models/dificultads');
var Etiqueta = require('../models/etiqueta');

const STATUS_ERROR = -1;
const STATUS_SUCCESS = 0;

/* 
        Página principal de ejercicios: Lista de ejercicios creados, 
        junto con las opciones de editar y eliminar, así como la
        opción de crear un ejercicio. 
*/
router.get('/', function(req, res, next) {
    res.render('ejercicios/index');
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
                etiquetas: etiquetas_enviar
            };
            res.render('ejercicios/crear', data);
        });
    });
});

router.post('/crear', function(req, res, next) {
    console.log(req.body);
    res.json({msg: 'Exito'});
});

module.exports = router;