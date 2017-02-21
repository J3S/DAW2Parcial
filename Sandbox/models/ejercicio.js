var mongoose = require('mongoose');

var ejercicioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    datosEntrada: {type: Array, 'default': []},
    datosSalida: {type: Array, 'default': []},
    etiquetas: {type: Array, 'default': [{}]},
    dificultad: {},
    autor: {}
});

module.exports = mongoose.model('Ejercicio', ejercicioSchema);