//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear un usuarios
// api /usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],  
    usuarioController.crearUsuario
);

//Obtener los usuarios
router.get('/', 
    auth,
    usuarioController.obtenerUsuarios
);

//Eliminar Usuarios
router.delete('/:id',
    auth,
    usuarioController.eliminarUsuario

)
module.exports = router;