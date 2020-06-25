// const {Schema,model} =  require('mongoose');
// const mongoose,{Schema} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const commentsSchema = new Schema({
  comentario:{
      type:String
  },

  author:{
      type:Schema.Types.ObjectId,
      ref:'Usuario'

    }
});

const AporteSchema = new Schema({
 usuario:{type: Schema.Types.ObjectId,ref:'Usuario'},
 titulo:{type:String},
 area:{type: Schema.Types.ObjectId,ref:'Area'},
 proceso:{type: Schema.Types.ObjectId,ref:'Proceso'},
 timestamp:{type:Date},
 comentario:[commentsSchema]

},{versionKey:false})



// const Post = model('Post',PostSchema);  
const Aporte = mongoose.model('Aporte',AporteSchema);
module.exports = Aporte;