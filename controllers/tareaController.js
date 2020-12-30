const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


//Crea una nueva tarea

exports.crearTarea = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el proyecto y comprobar si existe
    
    try {
        
        // const { proyecto } = req.body;  
        // const existeProyecto = await Proyecto.findById(proyecto);
        // if(!existeProyecto) {
        //     return res.status(404).json({msg: 'Proyecto no encontrado'});
        // }

        //Revisar el creador existe o no
        // if(existeProyecto.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No autorizado'})
        // }
        
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

//Obtener las tareas por funcion


//Obtiene las tareas por proyecto

exports.obtenerTareas = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el proyecto y comprobar si existe
    
    try {
        
        // const { proyecto } = req.query;
        const {proyecto} = req.query;
        if(proyecto){
            // const {funcion, ubicacion, estado} = req.query;

            // { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
            console.log(proyecto);

            // console.log(funcion);
            // console.log(ubicacion);
            // console.log(estado);

            const tareas = await Tarea.find({$or: [ 
                { funcion: proyecto }, 
                { ubicacion: proyecto, },
                { estado: proyecto, }

            ]}
                );

            // const tareas = await Tarea.find(proyecto);
         
     
            return res.json({tareas})

        }
        console.log("HIIII");
        const tareas2 = await Tarea.find();
        return res.json({tareas2})


        // const existeProyecto = await Proyecto.findById(proyecto);
        // if(!existeProyecto) {
        //     return res.status(404).json({msg: 'Proyecto no encontrado'});
        // }

        // //Revisar el creador existe o no
        // if(existeProyecto.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No autorizado'})
        // }
        
        //Obtener las tareas por proyecto
  




    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

//actualizar Tarea

exports.actualizarTarea = async (req, res) => {
    
    try {
        
        const { nombre, estado} = req.body;  
        let tareaExiste = await Tarea.findById(req.params.id);
        
        if(!tareaExiste){
            return res.status(404).json({msg: 'NO existe tarea'});
            
        }
        // const existeProyecto = await Proyecto.findById(proyecto);
        //Revisar el creador existe o no
        // if(existeProyecto.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No autorizado'})
        // }

        
        //Crear objeto con la nueva información
        const nuevaTarea = {};
        //Guardar tarea
        
        
    
            nuevaTarea.nombre = nombre;
        
      
            nuevaTarea.estado = estado;
     
        tareaExiste = await Tarea.findOneAndUpdate({_id:req.params.id}, nuevaTarea, {new:true});

        res.json({tareaExiste});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

//Eliminar Tarea
exports.eliminarTarea = async (req, res) => {
    
    try {
        
        // const { proyecto } = req.query;  
        let tareaExiste = await Tarea.findById(req.params.id);
        
        if(!tareaExiste){
            return res.status(404).json({msg: 'NO existe tarea'});
            
        }
        // const existeProyecto = await Proyecto.findById(proyecto);
        // //Revisar el creador existe o no
        // if(existeProyecto.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No autorizado'})
        // }
        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}