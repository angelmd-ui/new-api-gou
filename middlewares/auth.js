const jwt = require('jsonwebtoken')
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
/*=============================
    Verificar token
===============================*/

     verificaToken = (req,res,next)=>{
        // Obtenemos los headers
        let token = req.get('token');
        // Verificamos que el token sea valido
        jwt.verify(token, process.env.SEED, (err,decoded)=>{
            if(err){
                return res.status(401).json({
                    ok:false,
                    err: {
                        message: 'No token'
                    }
                });
            }
            req.usuario = decoded.usuario;
            next();
        });
     }
   /*===================================
        Verificar Rol Administrador
    ====================================*/
    verificaAdmin_Role = (req,res,next)=>{
        let usuario = req.usuario;
        if(usuario.role === 'ADMIN') {
            next();
            
        }else{
           res.json({
               ok: false,
               err: {
                   message: 'El usuario no es administrador'
               }
           })
        }
    }
    /*===================================
        Verificar token para imagen
    ====================================*/
    verificaTokenImg = (req,res,next)=>{
       let token = req.query.token;
       // Verificamos que el token sea valido
       jwt.verify(token, process.env.SEED, (err,decoded)=>{
           if(err){
               return res.status(401).json({
                   ok:false,
                   err: {
                       message: 'Token no valido'
                   }
               });
           }
           req.usuario = decoded.usuario;
           next();
       });
    }

    module.exports = {
        verificaToken
    }