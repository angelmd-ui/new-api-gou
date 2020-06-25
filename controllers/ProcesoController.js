const Proceso = require ('../models/proceso');

let getProcesos=(req,res)=>{
  Proceso.find({},(err,works)=>{
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!works){
        res.status(404).send({
            message:'No existen categorias'
        })
    }
    res.json(works)
  })
}
let getProcesosByAreas=(req,res)=>{

  Proceso.find({area:{_id:req.params.id_area}},(err,works)=>{
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!works){
        res.status(404).send({
            message:'No existen categorias'
        })
    }
    res.json(works)
  })
}

let addProceso=(req,res)=>{
    const body = req.body;
  
    const proceso= new Proceso({
      area:body.area,
      nombre:body.nombre,
      descripcion:body.descripcion,
      icono:body.icono
    });
    proceso.save((err,work)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send(work);
    }) 
}



module.exports = {
  addProceso,
  getProcesos,
  getProcesosByAreas
}