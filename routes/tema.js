const express=require('express');
const TemaController = require('../controllers/TemaController') ;
const upload = require('../controllers/upload_v2');
/*============================================
    Importamos el archivo de authentication
=========================================== */
const auth = require('../middlewares/auth')

const router=express.Router();

router.post('/tema',[auth.verificaToken],upload,TemaController.addTema)
router.get('/tema/:id_area/:id_work',[auth.verificaToken],TemaController.getTemaAreaProceso)
router.get('/temas',[auth.verificaToken],TemaController.getTemas)
router.get('/tema/usuario/active/:id_user',[auth.verificaToken],TemaController.getTemaUser)
router.get('/tema/:id_service/usuario/perfil/:id_user',[auth.verificaToken],TemaController.getTemaByIdAndUser)


// router.put('/usuario/:id',[auth.verificaToken,auth.verificaAdmin_Role],usuarioController.updateUsuario);
module.exports=router; 