const express = require('express');
const app = express(); 
const multer = require('multer');
const Teacher = require('../models/teacher');
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
app.post('/teacher', storage.single('photo'),async (req, res, next) => {
  let body = req.body;
  const result = await cloudinary.uploader.upload(req.file.path) 
  let teacher = new Teacher({
    username: body.username,
    password:bcrypt.hashSync(body.password,10),
    profession:body.profession,
    photo: result.secure_url, 
    about: body.about,  
    role:body.role
  });
  teacher.save((err,teacherStored) => {
    if (err) {
      res.status(500).send({
        message: `Error${err}`
      })
    }
    res.json({
      ok: true,
      teacher: teacherStored
    })
  })
});

module.exports = app;