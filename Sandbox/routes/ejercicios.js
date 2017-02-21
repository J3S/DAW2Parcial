var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Ejercicio = require('../models/ejercicios');
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
    Dificultad.findById(req.body.dificultad, function(err, dificultad) {
        console.log(dificultad);
        if(err || typeof dificultad === undefined){
            return res.send(JSON.stringify({ estado: -1, contenido: "Error al crear el ejercicio" }));
        }
        if (req.body.titulo === "" || req.body.descripcion === "" || req.body.salida === "" || JSON.parse(req.body.etiquetas).length === 0)
            return res.send(JSON.stringify({ estado: -1, contenido: "Error al crear el ejercicio" }));

        var ejercicio = new Ejercicio();
        ejercicio.titulo = req.body.titulo;
        ejercicio.descripcion = req.body.descripcion;
        ejercicio.datosEntrada = JSON.parse(req.body.entradas);
        ejercicio.datosSalida = req.body.salida;
        ejercicio.etiquetas = JSON.parse(req.body.etiquetas);
        ejercicio.dificultad = dificultad;

        ejercicio.save(function(err) {
            if(err)
                return res.send(JSON.stringify({ estado: -1, contenido: "Error al crear el ejercicio"}));
            return res.send(JSON.stringify({ estado: 0, contenido: "Ejercicio creado exitosamente"}));
        })
    });
});

module.exports = router;