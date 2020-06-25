const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let validRoles = {
   values: ['TEACHER','STUDENT'],
   message: '{VALUE} no es un rol válido' 
}
const TeacherSchema = new Schema({
    username: {type:String},
    password: {type:String},
    photo: {type:String},
    profession: {type:String},
    about: {type:String},
    role:{
        type:String,
        default:'TEACHER',
        enum:validRoles
    }
},{versionKey:false})

TeacherSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único'})
const Teacher = mongoose.model('Teacher',TeacherSchema);
module.exports = Teacher;



/* Nota: 
   1. La profesión se seleccionara mediante  un select o, si digita mediante un cuadro de texto
   2. Si el campo about existe la profesión se hace redundante
*/