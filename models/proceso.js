// const {Schema,model} =  require('mongoose');
// const mongoose,{Schema} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProcesoSchema = new Schema({
    area:{type: Schema.Types.ObjectId,ref:'Area'},
    nombre:{type:String},
    icono:{type:String},
    descripcion:{type:String}
},{versionKey:false})

// const Proceso = model('Proceso',ProcesoSchema);
const Proceso = mongoose.model('Proceso',ProcesoSchema);
module.exports = Proceso;