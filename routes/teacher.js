const express = require('express');
const teacherController = require('../controllers/TeacherController');


const router = express.Router();

router.get('/teachers',teacherController.getTeachers);
router.get('/teacher/:id',teacherController.getTeacher);
router.delete('/teacher/:id',teacherController.deleteTeacher);
router.put('/teacher/:id',teacherController.updateTeacher);

module.exports = router;