import opinion from "../models/opinion.js";
import 'swagger-ui-express';
import 'swagger-jsdoc';

const controlador={}

controlador.listado= async (req,res)=>{
    console.log("Ejecutando el FIND")
    const opiniones= await opinion.find()
    res.json(opiniones)
    console.log(opiniones)
}



controlador.uno= async (req,res)=>{
    console.log("Consulta individual comentarios")
    const Uopinion= await opinion.findById(req.params.id)
    res.json(Uopinion)
    
        
}





controlador.registrar= async (req,res)=>{

    const {comentario, nc}=req.body;
    const nuevaOpinion = new opinion({comentario,nc});

    console.log(nuevaOpinion)
    await nuevaOpinion.save();
    res.send("Se creo nueva opinion")
}


//editar
controlador.actualizar= async (req,res)=>{
    
    console.log("Actualizando Opinion")
    await opinion.findByIdAndUpdate(req.params.id, req.body)
    res.json({"status":"Opinion Actualizada"})
}

//eliminar
controlador.eliminar= async (req,res)=>{
    console.log("Eliminando Opinion")
    await opinion.findByIdAndDelete(req.params.id)
    res.json({"status":"Opinion Eliminada"})
}


export default controlador