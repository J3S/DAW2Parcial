var mongoose=require('mongoose');

var UsuarioSchema=new mongoose.Schema({
  nombres:String,
  apellidos:String,
  correo:String,
  rol:String ,
  tipoid:String,
  identificacion:String,
  carrera:String,
  password:String
}, { versionKey: false, collection: 'usuario'});

var usuario = module.exports = mongoose.model("usuario",UsuarioSchema);

module.exports.getUsuarios = function(callback, limit){
  usuario.find(callback).limit(limit);
}

module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	usuario.remove(query, callback);
}