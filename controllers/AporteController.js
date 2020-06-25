const Aporte = require ('../models/aporte');

let getAportes=(req,res)=>{
  Aporte.find()
  .populate('responses.author','username')
  .exec(function (err, aporte){
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!aporte){
        res.status(404).send({
            message:'No existen aportes'
        })
    }
    res.json(aporte)
  })
}

let getAporteProceso = (req,res)=>{

    let id_area = req.params.id_area,
        id_work = req.params.id_work;
  
    if(id_area === 'all' & id_work !== 'all'){
     
      Aporte.find( { trabajo:{_id:id_work} })
         .populate('usuario','username')
         .populate('aporte', 'nombre' )
         .exec((err,aporte)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!aporte){
                 res.status(404).send({
                     message:'No existen aportes'
                 })
             }
             res.json(aporte)
         })
    };
    if(id_work === 'all' && id_area !=='all'){
      Aporte.find({area:{_id:id_area}})
         .populate('usuario','username')
         .populate( 'area','nombre')
         .exec((err,service)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!service){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
             res.json(service)
         })
    }
    if(id_work !== 'all' && id_area !=='all'){
      Aporte.find({area:{_id:id_area},proceso:{_id:id_work}})
         .populate('usuario','username')
        //  .populate()
         .populate('proceso', 'nombre' )
         .populate( 'area','nombre')
         .exec((err,service)=>{
             if(err){
                 res.status(500).send({
                     message: `Error ${err}`
                 })
             }
             if(!service){
                 res.status(404).send({
                     message:'No existen etiquetas'
                 })
             }
             res.json(service)
         })
    }
  
  }

let addAporte=(req,res)=>{
    const body = req.body;
  
    const poster= new Aporte({
      titulo:body.titulo,
      usuario:body.usuario,
      area:body.area,
      proceso:body.proceso
    });
    poster.save((err,aporte)=>{
      if(err){
          res.status(500).send({
              message:`Error ${err}`
          })
      }
      res.send(aporte);
    }) 
}

getPostComments=(req,res)=>{
    let id = req.params.id
  Post.findById({_id:id})
   .populate({path:'comentario.author',select:'username'})
   
   .exec((err,coment)=>{
       if(err){
           res.status(500).send({
               message: `Error ${err}`
           })
       }
       if(!coment){
           res.status(404).send({
               message:'No existen registros'
           })
       }
    
       res.json(coment.comentario)
   })
}

let aporteComentario= (req,res) =>{
  const body   = req.body;
  let id = req.params.id;
  Aporte.findById(id,(err,aporte)=>{
    if(err){
        res.status(500).send({
            message:`Error en el server ${err}`
        })
    }
    if(!aporte){
        res.status(404).send({
            message:'No existen aportes'
        })
    }else{
        aporte.comentario.push(body);
        aporte.save((err,comment)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            Aporte.findById(comment._id)
                 .populate('responses.author','username')
                 .exec(function (err, resPost) {
                    if (err) return handleError(err);
                    res.send({resPost});
                    // prints "The author is Ian Fleming"
                  });
            
          }) 
       
    }                            
})  
}

module.exports={
    addAporte,
    getAportes,
    aporteComentario,
    getAporteProceso
}