var mongoose = require('mongoose');

var estudianteejercicioSchema = new mongoose.Schema({
    idEstudiante: String,
    idEjercicios: []
});

module.exports = mongoose.model('EstudianteEjercicio', estudianteejercicioSchema);