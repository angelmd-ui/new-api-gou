const express=require('express'); 
const aporteController = require('../controllers/AporteController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */

// Importamos el archivo para verficar rol admin;
const router=express.Router(); 

router.post('/service/post',aporteController.addAporte),
router.post('/service/post/:id/comentario',aporteController.aporteComentario)
router.get('/service/posts',aporteController.getAportes)
router.get('/service/posts/:id_area/:id_work',aporteController.getAporteProceso)


module.exports=router; 