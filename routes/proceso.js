const express=require('express');
const procesoController = require('../controllers/ProcesoController') ;
/*============================================
    Importamos el archivo de authentication
=========================================== */
const auth = require('../middlewares/auth')

// Importamos el archivo para verficar rol admin;
const router=express.Router();

router.post('/proceso',[auth.verificaToken],procesoController.addProceso)
router.get('/procesos',[auth.verificaToken],procesoController.getProcesos)
router.get('/procesos/area/:id_area',[auth.verificaToken],procesoController.getProcesosByAreas)

module.exports=router; 