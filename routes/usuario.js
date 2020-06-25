const express=require('express');
const usuarioController= require('../controllers/UsuarioController');
const upload = require('../controllers/upload_v2');
/*============================================
    Importamos el archivo de authentication
=========================================== */
const auth = require('../middlewares/auth')
// Importamos el archivo para verficar rol admin;
const router=express.Router();

// router.get('/usuarios',usuarioController.getUsuarios);
router.get('/usuarios',usuarioController.getUsuarios);
router.post('/createUser',upload,usuarioController.createUser);
router.post('/login',usuarioController.login);

module.exports=router; 
