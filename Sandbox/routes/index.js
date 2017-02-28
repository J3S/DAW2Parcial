var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    console.log(req.user.rol);
    console.log(req.user.rol === 'Estudiante');
    console.log(req.user.rol === 'Profesor' || req.user.rol === 'Ayudante');
    console.log(req.user.rol === 'Administrador');
    if (req.user.rol === 'Estudiante')
        return res.redirect('/ejercicios/resolver');
    else if (req.user.rol === 'Profesor' || req.user.rol === 'Ayudante')
        return res.redirect('/ejercicios')
    else if(req.user.rol === 'Administrador')
        return res.redirect('/usuarios')
    else
        return res.redirect('/login');
});

module.exports = router;
