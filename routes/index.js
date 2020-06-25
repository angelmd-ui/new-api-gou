const express=require('express');
const router=express.Router();

// const concursoRouter=require('./concurso');

const usuarioRouter=require('./usuario');

// New 
const studentRouter = require('./student');
const teacherRouter = require('./teacher');
const uploadRouter  = require('./uploadstudent');
const uploadRouter2 = require('./uploadteacher');
// 

const NotifyRouter=require('./notifications');

const categoriaRouter = require('./categoria')
const etiquetaRouter = require('./etiqueta')
const registroRouter = require('./registro')
const programaRouter = require('./programa')

// Modificación 21/junio/2020
const temaRouter = require('./tema')
// Modificación 21/junio/2020
const areaRouter = require('./area')
const procesoRouter = require('./proceso')

// Modificación 21/junio/2020
const aporteRouter = require('./aporte')
// Modificación 21/junio/2020



router.use(usuarioRouter);


router.use(NotifyRouter);

router.use(categoriaRouter);
router.use(etiquetaRouter);
router.use(programaRouter);
router.use(registroRouter);

// New
router.use(studentRouter);
router.use(teacherRouter);
router.use(uploadRouter); 
router.use(uploadRouter2);
// New

// Modificado 21/junio/2020
router.use(temaRouter);

// Modificado 21/junio/2020
router.use(areaRouter);

// Modificado 21/junio/2020
router.use(procesoRouter);
// Modificado 21/junio/2020 

// Modificación 21/junio/2020
router.use(aporteRouter);
// Modificación 21/junio/2020

module.exports=router;