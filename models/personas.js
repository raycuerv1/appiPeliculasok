import mongoose from "mongoose";

const PersonaSchema = new mongoose.Schema({
    nombre:{type:String,maxlength:25,required:true},
    email:{type:String,maxlength:50,required:true,unique:true},
    password:{type:String,required:true,minlength:8},
    estado:{type:Number,default:1} ,
    foto:{type:String}       
})

export default mongoose.model("Persona",PersonaSchema) 