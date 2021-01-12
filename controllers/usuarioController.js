const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer email y password
    const {email,password} = req.body;

    try{

        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }


        //creaer el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el pasword
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000
        }, (error, token) =>{
            if(error) throw error;
            res.json({token});
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.obtenerUsuarios = async (req, res) => {

    try {
        const usuarios = await Usuario.find();
        res.json({usuarios})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

exports.eliminarUsuario = async (req,res) =>{
    try {
        let usuarioExiste = await Usuario.findById(req.params.id);

        if(!usuarioExiste){
            return res.status(404).json({msg: 'No existe usuario'});
        }

        await Usuario.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Usuario Eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un errro')
    }
}