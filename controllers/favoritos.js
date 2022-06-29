import Favoritos from "../models/favoritos.js";


//agregar favoritos
const favoritosPost = async (req,res)=>{
    const {usuario,pelicula} = req.body
    const favoritos = new Favoritos ({usuario,pelicula})
    
    await favoritos.save()

    res.json({
       favoritos
    })
}

//buscar todos los favoritos
const favoritosget = async(req,res)=>{
    const favoritos = await Favoritos.find()
    .populate("usuario","nombre")
    .populate("pelicula",["titulo","imagen"])
    
   
    res.json({favoritos   })
  

 
}
//buscar favoritos por id
const favoritosGetBuscarid = async(req,res)=>{
    const {id} = req.params
    const favoritos = await Favoritos.findById(id)
    res.json({
        favoritos
    })
}

//eliminar favoritos
const favoritosDelete = async(req,res)=>{
    const {pelicula} = req.query
    const favoritos = await Persona.findOneAndDelete({pelicula})
   
    res.json({" pelicula eliminada de favoritos":favoritos   })
  

 
}
//   duda 'Pelicula' o 'Peliculas' va del modelo schema el nombre?
//   o va del modelo de favoritos
// buscar favoritos 
const favoritosGetBuscar = async(req,res)=>{
    const {titulo} = req.query
    const favoritos = await Favoritos.find({        
        $or:[
            {titulo: new RegExp(titulo,"i")},
            {subtitulo: new RegExp(titulo,"i")},
        ]
    })
    res.json({
        favoritos

    })
} 

export {favoritosPost,favoritosDelete,favoritosget,favoritosGetBuscarid,favoritosGetBuscar}