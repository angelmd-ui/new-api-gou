// import mongoose,{Schema} from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {Schema,model} =  require('mongoose');
const TemaSchema = new Schema({
   usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
   titulo:{type:String},
   descripcion:{type:String},
   area:{type: Schema.Types.ObjectId,ref:'Area'},
   proceso:{type: Schema.Types.ObjectId,ref:'Proceso'},
   etiqueta:{type:Schema.Types.ObjectId,ref:'Etiqueta'},
   photo: {type:String},
   ranking:{type:Number,default:0},

},{versionKey:false})

// const Tema = model('Tema',TemaSchema);
const Tema = mongoose.model('Tema',TemaSchema);
module.exports = Tema;
// export default Tema;