const Tema = require( '../models/tema');
const Proceso = require('../models/proceso')
// const mongoose = require('mongoose');

const cloudinary = require('cloudinary');
require('dotenv').config();
require('../config/cloudinaryConfig_v_2')


let getTemas = (req,res) =>{
  Tema.find()
    .populate([
        {
        path: 'usuario',
       },
       {
        path: 'temas.proceso',
        populate:{
         path:'area' 
        }
       }

])
     
     .exec((err,tema)=>{
         if(err){
             res.status(500).send({
                 message: `Error ${err}`
             })
         }
         if(!tema){
             res.status(404).send({
                 message:'No existen etiquetas'
             })
         }
         
         res.json(tema)
     })
}
let getTemaUser = (req,res)=>{
  const id= req.params.id_user
  Tema.find({usuario:{_id:id}})
     .populate('usuario')
     .populate([{ path: 'proceso' },{path:'area'}])
     .exec((err,tema)=>{
      if(err){
          res.status(500).json({
              message:`Error al mostrar el tema ${err}`
          })
      }
      if(!tema){
          res.status(404).json({
              message:'No existe el tema'
          })
      }
      
      res.json(tema)
  })
}
let getTemaByIdAndUser = (req,res)=>{
   let { id_tema,id_user } = req.params
    Tema.find({_id:id_tema},{usuario:{_id:id_user}})
       .populate('usuario')
       .populate({ path: 'proceso' })
       .exec((err,tema)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el tema ${err}`
            })
        }
        if(!tema){
            res.status(404).json({
                message:'No existe el usuario'
            })
        }
        
        res.json(tema)
    })
  }


let getTemaAreaProceso = (req,res)=>{

  let id_area = req.params.id_area 
  let id_work = req.params.id_work

  if(id_area === 'all' & id_work !== 'all'){
 
    Tema.find({proceso:id_work})
       .populate('proceso')
       .populate('usuario')
       .exec((err,tema)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!tema){
               res.status(404).send({
                   message:'No existen etiquetas'
               })
           }
           

           res.json(tema)
       })
  };
  if(id_work === 'all' && id_area !=='all'){
  
    Tema.find({area:{_id:id_area}})
         .populate({path:'proceso',populate:{path:'area'}})
         .populate({path:'area'})
         .populate('usuario')
         .exec((err,tema)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!tema){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
           
             res.json(tema)
         })
            
       
      
  };
  if(id_work !== 'all' && id_area !=='all'){
    Tema.find({proceso:{_id:id_work,area:{_id:id_area}}})
       .populate([{path: 'usuario'},
       {path:'proceso',populate:{path:'area'} }
    ]
       )
       .exec((err,tema)=>{
           if(err){
               res.status(500).send({
                   message: `Error ${err}`
               })
           }
           if(!tema){
               res.status(404).send({
                   message:'No existen etiquetas'
               })
           }
           res.json(tema)
       })
  };
  if(id_work === 'all' && id_area ==='all'){
    Tema.find()
       .populate([{path: 'usuario'},
       {path:'proceso',populate:{path:'area'} }
    ]
       )
       .exec((err,tema)=>{
        if(err){
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        if(!tema){
            res.status(404).send({
                message:'No existen etiquetas'
            })
        }
        res.json(tema)
       })
  }

}



let addTema= async(req,res)=>{
    const body = req.body;
    const id = body.id_user
   
//    const url = []
//    let url = []
    // for(let file in req.files){ 
    //  const result = await cloudinary.uploader.upload_v2(req.files[file].path)
    //   url.push(result.secure_url)
    // }
    const result = await cloudinary.uploader.upload(req.file.path)

    const tema = new Tema({
        usuario:body.usuario,
        titulo:body.titulo,
        descripcion:body.descripcion,
        area:body.area,
        proceso:body.proceso,
        // potho:url, 
        photo:result.secure_url, 
        ranking:body.ranking,
       
  
      })
   
      tema.save((err,tema)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        res.send(tema);
      }) 

  }

module.exports={
  addTema,
  getTemaAreaProceso,
  getTemas,
  getTemaUser,
  getTemaByIdAndUser 
}
