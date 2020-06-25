const express = require('express');
const app = express(); 
const multer = require('multer');  
const Student = require('../models/student');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2; 
require('dotenv').config(); 
require('../config/cloudinaryConfig')  
/*============================================ 
    Importamos el archivo de authentication 
=========================================== */  
// import auth from '../middlewares/auth';
const storage = multer({
  storage: multer.diskStorage({}), 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('El archivo no es soportado'), false)
      // return 
    }
    cb(null, true)
  }
})
app.post('/student', storage.single('photo'),async (req, res, next) => {
  let body = req.body;
  const result = await cloudinary.uploader.upload(req.file.path) 
  let student = new Student({
    username: body.username,
    // password: body.password, 
    password:bcrypt.hashSync(body.password,10),
    photo: result.secure_url, 
    about: body.about,
    role:body.role  
  });
  student.save((err,studentStored) => {
    if (err) {
      res.status(500).send({
        message: `Error${err}`
      })
    }
    res.json({
      ok: true,
      student: studentStored
    })
  })
});

module.exports = app;