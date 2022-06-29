import Personas from "../models/personas.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

//agregar persona
const personaPost = async (req, res) => {
  const {nombre,email, password  } = req.body;
  let salt = bcryptjs.genSaltSync(10);
  const persona = new Personas({ nombre, email, password });
  persona.password = bcryptjs.hashSync(password, salt);
  await persona.save();

  res.json({
    msg: "registro exitoso",
  });
};
// loguearse
const personaGetlogin = async (req, res) => {
  let { email, password } = req.query;

  const persona = await Personas.findOne({ email });

  if (!persona) res.json({ msg: "Usuario no encontrado" });
  else {
    const validPassword = bcryptjs.compareSync(password, persona.password);

    if (validPassword) {
      const token = await generarJWT(persona.id);
      res.json({
        persona,
        token,
      });
    } else {
      res.json({ msg: "Usuario no encontrado" });
    }
  }
};

// insertar foto a la persona
// const personasfotoPost = async (req, res) => {
//   const { id } = req.params;
//   const { foto } = req.body;
//   const personaFoto = await Personas.findByIdAndUpdate(id, { foto });
//   res.json({
//     msg: "actualizacion exitosa",
//   });
// };

// 
const cargarArchivoPersonas = async (req, res) => {
  const { id } = req.params;
  try {
      let nombre
      await subirArchivo(req.files, undefined)
          .then(value => nombre = value)
          .catch((err) => console.log(err));

      //persona a la cual pertenece la foto
      let personas = await Personas.findById(id);
      //si la persona ya tiene foto la borramos
      if (personas.foto) {
          const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
          const pathImage = path.join(__dirname, '../uploads/', personas.foto);//ponemos el nombre de la carpeta en la cual almacenamos la imagen
          
          if (fs.existsSync(pathImage)) {               
              fs.unlinkSync(pathImage)
          }
          
      }
     
      personas = await Personas.findByIdAndUpdate(id, { foto: nombre })
      //responder
      res.json({ nombre });
  } catch (error) {
      res.status(400).json({ error, 'general': 'Controlador' })
  }

}

// buscar persona por id
const personasGetBuscarid = async (req, res) => {
  const { id } = req.params;
  const persona = await Personas.findById(id);
  res.json({
    persona,
  });
};

// buscar todas las personas
const personaGetBuscar = async (req, res) => {
  const persona = await Personas.find({});
  res.json({
    persona,
  });
};

// buscar persona por NOMBRE e EMAIL
const personasGetBuscarNoE = async (req, res) => {
  const { value } = req.query;
  const persona = await Personas.find({
    $or: [
      { nombre: new RegExp(value, "i") },
      { email: new RegExp(value, "i") },
    ],
  });
  res.json({
    persona,
  });
};

// editar personas
const personasPutEditar = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, estado, foto } = req.body;
  const persona = await Personas.findByIdAndUpdate(id, {
    nombre,
    email,
    password,
    estado,
    foto,
  });
  res.json({
    msg: "actualizacion de datos exitosa",
  });
};

// ACTIVAR personas
const personasPutActivar = async(req,res)=>{
    const {id} = req.params
    const persona = await Personas.findByIdAndUpdate(id,{estado:1})
    res.json({
       msg: "activacion de estado exitosa"

    })
}

// INACTIVAR personas
const personasPutInactivar = async(req,res)=>{
    const {id} = req.params
    const persona = await Personas.findByIdAndUpdate(id,{estado:0})
    res.json({
       msg: "activacion de estado exitosa"

    })
}

export {
  personaGetlogin,
  personaPost,
  cargarArchivoPersonas,
  personasGetBuscarid,
  personaGetBuscar,
  personasGetBuscarNoE,
  personasPutEditar,personasPutActivar,personasPutInactivar,
};
