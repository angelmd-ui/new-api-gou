const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let validRoles = {
  values: ['TEACHER','STUDENT','ADMIN'],
  message: '{VALUE} no es un rol válido' 
}

const UsuarioSchema = new Schema({
  username: {type:String},
  people_code_id:{type:String},
  programa: {type: Schema.Types.ObjectId, ref: 'Programa'},
  password: {type:String},
  photo: {type:String},
  about: {type:String},
  role:{
      type:String,
      default:'ADMIN',
      enum:validRoles
  }
},{versionKey:false})

// exports models
const Usuario=mongoose.model('Usuario',UsuarioSchema);
module.exports=Usuario;


