const express = require('express');
const studentController = require('../controllers/StudentController')

const router = express.Router();

router.get('/students',studentController.getStudents);
router.get('/student/:id',studentController.getStudent);
router.delete('/student/:id',studentController.deleteStudent);
router.put('/student/:id',studentController.updateStudent);

module.exports = router;