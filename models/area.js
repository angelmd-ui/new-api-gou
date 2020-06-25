// const {Schema,model} =  require('mongoose');
// const mongoose,{Schema} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AreaSchema = new Schema({
    nombre:{type:String},
    icono:{type:String},
    descripcion:{type:String}
},{versionKey:false})

// const Area = model('Area',AreaSchema);
const Area = mongoose.model('Area',AreaSchema);
module.exports = Area;