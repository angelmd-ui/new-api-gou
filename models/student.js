const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
let validRoles = {
   values: ['STUDENT','TEACHER'],
   message: '{VALUE} no es un rol válido'
}
const StudentSchema = new Schema({
   username: {type:String},
   password: {type:String},
   photo: {type:String},
   about: {type:String},
   study:{type:String},
   // rol:{type:String}
   role:{
      type: String,
      default:'STUDENT',
      enum: validRoles
   }
},{versionKey:false})

StudentSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único'})
const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;
