//import models Usuario
const Usuario=require('../models/usuario');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const cloudinary = require('cloudinary').v2;
require('dotenv').config();
require('../config/cloudinaryConfig_v_2.js')

getUsuarios=(req,res)=> {
       
    // Payload 
    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    })*/

    Usuario.find()
    .exec((err,usuarios)=>{
        if(err){
            res.status(500).send({
                message:`No existen usuarios ${err}`
            })
        }
        if(!usuarios){ 
            res.status(404).send({
                message:'NO existen usuarios'
            })
        }
        res.status(200).send({usuarios})
    })
};

 getUsuario=(req,res)=>{
    let {id}=req.params;
    Usuario.findById(id,(err,usuario)=>{
       if(err){
           res.status(500).json({
               message:`Error al mostrar el usuario ${err}`
           })
       }
       if(!usuario){
           res.status(404).json({
               message:'No existe el usuario'
           })
       }else{
           res.status(200).json({
               usuario
           })
       }
    })
};

 createUser = async (req,res,next) =>{

    let body = req.body;
    
       
       
    const  usuario=new Usuario({
            people_code_id:body.people_code_id,
            username:body.username,
            password: bcrypt.hashSync(body.password,10),
            programa:body.programa,
            about:body.about,
            role: body.role
        });
  
    usuario.save((err,usuario)=>{ 
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        res.json(usuario)
    })
 }

 deleteUsuario=(req,res)=>{
    let {id}=req.params; 
    Usuario.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }else{
            res.status(200).json({
                message:`El usuario ${id} ha sido eliminado con exito`
                // message:'El usuario ha sido eliminado con exito'
            })
        }
    })
};

 updateUsuario=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Usuario.findByIdAndUpdate(id,update,{new:true},(err,usuarioUpdated)=>{
        if(err){
            res.status(500).json({
                message:`Error al realizar la petición ${err}`
            })
        }
        res.status(200).json({
            usuario:usuarioUpdated
        })
    })
};


//  Ruta Login :)
login = (req,res)=>{
   let body = req.body;
   Usuario.findOne({ $and :[{username: req.body.username},{role: req.body.role}]})
   .exec((err,usuarioDB)=>{
       if(err){
           return res.status(500).json({
               ok:false,
               err
           });
       }
       if(!usuarioDB){
          return res.status(400).json({
              ok:false,
              err: {
                  message: '(Usuario) o contraseña incorrectos'
              }
          });
       }
       // Si las password no son iguales
       if(!bcrypt.compareSync(body.password,usuarioDB.password)){
           return res.status(400).json({
               ok:false,
               err: {
                   message: 'Usuario o (contraseña) incorrectos'
               }
           })
       }  

       let token = jwt.sign({
           usuario: usuarioDB
       },process.env.SEED,{ expiresIn: process.env.CADUCIDAD_TOKEN});
    //    },'este-es-el-seed-desarrollo',{ expiresIn:'30d' });
       res.json({
           ok:true,
           usuario: usuarioDB,
           token:token
       });
   });
}


module.exports={
    getUsuarios,
    getUsuario,
    createUser,
    deleteUsuario,
    updateUsuario,
    login,
}